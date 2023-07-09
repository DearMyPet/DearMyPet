import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { SlArrowLeft } from "react-icons/sl";
import orderProduct from "../../img/orderProduct.png"
import kakaopay from "../../img/kakaopay.png"
import tosspay from "../../img/tosspay.png"

const Order = () => {
    const [selectedPayOption, setSelectedPayOption] = useState("");
    const navigate = useNavigate();
    const handlePayOptionChange = (event) => {
        setSelectedPayOption(event.target.value);
    };
    const handleGoBack = () => {
      navigate(-1);
    };
      
    return(
        <div>
            <Navbar fixed="top" bg="white">
                <Container>
                    <Navbar.Brand > <SlArrowLeft onClick={handleGoBack}/></Navbar.Brand>
                    <Navbar.Brand className="order-header">주문 / 결제</Navbar.Brand>
                </Container>
            </Navbar>

            <div>
                <div style={{height:"90px"}}/>
                <div className="order-info">
                    <span>기숙사</span>
                    <span class="rectangle-list">배송지목록</span>
                    <div className="gap20"/>
                    <span>김철수</span>
                    <span style={{marginLeft:"30px"}}>010-1234-5678</span>
                    <div className="gap20"/>
                    <span className="text-address">경기 시흥시 산기대학로 237 (정왕동, 한국산업기술대학교), <br/>
                        제2기숙사 100호 [15073]
                    </span>
                    <select name="배송메모" class="rectangle-memo">
                        <option  className="select-option" value="1">배송메모를 선택해주세요.</option>
                        <option value="2">부재시 경비실에 맡겨주세요.</option>
                        <option value="3">집앞에 놔주세요.</option>
                        <option value="4">택배함에 놔주세요.</option>
                        <option value="5">집으로 직접 배송해주세요.</option>
                        <option value="5">배송 전에 꼭 연락주세요.</option>
                        <option value="5">직접입력</option>
                        <option value="5">없음</option>
                    </select>

                </div>
                <div className="Line-30"/>
                <div className="order-info">
                    <span className="order-product-title" >주문 상품</span>
                    <div className="order-product">
                        <img src={orderProduct} className="order-product-img"/>
                        <div className="product-cont">
                            <span className="product-title">동결건조 딸기</span>
                            <span className="product-detail">수량 1개</span>
                            <span className="product-detail">배송비 2,500원</span>
                            <span className="order-price">7,500 원</span>
                        </div>
                    </div>
                </div>
                <div className="Line-30"/>
                <div className="order-info">
                    <span className="order-product-title" >할인 적용</span>
                    <div className="gap20"/>
                    <div className="inline-section">
                        <span>쿠폰</span>   
                        <select name="coupon" className="coupon-select">
                            <option value="0">쿠폰을 선택해주세요.</option>
                        </select>
                        <span className="coupon-price">0원</span>
                    </div>
                    <div className="gap20"/>
                    <div className="inline-section">
                        <span>포인트</span>
                        <input className="point-input" type="text"></input> 
                        <span className="point-price">P</span>
                        <span class="rectangle-all">전액사용</span>
                    </div>
                    <div className="gap20"/>
                    <div className="point-use">
                        <span className="my-point">보유 포인트 : 0P </span>
                    </div>
                </div>
                <div className="Line-30"/>
                <div className="order-info">
                    <span className="order-product-title" >결제 금액</span>
                    <div className="gap20"/>
                    <span>총 상품 금액</span>
                    <span className="pay-price">7,500 원</span>
                    <div className="gap20"/>
                    <span>총 배송비</span>
                    <span className="pay-price">2,500 원</span>
                    <div className="gap20"/>
                    <span>포인트 사용</span>
                    <span className="pay-price">(-)  0 원</span>
                    <div className="line2"/>
                    <span>총 결제 금액</span>
                    <span className="payment">14,000 원</span>
                </div>
                <div className="Line-30"/>
                <div className="order-info">
                    <span className="order-product-title" >결제 방식</span>
                    <div className="gap20"/>
                    <label>
                        <input type="radio" value="1"
                            checked={selectedPayOption === "1"}
                            onChange={handlePayOptionChange} /> 
                            <img src={kakaopay} style={{margin:"0 5px 0 20px"}}/>
                            <span className="benefit">혜택</span>
                    </label>
                    <div className="line2"/>
                    <label>
                        <input type="radio" value="2" 
                            checked={selectedPayOption === "2"}
                            onChange={handlePayOptionChange}/>  
                            <img src={tosspay} style={{margin:"0 5px 0 20px"}}/>
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