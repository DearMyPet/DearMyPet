import '../../css/Check.css';
import fileImg from '../../img/fileImg.svg';
import more from '../../img/more.svg';
// import dropdown from '../../img/dropdown.svg';
import plusPet from "../../img/plusPet.svg"
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

const Check = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const part = location.state.part;

    const [name, setName] = useState();
    const [img, setImg] = useState();

    const [preview, setPreview] = useState(null);

    // 이미지 선택 시 미리보기 업데이트
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const navigateToChecking = () => {
        navigate("/checking", {
            state: { 
                img: preview,
                part: part
            }
        });
    }

    useEffect(() => {
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
    }, []);

    return(
        <div className="Check">
            <div className="log-pro">
                    <img src={img} alt="pet"/>
                    <span>{name}</span> 
            </div>

            <span className='title'>{part} 사진을 업로드 해주세요</span>
            <span className='content'>아래에 사진을 첨부에 주세용</span>

            {
                preview? 
                    <img className="filebox" src={preview} alt="Uploaded Preview"/> :
                    <div className="filebox">
                        <label for="file">
                            <img className='file-img' src={fileImg}/>
                            <span className='file-info'>이곳을 클릭하여 파일을 선택할 수 있어요</span>
                            <input type="file" id="file" accept="image/*" capture="camera" onChange={handleImageChange}/>
                        </label>
                    </div>
            } 

            <div className='check-btn' onClick={navigateToChecking}>진단하기</div>

            <div className='eyeguide-check'>
                눈 진단 가이드 확인하기
                <img className='check-more' src={more}/>
            </div>
            <div className='skinguide-check'>
                피부 진단 가이드 확인하기
                <img className='check-more' src={more}/>    
            </div>
        </div>
    );
}

export default Check;