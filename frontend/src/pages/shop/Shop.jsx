import Carousel from 'react-bootstrap/Carousel';
import Catagory from '../../components/Category';
import ShopSlide from '../../img/shopSlide.svg'
import '../../css/Shop.css'
import NavBar from '../bar/NavBar';
import NavBottomBar from '../bar/NavBottomBar';
import { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import popularList from "../../img/popularList.png"
import MdPick from "../../img/md-pick1.svg"

const imgArr = ['1','2','3','4','5','6','7'].slice(0,6); // 임시 데이터

const Shop = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("전체");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % 2;
      setCurrentSlide(nextSlide);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentSlide]);

  const getFilteredImages = () => {
    if (activeTab === '전체') {
      return imgArr;
    } else if (activeTab === '눈 건강') {
      return imgArr.filter((image, index) => index % 2 === 0); // 임시 코드
    } else if (activeTab === '피부 건강') {
      return imgArr.filter((image, index) => index % 2 !== 0); // 임시 코드
    }
  };

  const filteredImages = getFilteredImages();

  return (
    <div>
      <NavBar/>
      <div className='shop-page'>
        <Carousel>
          <Carousel.Item interval={3000}>
            <img src={ShopSlide} style={{"width":"100%"}} alt="slide1"/>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img src={ShopSlide} style={{"width":"100%"}} alt="slide2"/>
          </Carousel.Item>
          <Carousel.Item>
          <img src={ShopSlide} style={{"width":"100%"}} alt="slide3"/>
          </Carousel.Item>
        </Carousel>

        <span  className='shop-catagory'> 카테고리 </span>
        <Catagory/>

        <div className='ad-banner'></div>

        <span className='shop-catagory'> 추천 리스트 </span>
        <CarouselProvider
            className='slider-list'
            naturalSlideWidth={390}
            naturalSlideHeight={130}
            totalSlides={2}
            currentSlide={currentSlide}
        >
          <Slider>
              <Slide index={0}>
                <img className='recom-list1' src={popularList} alt="Popular Product 1" />
                <img src={popularList} alt="Popular Product 1" />
              </Slide>
              <Slide index={1}>
                <img className='recom-list1' src={popularList} alt="Popular Product 2" />
                <img src={popularList} alt="Popular Product 2" />
              </Slide>
          </Slider>
        </CarouselProvider>

        <span className='shop-catagory'> MD Pick! </span>

        <div className='nav-md-pick'>
          <ul className="nav nav-underline" defaultChecked="">
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "전체" ? 'active' : ''}`}
                onClick={() => handleTabClick("전체")}
              >
                전체  
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "눈 건강" ? 'active' : ''}`}
                onClick={() => handleTabClick("눈 건강")}
              >
                눈 건강  
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${activeTab === "피부 건강" ? 'active' : ''}`}
                onClick={() => handleTabClick("피부 건강")}
              >
                피부 건강  
              </a>
            </li>
          </ul>
        </div>

        <div className="md-pick-img">
          {filteredImages.map((imageSrc, index) => (
            <img key={index} src={MdPick} alt=""/>
          ))}
        </div>

      </div>
      <NavBottomBar/>
    </div>
  );
}

export default Shop;