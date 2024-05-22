import '../../css/Main.css';
import "../../css/Log.css"
import NavBottomBar from '../bar/NavBottomBar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import plusPet from "../../img/plusPet.svg"
import axios from 'axios';
import { BiPlusCircle } from "react-icons/bi";
import DogModal from '../../components/DogModal';

const Main = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [img, setImg] = useState();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleCheckLink = (path, type) => () => {
        const dogId = sessionStorage.getItem("dog");
        if (!dogId) {
            alert("강아지를 등록하고 진행해주세요!");
            openModal();
            return false;
        }
        navigate(path, { state: { part: type } });
    }

    const fetchData = () => {
        const userId = sessionStorage.getItem("user");
        const url = `http://127.0.0.1:8000/api/dogs/${userId}`;
        axios.get(url)
        .then((response) => {
            const { id, name, img } = response.data;
            sessionStorage.setItem("dog", id);
            setName(name);
            img ? setImg(img) : setImg(plusPet);
        })
        .catch((error) => {
            setName("반려견을 등록하세요");
            setImg(plusPet);
        });
    }

    useEffect(fetchData, []);

    return(    
        <div className="Main">
            <div className="log-pro">
                    <img src={img} alt="pet"/>
                    <span>{name}</span> 
                    <BiPlusCircle className="edit-dog" onClick={openModal}/>
                    <DogModal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        onActionComplete={fetchData}
                        currentImg={img}
                    />
            </div>

            <h4 className='main-title'>진단</h4>

            <div className='notice'>
                <span className='notice-text'>💡 DMP 안내</span>
            </div>

            <div className='main-content'> 
                <div className='eye-examination' onClick={handleCheckLink("/check", "눈")}>
                    <span className='box-title'>눈 건강<br/></span>
                    <span className='box-exp'>이상 징후 체크</span>
                </div>
                <div className='skin-examination' onClick={handleCheckLink("/check", "피부")}>
                    <span className='box-title'>피부 건강<br/></span>
                    <span className='box-exp'>이상 징후 체크</span>
                </div>
                <div className='examination-report' onClick={handleCheckLink("/disease/reports")}>
                    <span className='box-title'>진단 기록 보기</span>
                </div>
            </div>
            <div>
                <span className='guide-title'>🔎 진단 가이드 확인하기</span>
                <div className='guide-box'>
                    <div className='eye-guide' onClick={()=>navigate("/main")}>눈 진단 가이드 👀</div>
                    <div id='line'/>
                    <div className='skin-guide' onClick={()=>navigate("/main")}>피부 진단 가이드 🐾</div>
                </div>
            </div>
            <NavBottomBar/>
        </div>
    );
}

export default Main;