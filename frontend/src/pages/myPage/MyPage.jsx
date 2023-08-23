import "../../css/MyPage.css"
import SimpleTopBar from "../bar/SimpleTopBar"
import NavBottomBar from "../bar/NavBottomBar";
import { SlArrowRight } from "react-icons/sl";
import Review from "../../img/review.svg"
import Delivery from "../../img/delivery.svg"
import { BsInstagram } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { PiUserCircle } from "react-icons/pi";

const MyPage = () => {
    const [nickname, setNickname] = useState(""); 
    const [point, setPoint] = useState(0);

    useEffect( () => {
        const userId = sessionStorage.getItem("user");
        const user = () => {
            axios.get(`http://127.0.0.1:8000/api/users/info/${userId}`)
            .then(response => {
                setNickname(response.data.nickname);
            })
        }
        const point = () => {
            axios.get(`http://127.0.0.1:8000/api/users/${userId}`)
            .then(response => {
                setPoint(response.data.point);
            })
        }
        user()
        point()
    }, []);

    return(
        <div>
            <SimpleTopBar text="더보기"/>
            <div style={{height: "60px"}}/>

            <div className="mypage-profile">
                <PiUserCircle className="user-profile"/>
                {/* <img src={Circle} alt="user"/> */}
                <span>{nickname}</span>
                <SlArrowRight className="mypage-arrow"/>
            </div>
            
            <div className="point-box">
                <div className="point-circle">
                    <span>P</span>
                </div>
                <span className="point-text">내 포인트</span>
                <span className="point-value"> {point} p </span>
            </div>

            <div className="mypage-bar">
                <div className="icon-bar">
                    <img src={Delivery} alt="delivery"/><br/>
                    <span>주문·배송</span>
                </div>
                <div className="icon-bar">
                    <img src={Review} alt="review"/><br/>
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