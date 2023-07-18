import '../../css/Main.css';
import mypage from '../../img/my_page.svg'
import bell from '../../img/bell.svg'
import { Link } from 'react-router-dom';

function Main(){
    return(
        
        <div className="Main">
            <div className='main-navbar'>
                <img className='mypage' src={mypage}/>
                <img className='bell' src={bell}/>
            </div>

            <h4 className='main-title'>진단</h4>

            <div className='notice'>
                <span className='notice-text'>💡DMP 안내</span>
            </div>

            <div className='main-content'> 
                <Link className='eye-examination' to="/check">
                    <span className='box-title'>눈 건강<br/></span>
                    <span className='box-exp'>이상 징후 체크</span>
                </Link>
                <Link className='skin-examination' to="/check">
                    <span className='box-title'>피부 건강<br/></span>
                    <span className='box-exp'>이상 징후 체크</span>
                </Link>
                <Link className='examination-report' to="/check">
                    <span className='box-title'>진단 기록 보기</span>
                </Link>
            </div>
            <div>
                <span className='guide-title'>🔎 진단 가이드 확인하기</span>
                <div className='guide-box'>
                    <Link className='eye-guide' to="/">눈 진단 가이드 👀</Link>
                    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <Link className='skin-guide' to="/">피부 진단 가이드 🐾</Link>
                </div>
            </div>

            

        </div>
    );
}

export default Main;