import axios from 'axios';
import '../../css/EJoin.css';
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const EPhone = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const formData = location.state?.formData;

    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [phone, setPhone] = useState("");

    const handlePhoneChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, "");
        if (value.length > 3 && value.length <= 7) {
            value = value.slice(0, 3) + "-" + value.slice(3);
        } else if (value.length > 7) {
            value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11);
        }
        setPhone(value);
    };

    const isValid = name && nickname && phone;

    const join = () => {
        if (!isValid) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        axios.post("http://127.0.0.1:8000/api/users/join", {
            email: formData.email,
            password: formData.password,
            name: name,
            nickname: nickname,
            phone: phone
        })
        .then((response)=>{
            alert("회원가입을 완료하였습니다.");
            setTimeout(() => {
                navigate("/finelogin", { state: { userName: name } });
            }, 1000);
        })
        .catch((error)=>{
            alert("회원가입 실패!")
        })
    }

    return(
        <div className="EJoin">
            <h4>사용자님의 <br/>
            상세 정보를 알려주세요
            </h4>

            <div className='auth-form'>
                <span className='auth-title'>이름</span>
                <input className='auth-box'
                    type='name'
                    name='name' 
                    placeholder="이름을 입력해 주세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>


            <div className='auth-form'>
                <span className='auth-title'>닉네임</span>
                <input className='auth-box'
                    type='nickname'
                    name='nickname' 
                    placeholder="닉네임을 입력해 주세요"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </div>

            <div className='auth-form'>
                <span className='auth-title'>휴대폰번호</span>
                <input className='auth-box'
                    type='tel'
                    name='tel' 
                    placeholder="휴대폰번호를 입력해 주세요"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength="13"
                />
            </div>
{/* 
            <div className='auth-form'>
                <span className='auth-title'>인증번호</span>
                <input className='auth-box'
                type="number"
                name="number"
                placeholder="인증번호를 입력해 주세요"/>
            </div> */}

            <button className='nextButton' onClick={join} style={{background: isValid ? 'black' : ''}}>회원가입</button>

        </div>
    );
}

export default EPhone;