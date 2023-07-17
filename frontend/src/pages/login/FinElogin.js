import '../../css/FinElogin.css';
import FinJoinIcon from '../../img/FinJoinIcon.png';
import { Link } from 'react-router-dom';


function FinElogin(){
    return(
        <div className="FinElogin">
            <h4>DEARMYPET님, <br/>
                가입을 축하합니다
            </h4>
            <span className='finlogin-cont'>로그인 후<br/>
                다양한 서비스를 경험해 보세요!</span>

            <img className='finlogin-logo' src={FinJoinIcon}/>

            <Link className='loginBtn' to="/elogin">로그인</Link>
        </div>
    );
}

export default FinElogin;