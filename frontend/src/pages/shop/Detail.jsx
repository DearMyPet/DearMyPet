import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailBar from '../bar/DetailBar';
import { Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ProductInfo from '../../components/ProductInfo';
import Review from '../../components/Review';
import InfoBar from '../bar/InfoBar';
import ProductDesc from '../../components/ProductDesc';
import ProductInquiry from '../../components/ProductInquiry';
import BottomSheet from '../../components/BottomSheet';
import axios from "axios";

const Detail = () => {
    const { id } = useParams(); // url에서 가져온 상품 id
    const [value, setValue] = useState("1");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [product, setProduct] = useState({
        "product": {
            id: '',
            type: '',
            part: '',
            name: '',
            price: 0,
            img: null
        },
        "product-info": {
            id: '',
            category_desc1: '',
            category_desc2: '',
            category_desc3: '',
            stiffness: '',
            size: '',
            content1: '',
            content2: '',
            content_img: null,
            ingredient_img1: null,
            ingredient_img2: null,
            ingredient1: '',
            ingredient2: '',
            ship_method_img: null,
            summary_info_img: null
        }
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/products/${id}`)
        .then(response => {
            setProduct(response.data);
        })
        .catch(error => {})
    }, []);

    return(
        <div>
            <DetailBar text="상품" className="detail-navbar"/>
            <div className='shop-page'>
                <img src={product.product.img}/>
                <div className='detail'>
                    <br/>
                    무료배송
                    <h6 style={{"fontWeight":"bold"}}>[{product.product.type}] {product.product.name}</h6>
                    {/* 오독오독 씹어먹는 영양간식 (생후 4개월 이상) */}
                    <div> 
                        <h3 style={{ display: 'inline' }}>{Number(product.product.price).toLocaleString()}</h3> 원
                    </div>
                </div>
                <div className="horizontal-line"/>
                <div className='sell-detail'>
                    <div>
                        <span className='label'>배송비</span> 
                        <span className='value'>2,500원</span>
                        <span className='sub-label'>19,800원 이상 주문 시 무료배송</span>
                        <span className='label'>판매자</span> 
                        <span className='value'>디마켓</span>
                    </div>
                </div>
                <div className="horizontal-line"></div>

                <TabContext value={value}>
                    <Box>
                        <TabList 
                            onChange={handleChange} 
                            variant="fullWidth" 
                            textColor='black'
                            TabIndicatorProps={{style: {background:'black', color: 'black'}}}
                        >
                            <Tab label="상품정보" value="1" />
                            <Tab label="상품설명" value="2" />
                            <Tab label="후기" value="3" />
                            <Tab label="문의" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"> <ProductInfo id={id}/> </TabPanel>
                    <TabPanel value="2"> <ProductDesc id={id}/> </TabPanel>
                    <TabPanel value="3"> <Review id={id}/> </TabPanel>
                    <TabPanel value="4"> <ProductInquiry id={id}/> </TabPanel>
                </TabContext>
            </div>

            <InfoBar/>

            <Container className='bottom-bar'>
                <Navbar.Brand>
                    <button className='buy-button' onClick={()=>{ setIsModalOpen(true) }}> 구매하기</button>
                </Navbar.Brand>
            </Container>
            {isModalOpen? <BottomSheet id={product.product.id} price={product.product.price} closeModal={() => setIsModalOpen(false)}/> : null}     
        </div>
    );
}

export default Detail;