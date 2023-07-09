import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailImg from '../../img/detailImg.svg'
import { RxShare2 } from "react-icons/rx";
import DetailBar from '../bar/DetailBar';
import { Tab, Tabs, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ProductInfo from '../../components/ProductInfo';
import Review from '../../components/Review';
import InfoBar from '../bar/InfoBar';
import ProductDesc from '../../components/ProductDesc';
import ProductInquiry from '../../components/ProductInquiry';

const Detail = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <div>
            <DetailBar text="상품" className="detail-navbar"/>
            <div className='shop-page'>
                <img src={DetailImg}/>
                <div className='detail'>
                    <br/>
                    무료배송
                    <RxShare2 className='share'/>
                    <h6 style={{"fontWeight":"bold"}}>[간식] 맛있는 육포</h6>
                    오독오독 씹어먹는 영양간식 (생후 4개월 이상)
                    <div> 
                        <h3 style={{ display: 'inline' }}>5,500</h3> 원
                    </div>
                </div>
                <div className="horizontal-line"/>
                <div className='sell-detail'>
                    <div>
                        <span className='label'>배송비</span> 
                        <span className='value'>무료배송</span>
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
                            TabIndicatorProps={{style: {background:'black'}}}
                        >
                            <Tab label="상품정보" value="1" />
                            <Tab label="상품설명" value="2" />
                            <Tab label="후기" value="3" />
                            <Tab label="문의" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"> <ProductInfo/> </TabPanel>
                    <TabPanel value="2"> <ProductDesc/> </TabPanel>
                    <TabPanel value="3"> <Review/> </TabPanel>
                    <TabPanel value="4"> <ProductInquiry/> </TabPanel>
                </TabContext>
            </div>

            <InfoBar/>

            <Container className='bottom-bar'>
                <Navbar.Brand>
                    <button className='buy-button' onClick={()=>{ navigate("/order")}}> 구매하기</button>
                </Navbar.Brand>
            </Container>
        </div>
    );
}

export default Detail;