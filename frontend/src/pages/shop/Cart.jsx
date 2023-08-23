import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InfoBar from '../bar/InfoBar';
import { SlArrowRight } from "react-icons/sl";
import cartImg1 from "../../img/cartImg1.svg"
import cartImg2 from "../../img/cartImg2.svg"
import { IoCloseOutline } from "react-icons/io5";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import SimpleTopBar from "../bar/SimpleTopBar";

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
            const updatedCart = cartItems.map((cartItem) =>
                cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };
    const removeFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity--;
            setCartItems(updatedCart);
        }else{
            removeFromCart();
        }
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity++;
        setCartItems(updatedCart);
    };

    const emptyCart = () => {
        setCartItems([]);
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });
        return totalPrice;
    };

    const calculateTotalCost = () => {
        const totalPrice = calculateTotalPrice();
        const shippingCost = totalPrice >= 19800 ? 0 : 2500;
        return totalPrice + shippingCost;
    };
    
    return(
        <div>
            <SimpleTopBar text="장바구니"/>

            {
                calculateTotalPrice() < 19800 ? (
                    <div className="cart-page">
                    <div className="rectangle-cart-header">
                        {(19800 - calculateTotalPrice()).toLocaleString()} 원 이상 추가 구매 시 무료배송<br/>
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
                    {cartItems.length === 0 ? (
                        <div style={{textAlign:"center"}}>
                            <span>장바구니가 비어있습니다.</span><br/>
                            <button className="go-product-list" onClick={()=>{ navigate("/shop")}}>상품 보러가기</button>
                        </div>
                    ) : (
                        <div>
                            {cartItems.map((item, index) => (
                                <div className="items-rectangle">
                                    <img className="cart-itmes-img" src={item.image} alt=""/>
                                    <span className="cart-items-title">{item.name}</span>
                                    <IoCloseOutline className="cart-itmes-delete" onClick={() => removeFromCart(index)}/><br/>
                                    <div className="items-rectangle-sub">
                                        <FiMinusCircle style={{marginRight:"14px"}} onClick={() => decreaseQuantity(index)}/>
                                        <span>{item.quantity}</span>
                                        <FiPlusCircle style={{marginLeft:"14px"}} onClick={() => increaseQuantity(index)}/>
                                        <span className="cart-items-price">{item.price.toLocaleString()} 원</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {
                        calculateTotalPrice() === 0? null : 
                        <div className="total-price">
                            {calculateTotalPrice().toLocaleString()} 원 + {calculateTotalCost() - calculateTotalPrice()} 원 (배송비) = 
                            {calculateTotalCost().toLocaleString()} 원
                        </div>
                    }
                    <button onClick={() => addToCart({ name: '동결건조 딸기', image: cartImg1, price: 7500, quantity: 1 })}>
                        상품 1
                    </button>
                    <button onClick={() => addToCart({ name: '오리 병아리콩 트릿', image: cartImg2, price: 7500, quantity: 1 })}>
                        상품 2
                    </button>
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
                    <button className="buy-button" onClick={()=>{navigate("/order")}}>결제하기</button>
                </div>
            }
            <InfoBar/>
        </div>
    );
}

export default Cart;