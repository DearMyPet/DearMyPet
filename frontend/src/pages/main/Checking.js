import '../../css/Checking.css';
import denber from '../../img/denber.png';
import checking_logo from '../../img/checking_logo.png';
import { Link } from 'react-router-dom';


function Checking(){
    return(
        <div className="Checking">
            
            <img className='denber' src={denber}></img>
            <div className='img-box'>
                <span className='checking-cont'>덴버의 피부를 체크하는 중입니다</span>
                <img className='checking_logo' src={checking_logo}></img>
            </div>

        </div>
    );
}

export default Checking;