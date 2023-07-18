import NavBottomBar from "../bar/NavBottomBar";
import "../../css/Log.css"
import { useState } from "react";
import Pet from "../../img/petImg.svg"
import Dlog1 from "../../img/dlog1.svg"
import Dlog2 from "../../img/dlog2.svg"
import Plog1 from "../../img/plog1.svg"
import Plog2 from "../../img/plog2.svg"
import Plog3 from "../../img/plog3.svg"
import Clog1 from "../../img/clog1.svg"
import Clog2 from "../../img/clog2.svg"
import { Block, CheckBox, CustomBlock } from "../../components/Blocks"
import { SlArrowRight } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const Log = () => {
    const [name, setName] = useState("덴버");
    const navigate = useNavigate();

    const handleToDetail = (detailName) => {
        navigate("/logs/details", { state: {log: detailName }});
    };

    return (
        <div>
            <div className="log-body">
                <div className="log-profile">
                    <img src={Pet}/>
                    <span>{name}</span>
                </div>

                <div className="log-title-form">
                    <span className="log-title">질병일지</span>
                    <span className="more" onClick={()=>handleToDetail("질병")}>
                        자세히
                        <SlArrowRight className="more-arrow"/>
                    </span>
                </div>
                
                <div className="block-form">
                    <Block text="눈 건강" color={'#f9e467'} value="1"/>
                    <Block text="피부 건강" color={'#f5be6e'} value="2"/>
                </div>

                <div className="log-content">
                    <img src={Dlog1}/>
                    <span>우리 아이 건강 체크,<br/>얼마나 했을까요?</span>
                    <br/>
                    <img src={Dlog2}/>
                    <span>현재 상태에 따른 <br/>건강 관리법을 알려드릴게요</span>
                </div>
            </div>

            <div className="horizontal-line3"/>

            <div className="log-body">
                <div className="log-title-form">
                    <span className="log-title">예방일지</span>
                    <span className="more" onClick={()=>handleToDetail("예방")}>
                        자세히
                        <SlArrowRight className="more-arrow"/>
                    </span>
                </div>

                <CheckBox/>

                <div className="log-content">
                    <img src={Plog1}/>
                    <span>병원 내원 후, <br/>진료 내역을 기록해 관리해 보세요</span>
                    <br/>
                    <img src={Plog2}/>
                    <span>예방접종 시기,<br/>까먹지 않도록 알려드릴게요 </span>
                    <br/>
                    <img src={Plog3}/>
                    <span>복용해야 할 약물도 <br/>꼼꼼히 기록해 관리해 보세요</span>
                </div>
            </div>

            <div className="horizontal-line3"/>

            <div className="log-body">
                <div className="log-title-form">
                    <span className="log-title">맞춤일지</span>
                    <span className="more" onClick={()=>handleToDetail("맞춤")}>
                        자세히
                        <SlArrowRight className="more-arrow"/>
                    </span>
                </div>

                <div className="block-form">
                    <CustomBlock text="현재 몸무게" color={"#d9e8fb"} value="5.0" unit="kg"/>
                    <CustomBlock text="현재 몸무게" subText= "현재 몸무게 대비" color={"#368DF6"} value="0" unit="%"/>
                </div>

                <div className="log-content">
                    <img src={Clog1}/>
                    <span>적정 체중 유지를 위한, <br/>하루 섭취량을 알려드릴게요</span>
                    <br/>
                    <img src={Clog2}/>
                    <span>각 건강에 따라<br/>맞춤별 간식을 추천해 드릴게요 </span>
                    <br/>
                </div>
            </div>
            <div style={{height: "60px"}}/>
            <NavBottomBar/>
        </div>
    )
}

export default  Log;