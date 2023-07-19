import ProductBox from '../../components/ProductBox';
import '../../css/ProductRecommendation.css'
import SimpleTopBar from "../bar/SimpleTopBar"
import { useNavigate } from 'react-router-dom';

const ProductRecommendation = () => {
    const navigate = useNavigate();

    return(
        <div>
            <SimpleTopBar text="상품 추천"/>
            
            <div className="recommend-top">
                <span>우리 아이에게는 <br/> 이런 성분이 좋아요!</span>
            </div>

            <div className='recommend-ingredient-box'>
                <div className='recommend-ingredient'>
                    <span>루테인</span>
                    <div/>
                    <span>베타카로틴</span>
                    <div/>
                    <span>비타민A</span>
                </div>
            </div>
            

            <div className='line4'/>

            <div className='recommend-product-list'>
                <span>dear my pet에서 <br/> 판매중인 상품이에요!</span>
            </div>

            <ProductBox/>
            <div style={{height: "60px"}}/>

            <div className="recommend-product-button">
                <button className='buy-button' onClick={()=>{ navigate("/shop")}}> 더 많은 상품 보러가기</button>
            </div>
        </div>
    )
}

export default ProductRecommendation;