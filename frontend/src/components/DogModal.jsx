import Modal from 'react-modal';
import '../css/DogModal.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoClose } from "react-icons/io5";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: "30px",
        textAlign: "center",
        padding: "20px",
        background: "white"
    },
};

const DogModal = ({ isOpen, onRequestClose, onActionComplete, currentImg }) => {
    const [dogInfo, setDogInfo] = useState({
        name: "",
        weight: "",
        age: "",
        breed: "",
    });
    
    const [fileURL, setFileURL] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const userId = sessionStorage.getItem("user");
    const dogId = sessionStorage.getItem("dog");
    const url = `http://127.0.0.1:8000/api/dogs/${userId}`;

    const updateDogInfo = () => {
        axios.get(url)
        .then((response)=>{
            setDogInfo(response.data);
        })
        .catch(error => {});
    };

    useEffect(() => {
        updateDogInfo();
    }, [])

    useEffect(() => {
        if (dogInfo && dogInfo.img) {
            setFileURL(dogInfo.img);
        }
    }, [dogInfo]);

    useEffect(() => {
        if (currentImg) {
            setFileURL(currentImg);
        }
    }, [currentImg]);

    const handleChange = (e, key) => {
        setDogInfo(prevState => ({
            ...prevState,
            [key]: e.target.value
        }));
    };

    const handleFileChange = (e) => {
        // setFile(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setFileURL(imageURL);
            setSelectedFile(file);  // 파일 객체 저장
        }
    };    

    const handleSave = () => {
        const formData = new FormData();
        formData.append('id', dogId);
        if (selectedFile) {
            formData.append('img', selectedFile);
        }
        formData.append('name', dogInfo.name);
        formData.append('weight', dogInfo.weight);
        formData.append('age', dogInfo.age);
        formData.append('breed', dogInfo.breed);

        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        if (dogId) {
            axios.patch(url, formData, { headers })
            .then(response => {
                alert("반려견 정보가 수정되었습니다.");
                updateDogInfo();
                onActionComplete && onActionComplete();
                onRequestClose();
            })
            .catch(error => {
                alert("정보 수정이 실패되었습니다.");
            });
        } else {
            axios.post(url, formData, { headers })
            .then(response => {
                alert("반려견 정보가 등록되었습니다.");
                updateDogInfo();
                onActionComplete && onActionComplete();
                onRequestClose();
            })
            .catch(error => {
                alert("반려견 정보 등록이 실패되었습니다.");
            });
        }
    };

    const handleDelete = () => {
        const deleteUrl = `${url}?id=${dogId}`;
        axios.delete(deleteUrl)
        .then(response => {
            alert("반려견 정보를 삭제했습니다.");
            sessionStorage.removeItem("dog");
            onActionComplete && onActionComplete();
            onRequestClose();
        })
        .catch(error => {
            alert("반려견 정보 삭제가 실패되었습니다.");
        });
    };

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
            style={customStyles}
        >
            <IoClose className='close-button' onClick={()=>onRequestClose()}/>

            <h2>반려견 정보</h2>
            

            <div className='modal-box'>
                <div className='modal-img-box'><img src={fileURL}/></div>
                <span>사진 : </span>
                <input type="file" onChange={handleFileChange}/>
            </div>

            <div className='modal-box'>
                <span>이름 : </span>
                <input
                    type='text'
                    placeholder="이름을 입력해주세요."
                    value={dogInfo ? dogInfo.name : ""}
                    onChange={e => handleChange(e, 'name')}
                />
            </div>

            <div className='modal-box'>
                <span>몸무게 : </span>
                <input
                    type='number'
                    placeholder="몸무게를 입력해주세요."
                    value={dogInfo ? dogInfo.weight : ""}
                    onChange={e => handleChange(e, 'weight')}
                >
                </input>
            </div>

            <div className='modal-box'>
                <span>나이 : </span>
                <input
                    type='number'
                    placeholder="나이를 입력해주세요."
                    value={dogInfo ? dogInfo.age : ""}
                    onChange={e => handleChange(e, 'age')}
                />
            </div>

            <div className='modal-box'>
                <span>종 : </span>
                <input
                    type='text'
                    placeholder="종을 입력해주세요."
                    value={dogInfo ? dogInfo.breed : ""}
                    onChange={e => handleChange(e, 'breed')}
                />
            </div>

            <div style={{display: "inline"}}>
                <button className="btn" onClick={handleSave}>저장하기</button>
                <button className="btn" onClick={handleDelete}>삭제하기</button>
            </div>
        </Modal>
    )
}

export default DogModal;