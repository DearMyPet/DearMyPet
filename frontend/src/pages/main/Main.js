import '../../css/Main.css';
import { Link } from 'react-router-dom';
import NavBottomBar from '../bar/NavBottomBar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Pet from "../../img/petImg.svg"
import axios from 'axios';

function Main(){
    const naqvigate = useNavigate();
    const [name, setName] = useState();
    const [img, setImg] = useState();

    useEffect(() => {
        const userId = sessionStorage.getItem("user");
        const url = `http://127.0.0.1:8000/api/dogs/${userId}`;
        axios.get(url)
        .then((response)=>{
            const { id, name, img } = response.data;
            sessionStorage.setItem("dog", id);
            setName(name);
            img? setImg(img) : setImg(Pet);
        })
        .catch(function(error) {
            setName("반려견을 등록하세요.");
            setImg(Pet);
        })
    })

    return(    
        <div className="Main">
            
            <div className="log-body">
                <div className="log-pro">
                        <img src={img}/>
                        <span>{name}</span>
                </div>
            </div>

            <h4 className='main-title'>진단</h4>

            <div className='notice'>
                <span className='notice-text'>💡 DMP 안내</span>
            </div>

            <div className='main-content'> 
                <Link className='eye-examination' to="/check">
                    <span className='box-title'>눈 건강<br/></span>
                    <span className='box-exp'>이상 징후 체크</span>
                </Link>
                <Link className='skin-examination' to="/check">
                    <span className='box-title'>피부 건강<br/></span>
                    <span className='box-exp'>이상 징후 체크</span>
                </Link>
                <Link className='examination-report' to="/disease/reports">
                    <span className='box-title'>진단 기록 보기</span>
                </Link>
            </div>
            <div>
                <span className='guide-title'>🔎 진단 가이드 확인하기</span>
                <div className='guide-box'>
                    <div className='eye-guide' onClick={()=>naqvigate("/")}>눈 진단 가이드 👀</div>
                    <div id='line'/>
                    <div className='skin-guide' onClick={()=>naqvigate("/")}>피부 진단 가이드 🐾</div>
                </div>
            </div>
            <NavBottomBar/>
        </div>
    );
}

export default Main;