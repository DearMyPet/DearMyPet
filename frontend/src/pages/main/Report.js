import '../../css/Report.css';
import back from '../../img/back.svg';


function Report(){
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜

    return(
        <div className="Report">
            <div className='top-menu'>
                <img className='back' src={back}/>
                <h4>피부 검진 결과</h4>
            </div>

            <div className='total-result'>
                <span>종합 결과</span>
                <span>2023.01.20.</span>
                <span>덴버(골든 리트리버)</span>
                <span>2가지의 이상 징후가 있어요</span>
                <hr/>

            </div>
        </div>
    );
}

export default Report;