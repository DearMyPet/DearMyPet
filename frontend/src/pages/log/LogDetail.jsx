import SimpleTopBar from "../bar/SimpleTopBar";
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DiseaseLog from "../../components/DiseaseLog";
import TodoList from "../../components/TodoList";
import PreventLog from "./PreventLog";



const LogDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const details = location.state?.log || "질병";
    const [activeTab, setActiveTab] = useState(details);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    
    return (
        <div>
            <SimpleTopBar/>
            <div style={{height: "60px"}}/>
            
            <div className="log-body">
                <ul class="nav nav-underline">
                    <li class="nav-item">
                        <a
                            className={`nav-link ${activeTab === "질병" ? 'active' : ''}`}
                            onClick={() => handleTabClick("질병")}> 질병 </a>
                    </li>
                    <li class="nav-item">
                        <a
                            className={`nav-link ${activeTab === "예방" ? 'active' : ''}`}
                            onClick={() => handleTabClick("예방")}> 예방 </a>
                    </li>
                        <li class="nav-item">
                        <a
                            className={`nav-link ${activeTab === "맞춤" ? 'active' : ''}`}
                            onClick={() => handleTabClick("맞춤")}> 맞춤 </a>
                    </li>
                </ul>
            </div>

            <PreventLog/>

            <div className="report-button">
                <button className='buy-button' onClick={()=>{ navigate("/products/list")}}> 추천 상품 보러가기</button>
            </div>
        </div>

    )
}




export default LogDetail; 