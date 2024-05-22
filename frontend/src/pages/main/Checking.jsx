import '../../css/Checking.css';
import denber from '../../img/denber.png';
import checking_logo from '../../img/checking_logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

const Checking = () => {
    const naqvigate = useNavigate();

    const location = useLocation();
    const uploadedImage = location.state.img;
    const selectedPart = location.state.part;

    return(
        <div className="Checking">
            {/* <img className='denber' src={denber}></img> */}
            <div className='img-box'>
                <span className='checking-cont'>{selectedPart}을 체크하는 중입니다.</span>
                <img className='checking_logo' src={checking_logo} onClick={()=>naqvigate("/report")}/>
            </div>

        </div>
    );
}

export default Checking;