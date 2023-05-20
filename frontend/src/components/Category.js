import { useNavigate } from 'react-router-dom'
import Circle from '../img/circle.svg'

const Catagory = () => {
  let navigate = useNavigate();

  return(
    <div className='category-list'>
      <div onClick={()=>{navigate("/detail")}}>
        <img src={Circle}/> 
        <span>전체 보기</span>
      </div>
      <div onClick={()=>{navigate("/detail")}}>
        <img src={Circle}/> 
        <span>수제 사료</span>
      </div>
      <div onClick={()=>{navigate("/detail")}}>
        <img src={Circle}/> 
        <span>수제 간식</span>
      </div>
      <div onClick={()=>{navigate("/detail")}}>
        <img src={Circle}/> 
        <span>정기 구독</span>
      </div>
    </div>
  );
}

export default Catagory;