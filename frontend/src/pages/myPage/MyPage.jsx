import "../../css/MyPage.css"
import SimpleTopBar from "../bar/SimpleTopBar"
import NavBottomBar from "../bar/NavBottomBar";
import { SlArrowRight } from "react-icons/sl";
import Circle from "../../img/circle.svg"
import Review from "../../img/review.svg"
import Delivery from "../../img/delivery.svg"
import { BsInstagram } from "react-icons/bs";

const MyPage = () => {
    return(
        <div>
            <SimpleTopBar text="더보기"/>
            <div style={{height: "60px"}}/>

            <div className="mypage-profile">
                <img src={Circle}/>
                <span>구리누나</span>
                <SlArrowRight className="mypage-arrow"/>
            </div>
            
            <div className="point-box">
                <div className="point-circle">
                    <span>p</span>
                </div>
                <span className="point-text">내 포인트</span>
                <span className="point-value">604p</span>
            </div>

            <div className="mypage-bar">
                <div className="icon-bar">
                    <img src={Delivery}/><br/>
                    <span>주문·배송</span>
                </div>
                <div className="icon-bar">
                    <img src={Review}/><br/>
                    <span>리뷰</span>
                </div>
            </div>

            <div className="horizontal-line"/>

            <div className="mypage-list">
                <span className="mypage-title">내 정보</span>
                <div className="mypage-list-box">
                    <span>내 정보 수정</span>
                    <SlArrowRight className="mypage-arrow"/>
                </div>
                <div className="mypage-list-box">
                    <span>반려동물 정보 수정</span>
                    <SlArrowRight className="mypage-arrow"/>
                </div>
            </div>

            <div className="horizontal-line"/>

            <div className="mypage-list">
                <span className="mypage-title">고객센터</span>
                <div className="mypage-list-box">
                    <span>FAQ</span>
                    <SlArrowRight  className="mypage-arrow"/>
                </div>
                <div className="mypage-list-box">
                    <span>자주 묻는 질문</span>
                    <SlArrowRight  className="mypage-arrow"/>
                </div>
                <div className="mypage-list-box">
                    <span>1:1 문의</span>
                    <SlArrowRight  className="mypage-arrow"/>
                </div>
            </div>

            <div className="horizontal-line"/>

            <div className="mypage-list">
                <span className="mypage-title">기타</span>
                <div className="mypage-list-box">
                    <span>이벤트</span>
                    <SlArrowRight  className="mypage-arrow"/>
                </div>
                <div className="mypage-list-box">
                    <span><BsInstagram/>  인스타그램</span>
                    <SlArrowRight  className="mypage-arrow"/>
                </div>
            </div>
            
            <NavBottomBar/>
        </div>
    )
}

export default MyPage;