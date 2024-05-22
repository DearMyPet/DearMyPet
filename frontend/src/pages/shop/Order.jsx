import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import orderProduct from "../../img/orderProduct.png"
import kakaopay from "../../img/kakaopay.png"
import tosspay from "../../img/tosspay.png"
import SimpleTopBar from "../bar/SimpleTopBar";
import axios from "axios";

const Order = () => {
    const location = useLocation();
    const cartItems = location.state.cartItems;
    const totalPrice = location.state.totalPrice;
    const shippingCost = location.state.shippingCost;
    const totalCost = location.state.totalCost;

    const [selectedPayOption, setSelectedPayOption] = useState("");
    const [lastAddressInfo, setLastAddressInfo] = useState();
    const [point, setPoint] = useState(0);
    const navigate = useNavigate();
    const handlePayOptionChange = (event) => {
        setSelectedPayOption(event.target.value);
    };
    
    useEffect( () => {
        const userId = sessionStorage.getItem("user");
        const address = () => {
            axios.get(`http://127.0.0.1:8000/api/orders/last/${userId}`)
            .then(response => {
                console.log(response.data)
                if(response.data.state === 200){
                    setLastAddressInfo(response.data)
                }
            })
        }
        const point = () => {
            axios.get(`http://127.0.0.1:8000/api/users/points/${userId}`)
            .then(response => {
                setPoint(response.data.point);
            })
        }
        address();
        point();
    }, []);

    // 배송메모 -> 직접입력
    const [showInput, setShowInput] = useState(false);
    const handleChange = (event) => {
        if (event.target.value === "7") {
            setShowInput(true);
        } else {
            setShowInput(false);
        }
    }

    return(
        <div>
            <SimpleTopBar text="주문 / 결제"/>

            <div>
                <div style={{height:"90px"}}/>
                <div className="order-info">
                    {/* <span style={{fontWeight: "bold", fontSize: "18px"}}>{lastAddressInfo? lastAddressInfo.name : "배송지 명"}</span>
                    <span className="rectangle-list">배송정보 수정</span>
                    <div className="gap20"/>
                    <span>{lastAddressInfo? lastAddressInfo.recipient : "수령인을 입력하세요."}</span>
                    <span style={{marginLeft:"30px"}}>{lastAddressInfo? lastAddressInfo.recipient_phone : "전화번호를 입력하세요."}</span>
                    <div className="gap20"/>
                    <span className="text-address">{lastAddressInfo? lastAddressInfo.address : "상세주소를 입력하세요."}</span> */}
                    
                    <input type="text" style={{fontWeight: "bold", fontSize: "18px"}} placeholder="배송지 명을 입력하세요." />
                    <div className="gap20"/>
                    <input type="text" placeholder="수령인을 입력하세요." />
                    <input type="text" style={{marginLeft:"30px"}} placeholder="전화번호를 입력하세요." />
                    <div className="gap20"/>
                    <input type="text" className="text-address" placeholder="상세주소를 입력하세요." />

                    <br/><br/>

                    <select name="배송메모" className="rectangle-memo" onChange={handleChange}>
                        <option value="1">배송메모를 선택해주세요.</option>
                        <option value="2">부재시 경비실에 맡겨주세요.</option>
                        <option value="3">집앞에 놔주세요.</option>
                        <option value="4">택배함에 놔주세요.</option>
                        <option value="5">집으로 직접 배송해주세요.</option>
                        <option value="6">배송 전에 꼭 연락주세요.</option>
                        <option value="7">직접입력</option>
                    </select>
                    {showInput && <input className="rectangle-memo" type="text" placeholder="배송메모를 작성해주세요."/>}

                </div>
                <div className="Line-30"/>

                <div className="order-info">
                    <span className="order-product-title" >주문 상품</span>
                    <div className="order-product">
                        <img src={orderProduct} className="order-product-img" alt="orderProduct"/>
                        <div className="product-cont">
                            <span className="product-title">동결건조 딸기</span>
                            <span className="product-detail">수량 1개</span>
                            <span className="order-price">7,500 원</span>
                        </div>
                    </div>
                </div>

                <div className="Line-30"/>
                <div className="order-info">
                    <span className="order-product-title" >할인 적용</span>
                    <div className="gap20"/>
                    <div className="inline-section">
                        <span>포인트</span>
                        <input className="point-input" type="number"></input> 
                        <span className="point-price">P</span>
                        <span className="rectangle-all">전액사용</span>
                    </div>
                    <div className="gap20"/>
                    <div className="point-use">
                        <span className="my-point">보유 포인트 : {point}P </span>
                    </div>
                </div>
                <div className="Line-30"/>
                <div className="order-info">
                    <span className="order-product-title" >결제 금액</span>
                    <div className="gap20"/>
                    <span>총 상품 금액</span>
                    <span className="pay-price">{totalPrice.toLocaleString()} 원</span>
                    <div className="gap20"/>
                    <span>총 배송비</span>
                    <span className="pay-price">{shippingCost.toLocaleString()} 원</span>
                    <div className="gap20"/>
                    <span>포인트 사용</span>
                    <span className="pay-price">(-)  0 원</span>
                    <div className="line2"/>
                    <span>총 결제 금액</span>
                    <span className="payment">{totalCost.toLocaleString()} 원</span>
                </div>
                <div className="Line-30"/>
                <div className="order-info">
                    <span className="order-product-title" >결제 방식</span>
                    <div className="gap20"/>
                    <label>
                        <input type="radio" value="1"
                            checked={selectedPayOption === "1"}
                            onChange={handlePayOptionChange} /> 
                            <img src={kakaopay} style={{margin:"0 5px 0 20px"}} alt=""/>
                            <span className="benefit">혜택</span>
                    </label>
                    <div className="line2"/>
                    <label>
                        <input type="radio" value="2" 
                            checked={selectedPayOption === "2"}
                            onChange={handlePayOptionChange}/>  
                            <img src={tosspay} style={{margin:"0 5px 0 20px"}} alt=""/>
                            <span className="benefit">혜택</span>
                    </label>
                    <div className="line2"/>
                    <label>
                        <input type="radio" value="3" 
                            checked={selectedPayOption === "3"}
                            onChange={handlePayOptionChange}/>
                            <span style={{margin:"0 5px 0 20px"}}>일반결제</span>
                    </label>
                </div>
                <div className="Line-30"/>
                <div className="order-info">
                    <label>
                        <input type="radio"/>  주문내용 확인 및 결제 동의
                    </label>
                </div>
                <div style={{height:"80px"}}/>
            </div>

            <Container className='order-bar'>
                <Navbar.Brand>
                    <button className='buy-button' onClick={()=>{ navigate("/payment")}}> 결제하기</button>
                </Navbar.Brand>
            </Container>
        </div>
    );
}

export default Order;