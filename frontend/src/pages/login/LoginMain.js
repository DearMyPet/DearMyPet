import logo from '../../img/logo.png'
import kakaologo from '../../img/kakaologo.svg'
import '../../css/LoginMain.css';
import { Link } from 'react-router-dom';



function LoginMain() {


  return (
    <div className="Login">
        <h3 className='login-title'>#dear my pet</h3>
        <div className='logo' style={{backgroundImage : 'url('+ logo +')'}}></div>

        <button className='kakao-login'>
            <img src={kakaologo}/>
            <span>카카오톡으로 시작하기</span>
        </button>
        
        <div className='email-login'>
          <Link className='link' to="/ejoin">이메일 가입</Link>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <Link className='link' to="/elogin">이메일 로그인</Link>
        </div>
    </div>
  );
}

export default LoginMain;
