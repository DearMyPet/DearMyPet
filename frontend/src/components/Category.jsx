import { useNavigate } from 'react-router-dom'
import Circle from '../img/circle.svg'

const Catagory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate("/lists", { state: { category: categoryName } });
  };

  return(
    <div className='category-list'>
      <div onClick={()=>handleCategoryClick("전체 보기")}>
        <img src={Circle}/> 
        <span>전체 보기</span>
      </div>
      <div onClick={()=>handleCategoryClick("수제 사료")}>
        <img src={Circle}/> 
        <span>수제 사료</span>
      </div>
      <div onClick={()=>handleCategoryClick("수제 간식")}>
        <img src={Circle}/> 
        <span>수제 간식</span>
      </div>
      <div onClick={()=>handleCategoryClick("정기 구독")}>
        <img src={Circle}/> 
        <span>정기 구독</span>
      </div>
    </div>
  );
}

export default Catagory;