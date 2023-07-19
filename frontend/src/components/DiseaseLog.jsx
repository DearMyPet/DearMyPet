import { Block } from "../components/Blocks"
import { useState } from "react";
import DiseaseChart from "./DiseaseChart";
import Desc from "../img/desc.svg"

const DiseaseLog = () => {
    const [activeButton, setActiveButton] = useState("eyeButton");

    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };
    return (
        <div>
            <div className="log-body">
                <div className="disease-part">
                    <div
                        className={`eyeButton ${activeButton === 'eyeButton' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('eyeButton')}
                    >
                        <span>눈</span>
                    </div>
                    <div
                        className={`skinButton ${activeButton === 'skinButton' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('skinButton')}
                    >
                        <span>피부</span>
                    </div>
                </div>

                <div className="log-detail-head">
                    <span className="log-detail-title">눈, 피부 더 신경 쓰셔야 해요</span>
                </div>
                
                <div className="block-form">
                    <Block text="눈 건강" color={'#f9e467'} path="/disease/reports" value="1"/>
                    <Block text="피부 건강" color={'#f5be6e'} path="/disease/reports" value="2"/>
                </div>

                <span className="disease-desc">
                    아이가 좋아하는 것을 눈앞에서 상하좌우로 움직이거나 회전
                    시켜 보고 양쪽 눈이 동시에 움직이지 않는다면 응급상황으로 
                    볼 수 있어요. 되도록 빠르게 전문 수의사를 통한 검진을 권장
                    하며 내원 후에는 주 1회 이상 주기적은 눈 체크를 통해 아이의 
                    눈을 건강하게 지켜주세요.
                </span>
            </div>
            
            <div className="horizontal-line3"/>

            <div className="log-body">
                <div className="log-detail-head">
                    <span className="log-detail-title">일 년 동안 총 2회 체크했어요</span>
                </div>
                <DiseaseChart/>

                <div className="desc-container">
                    <img src={Desc}/>
                    <span className="desc">월별 집계된 건강 체크 수를 기록해요</span>
                </div>

                <span className="disease-desc">
                    아이들의 안과 질병은 유전적으로 생길 수도 있지만 일상생활 
                    속에서 언제든 발병할 수 있어요. 현재 아이의 눈에 증상이 
                    있다면 주 1회 주기적인 체크를 통해 아이의 눈 상태를
                    점검하고 기록해 주세요. 병의 진행과 2차 감염을 막고 
                    맑은 눈으로 회복될 수 있도록 꼼꼼히 체크해 주세요.
                </span>
            </div>
            <div style={{height: "100px"}}/>
        </div>
    )
}

export default DiseaseLog;