import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { SlArrowLeft } from "react-icons/sl";
import orderProduct from "../../img/orderProduct.png"

const OrderDetails = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
    navigate(-1);
    };
    return(
        <div>
            <Navbar fixed="top" bg="white">
                <Container>
                    <Navbar.Brand > <SlArrowLeft onClick={handleGoBack}/></Navbar.Brand>
                    <Navbar.Brand className="order-header">주문상세</Navbar.Brand>
                </Container>
            </Navbar>

            <div style={{height:"90px"}}/>
            <div className="order-info">
                <span className="no-product-id">No.20230529123456</span>
                <span className="rectangle-delete">내역삭제</span><br/>
                <span>(23.05.29)</span>
            </div>

            <div class="Line-30"/>

            <div className="order-info">
                <div className="order-product">
                    <img src={orderProduct} className="order-product-img"/>
                    <div className="product-cont">
                        <span className="product-title">동결건조 딸기</span>
                        <span className="product-detail">수량 1개</span>
                        <span className="product-detail">배송비 2500원</span>
                        <span className="order-price">7,500 원</span>
                    </div>
                </div>
            </div>

            <div class="rectangle-btn">
                <span>배송현황</span>
                <div class="line-div"/>
                <span>문의하기</span>
            </div>

            <div className="Line-30"/>

            <div className="order-info">
                <span className="order-product-title">배송지 정보</span>
                <div className="gap20"/>
                <span className="order-detail-key">수령인</span>
                <span className="order-etc">김철수</span>
                <div className="gap20"/>
                <span className="order-detail-key">휴대폰</span>
                <span className="order-etc">010-1234-5678</span>
                <div className="gap20"/>
                <span className="order-detail-key">주소 </span>
                <span className="order-etc">
                    [15073] 경기 시흥시 산기대학로 237
                    (정왕동, 한국산업기술대학교), 
                    제2기숙사 1101호 김철수
                </span>
            </div>

            <div style={{height:"60px"}}/>
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
            <div className="gap20"/>
        </div>
    );
}

export default OrderDetails;