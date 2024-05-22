import { useNavigate } from 'react-router-dom'
import All from '../img/ALL.svg'
import Petbox from '../img/PETBOX.svg'
import Eye from '../img/EYE.svg'
import Skin from '../img/SKIN.svg'

const Catagory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate("/lists", { state: { category: categoryName } });
  };

  return(
    <div className='category-list'>
      <div onClick={()=>handleCategoryClick("전체보기")}>
        <img src={All} alt="All"/> 
        <span>전체 보기</span>
      </div>
      <div onClick={()=>handleCategoryClick("정기구독")}>
        <img src={Petbox} alt="PetBox"/> 
        <span>정기구독</span>
      </div>
      <div onClick={()=>handleCategoryClick("눈")}>
        <img src={Eye} alt="Eye"/> 
        <span>눈</span>
      </div>
      <div onClick={()=>handleCategoryClick("피부")}>
        <img src={Skin} alt="Skin"/> 
        <span>피부</span>
      </div>
    </div>
  );
}

export default Catagory;