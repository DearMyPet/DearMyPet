import '../../css/Check.css';
import user from '../../img/user.png';
import fileImg from '../../img/fileImg.svg';
import more from '../../img/more.svg';
import dropdown from '../../img/dropdown.svg';
import { Link } from "react-router-dom";



function Check(){
    return(
        <div className="Check">
            <div className='user-title'>
                <img className='user-img' src={user}/>
                <span className='user-name'>덴버</span>
            </div>

            <span className='title'>파일을 업로드 해주세요</span>
            <span className='content'>아래에 사진을 첨부에 주세요</span>


            <div class="filebox">
                <label for="file">
                    <img className='file-img' src={fileImg}/>
                    <span className='file-info'>이곳을 클릭하여 파일을 선택할 수 있어요</span>
                </label> 
                <input type="file" id="file" accept="image/*" capture="camera"/>
            </div>

            <Link className='check-btn' to="/checking">
                진단하기
                {/* <input className='check-btn' type='submit' method = 'post' action = 'checking.js' value='진단하기'/> */}
            </Link>
            method = "post" action = "test.php"
            

            <div className='eyeguide-check'>눈 진단 가이드 확인하기
                <img className='check-more' src={more}/>
            </div>
            <div className='skinguide-check'>피부 진단 가이드 확인하기
                <img className='check-more' src={more}/>    
            </div>

            

            

        </div>
    );
}

export default Check;