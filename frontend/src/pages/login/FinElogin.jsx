import '../../css/FinElogin.css';
import FinJoinIcon from '../../img/FinJoinIcon.png';
import { useNavigate, useLocation } from "react-router-dom";


const FinElogin = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const userName = location.state?.userName;

    return(
        <div className="FinElogin">
            <h4>{userName}님, <br/>
                가입을 축하합니다
            </h4>

            <span className='finlogin-cont'>로그인 후<br/>
                다양한 서비스를 경험해 보세요!</span>

            <div className='fine-box'>
                <img className='finlogin-logo' src={FinJoinIcon} alt='logo'/>

                <button className='loginButton' onClick={()=>navigate("/login")}>로그인</button>
            </div>
        </div>
    );
}

export default FinElogin;