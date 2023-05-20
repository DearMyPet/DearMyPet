import Carousel from 'react-bootstrap/Carousel';
import Catagory from '../../components/Category';
import ShopSlide from '../../img/shopSlide.svg'
import '../../css/Shop.css'
import PopularProduct from '../../components/PopularProduct';

const Shop = () => {
  return (
    <div>
      <Carousel className='slide'>
        <Carousel.Item interval={3000}>
          <img src={ShopSlide} style={{"width":"100%"}}/>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img src={ShopSlide} style={{"width":"100%"}}/>
        </Carousel.Item>
        <Carousel.Item>
        <img src={ShopSlide} style={{"width":"100%"}}/>
        </Carousel.Item>
      </Carousel>

      <h5  className='catagory'> 카테고리 </h5>
      <Catagory/>

      <h5 className='popular'> 인기 상품 </h5>
      <PopularProduct/>

    </div>
  );
}

export default Shop;