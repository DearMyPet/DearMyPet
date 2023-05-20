import { useState } from 'react';
import DetailImg from '../../img/detailImg.svg'
import { RxShare2 } from "react-icons/rx";
import DetailBar from '../bar/DetailBar';
import { Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const Detail = () => {
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <div>
            <DetailBar/>
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
            <div className="horizontal-line"></div>
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
                    <TabList onChange={handleChange} variant="fullWidth" >
                        <Tab label="상품정보" value="1" />
                        <Tab label="후기" value="2" />
                        <Tab label="문의" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">상품정보</TabPanel>
                <TabPanel value="2">후기</TabPanel>
                <TabPanel value="3">문의</TabPanel>
            </TabContext>
        </div>
    );
}

export default Detail;