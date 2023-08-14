import '../../css/EPhone.css';
import { Link } from 'react-router-dom';

const EPhone = () => {
    return(
        <div className="Ephone">
            <h4>사용자님의 <br/>
            상세 정보를 알려주세요
            </h4>

            <span className='phone-title'>휴대폰번호</span>
            <input className='phone-box'
            type='tel'
            name='tel' 
            placeholder="휴대폰번호를 입력해 주세요"/>

            <span className='number-title'>인증번호</span>
            <input className='number-box'
            type="number"
            name="number"
            placeholder="비밀번호를 입력해 주세요"/>

            <Link className='nextBtn' to="/finelogin">다음으로</Link>

        </div>
    );
}

export default EPhone;