import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { SlArrowLeft } from "react-icons/sl";
import dogImg from "../../img/dogImg.png"
import orderProduct from "../../img/orderProduct.png"

const PaymetEnd = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
    navigate(-1);
    };

    return(
        <div>
            <Navbar fixed="top" bg="white">
                <Container>
                    <Navbar.Brand > <SlArrowLeft onClick={handleGoBack}/></Navbar.Brand>
                    <Navbar.Brand className="order-header">결제완료</Navbar.Brand>
                </Container>
            </Navbar>

            <img src={dogImg} className="img-dog"/>
            <span className="fin-order">주문 완료!</span><br/>
            <span>
                빠르게 준비해서 보내드릴게요!<br/>
                조금만 기다려 주세요 🐾
            </span>
            <br/>

            <button className="btn-detail" onClick={()=>{navigate("/orders")}} style={{marginRight:"15px"}}>주문 상세보기</button>
            <button className="btn-detail" onClick={()=>{navigate("/shop")}} style={{marginLeft:"15px"}}>쇼핑 계속하기</button>
            
            <div className ="Line-30"/>
            <span className="no-product">No.20230529123456 (23.05.29)</span>
            <div className ="Line-30"/>

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

            <button className="btn-detail" style={{marginRight:"15px"}}>취소하기</button>
            <button className="btn-detail" style={{marginLeft:"15px"}}>문의하기</button>
            
            <div className ="Line-30"/>

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

export default PaymetEnd;