import '../../css/Report.css';
import circle from '../../img/circle.png';
import checkArrow from '../../img/checkArrow.svg';
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import reportImg from '../../img/reportImg.png';
import checkImg from '../../img/checkImg.svg';
import checkImg2 from '../../img/checkImg2.svg';
import checkImg3 from '../../img/checkImg3.svg';
import SimpleTopBar from '../bar/SimpleTopBar'
import { useNavigate } from 'react-router-dom';

function Report(){
    const naqvigate = useNavigate();

    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    
    const diseaseData = [
        {
            name: "결막부종",
            img: reportImg,
            direction: "오른쪽",
            percentage: "94%"
        },
        {
            name: "안검부종",
            img: reportImg,
            direction: "오른쪽",
            percentage: "80%"
        },
        {
            name: "혼탁",
            img: reportImg,
            direction: "오른쪽",
            percentage: "60%"
        }   
        
    ]

    const explainData = [
        {
            name: "결막부종",
            explanation: "눈 흰자위가 부어오른 경우를 의미해요. 감염, 알러지 등 원인이 다양하니 병원 검진을 추천해요."
        
        },
        {   
            name: "안검부종",
            explanation: "눈꺼풀이 부으면서 눈이 불편하기도 하고 각막궤양, 각막염으로 이어질 수 있으니 병원 검진을 추천해요."
        },
        {
            name: "혼탁",
            explanation: "각막 부종, 노령성핵경화, 백내장, 녹내장, 출혈, 지방이나 칼슘의 침착, 이전 상처에 대한 흉터 등 원인이 다양하니 병원 검진을 추천해요."
        }
    ]

    const checkData = [
        {
            img: checkImg,
            checkPoint: "덴버의 경우 00질병이 발생할 가능성이 높아요."
        
        },
        {   img: checkImg2,
            checkPoint: "성년기에는 발가락 사이가 습한 상태로 오래두면 지간염이 발생할 수 있어요. 목욕 후 발가락 사이도 완전히 건조시켜주세요."
        },
        {   img: checkImg3,
            checkPoint: "추천 상품을 통해 우리 아이를 위한 맞춤형 식단을 준비해 보세요."
        }
    ]

    return(
        <div className="Report">
            <SimpleTopBar text="눈 검진 결과"/>
            <div style={{height: "40px"}}/>

            <div className='timeBox'>
                <span className='time'>2023.07.20(금) 오후 6:42</span>
            </div>

            <div className='noticeBar'>
                <img className='circle' src={circle}></img>
                <span className='circleText'>눈</span>
                <span className='numberText'>이상 징후</span>
                <span className='number'>3</span>
            </div>

            <div className='checklinkBox'>
                <Link className='checkLink' to="/check">
                    눈 진단 다시하기
                    <img className='checkArrow' src={checkArrow}></img>
                </Link>
            </div>
            
            <div className='resultBox1'>
                <span className='resultBoxTitle'>주의가 필요해요</span>
                
                <div className='resultBox2'>
                    {diseaseData.map(disease =>{
                        return (
                            <div className='result'>
                                <div className='resultTitle'>
                                    {disease.name}
                                </div>
                                <img className='reulstImg' src={disease.img}/>
                                <span className='resultDirection'>
                                    {disease.direction}
                                </span>
                                <span className='resultPercentage'>
                                    {disease.percentage}
                                </span>
                            </div>
                        )
                    })}

                    <div className='resultNotice'>2023.01.20 기준 발견된 이상 징후예요<br/>
                        증상명을 누르면 자세한 정보를 볼 수 있어요
                    </div>
                </div>

                    <div className='anomaliesBox'>
                        <span className='anomaliesBoxTitle'>이상 징후 안내 🔎</span>
                        {explainData.map(explain =>{
                            return (
                                    <div className='anomalies'>
                                        <span className='anomaliesTitle'>{explain.name}</span> : {explain.explanation}
                                    </div>
                            )
                            })}
                    </div>

            </div>
            
            <div className='lastReportLinkBox'>
                <Link className='lastReportLink' to="/check">
                    기록 모두 보기
                </Link>
            </div>

            <div className='healthCheckBox'>
                <span>우리 아이의 건강<br/>잊지 말고 케어해 주세요.</span>
                {checkData.map((check, i) =>{
                    return (
                        <div className='check' >
                            <img className='checkImg' src={check.img}/>
                            <div className='checkText'>{check.checkPoint}</div>
                        </div>
                    )
                })}
            </div>

            <div className='LastBtnBox'>
                <div className='healthReportBtn' onClick={()=>naqvigate("/logs")}>
                    <span>건강일지</span>
                </div>
                <div className='productRecommendBtn' onClick={()=>naqvigate("/products/list")}>
                    <span>추천 상품 보러가기</span>
                </div>
            </div>
            <div style={{height: "60px"}}/>
        </div>
    );
}

export default Report;