import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoBar from '../bar/InfoBar';
import { SlArrowRight } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import SimpleTopBar from "../bar/SimpleTopBar";
import axios from "axios";
import Loading from "../../components/Loading";

const Cart = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [cartItems, setCartItems] = useState([]);
    const userId = sessionStorage.getItem("user");

    useEffect(() => {    
        axios.get(`http://127.0.0.1:8000/api/users/cart/${userId}`)
        .then(response => {
            const items = Array.isArray(response.data) ? response.data : [];

            const promises = items.map(cartItem => 
                axios.get(`http://127.0.0.1:8000/api/products/${cartItem.product}`)
                .then(productResponse => ({
                    ...productResponse.data, 
                    quantity: Number(cartItem.quantity)
                }))
            );
    
            Promise.all(promises).then(productsWithQuantity => {
                setCartItems(productsWithQuantity);
                setLoading(false);
            });
        });
    }, []);

    // 상품 수량 변경
    const updateCartItemQuantity = (productId, newQuantity) => {
        axios.patch(`http://127.0.0.1:8000/api/users/cart/${userId}`, {
            product: productId,
            quantity: newQuantity
        }).then(response => {
            console.log(response.data.message);
        }).catch(error => {
            console.error("Error updating cart item quantity:", error);
        });
    }

    const increaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity++;
        setCartItems(updatedCart);
        updateCartItemQuantity(updatedCart[index].product.id, updatedCart[index].quantity);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity--;
            setCartItems(updatedCart);
            updateCartItemQuantity(updatedCart[index].product.id, updatedCart[index].quantity);
        }else{
            removeFromCart(index);
        }
    };

    const removeFromCart = (index) => {
        const productToRemove = cartItems[index];
    
        axios.delete(`http://127.0.0.1:8000/api/users/cart/${userId}`, {
            data: { product: productToRemove.product.id }
        })
        .then(response => {
            const updatedCart = [...cartItems];
            updatedCart.splice(index, 1);
            setCartItems(updatedCart);
        })
        .catch(error => {
            console.error("상품 삭제에 실패했습니다.", error);
        });
    };
    

    const emptyCart = () => {
        axios.delete(`http://127.0.0.1:8000/api/users/cart/empty/${userId}`)
        .then(response => {
            setCartItems([]);
        })
        .catch(error => {
            console.error("장바구니 비우기에 실패했습니다.", error);
        });
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += Number(item.product.price) * item.quantity;
        });
        return Number(totalPrice);
    };

    const calculateTotalCost = () => {
        const totalPrice = calculateTotalPrice();
        const shippingCost = totalPrice >= 19800 ? 0 : 2500;
        return totalPrice + shippingCost;
    };

    const handleOrder = () => {
        navigate("/order", {
            state: {
                cartItems: cartItems,
                totalPrice: calculateTotalPrice(),
                shippingCost: calculateTotalCost() - calculateTotalPrice(),
                totalCost: calculateTotalCost()
            }
        });
    };
    
    return(
        <div>
            {loading? <Loading/> : 
            <>
                <SimpleTopBar text="장바구니"/>

                {
                    Number(calculateTotalPrice()) < 19800 ? (
                        <div className="cart-page">
                        <div className="rectangle-cart-header">
                            {Number(19800 - calculateTotalPrice()).toLocaleString()} 원 이상 추가 구매 시 무료배송<br/>
                            상품 더 담으러 가기 <SlArrowRight className="icon-go-next"/>
                        </div>
                        </div>
                    ) : null
                }

                <div style={{height:"80px"}}/>
                <div className="rectangle-gray">
                    <div className="cart-list">
                        <span className="cart-title">구매하실 상품</span><br/>
                        <span className="cart-clear" onClick={emptyCart}>장바구니 비우기</span><br/>
                        {
                            cartItems.length === 0 ? (
                                <div style={{textAlign:"center"}}>
                                    <span>장바구니가 비어있습니다.</span><br/>
                                    <button className="go-product-list" onClick={()=>{ navigate("/shop")}}>상품 보러가기</button>
                                </div>
                                ) : (
                                <div>
                                    {cartItems.map((item, index) => (
                                        <div className="items-rectangle" key={index}>
                                            <img className="cart-itmes-img" src={item.product.img} alt="item"/>
                                            <span className="cart-items-title">{item.product.name}</span>
                                            <IoCloseOutline className="cart-itmes-delete" onClick={() => removeFromCart(index)}/><br/>
                                            <div className="items-rectangle-sub">
                                                <FiMinusCircle style={{marginRight:"14px"}} onClick={() => decreaseQuantity(index)}/>
                                                <span>{item.quantity}</span>
                                                <FiPlusCircle style={{marginLeft:"14px"}} onClick={() => increaseQuantity(index)}/>
                                                <span className="cart-items-price">{Number(item.product.price * item.quantity).toLocaleString()} 원</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        }

                        {
                            calculateTotalPrice() === 0? null : 
                            <div className="total-price">
                                {calculateTotalPrice().toLocaleString()} 원 + {calculateTotalCost() - calculateTotalPrice()} 원(배송비) = {calculateTotalCost().toLocaleString()} 원
                            </div>
                        }
                    </div>
                </div>

                {
                    calculateTotalPrice() === 0? null : 
                    <div>
                        <div className="line-thin" style={{marginTop:"60px"}}/>
                        <div className="cart-info">
                            <span className="order-product-title">결제 금액</span>
                            <div className="gap20"/>
                            <span>총 상품 금액</span>
                            <span className="pay-price">{calculateTotalPrice().toLocaleString()} 원</span>
                            <div className="gap20"/>
                            <span>총 배송비</span>
                            <span className="pay-price">{calculateTotalCost() - calculateTotalPrice()} 원</span>
                            <div className="line2"/>
                            <span>총 결제 금액</span>
                            <span className="total-pay-price">{calculateTotalCost().toLocaleString()} 원</span>
                        </div>
                        <div className="line-thin"/>
                        <button className="buy-button" onClick={handleOrder}>결제하기</button>
                    </div>
                }
                <InfoBar/>
            </>
            }
        </div>
    );
}

export default Cart;