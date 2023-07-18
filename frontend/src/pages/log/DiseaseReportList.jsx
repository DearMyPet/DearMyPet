import SimpleTopBar from "../bar/SimpleTopBar"
import { Tab, Tabs, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {  useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReportList from "../../components/ReportList";
import Desc from "../../img/desc.svg"

const DiseaseReportList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const defaultValue = location.state?.defaultValue || "";
    const [value, setValue] = useState(defaultValue);

    const ReportData = [
        { date: "2023.04.12", state: "이상 징후 2가지"},
        { date: "2023.03.11", state: "이상 징후 1가지"},
    ]; // 예시 데이터

    const [report, setReport] = useState(ReportData);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <SimpleTopBar text="체크 기록"/>
            <div style={{height: "60px"}}/>

            <div className="log-body">
                <TabContext value={value}>
                    <Box>
                        <TabList 
                            onChange={handleChange} 
                            variant="fullWidth" 
                            textColor='black'
                            TabIndicatorProps={{style: {background:'black'}}}
                        >
                            <Tab label="눈" value="1" />
                            <Tab label="피부" value="2" />
                        </TabList>
                    </Box>
                    
                    <TabPanel value="1"> 
                        <ReportList list={report}/> 
                    </TabPanel>
                    <TabPanel value="2"> 
                        <ReportList list={report}/> 
                    </TabPanel>
                </TabContext>

                <div className="desc-box">
                    <img src={Desc}/>
                    <span className="desc">
                        해당 체크 기록은 최근 15건을 기준으로 제공해요. 이전
                        기록은 통계로만 확인하실 수 있어요.
                    </span>
                </div>
            </div>

            <div className="report-button">
                <button className='buy-button' onClick={()=>{ navigate("/main")}}> 건강진단 하러가기</button>
            </div>
        </div>
    )
}

export default DiseaseReportList;