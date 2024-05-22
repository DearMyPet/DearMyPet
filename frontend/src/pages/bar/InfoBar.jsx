import { BsInstagram } from "react-icons/bs";
import { FaFacebookF} from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";

const InfoBar = () => {
    return(
        <div>
            <div className="info-bar">
                <div style={{height:"60px"}}/>
                <span className="infoBar-title">DEARMYPET</span><br/>
                <span className="infoBar-sub-title">디어마이펫 포 유</span>
                <div className="gap20"/>
                <div className="infoBar-content">
                    <p>
                        경기도 시흥시 산기대학로 237  11층<br/>
                        사업자등록번호: 202-03-14030<br/>
                        통신판매업신고: 2023-경기시흥-0318<br/>
                        대표: OOO  |  개인정보책임자: OOO<br/>
                        TEL: 2020-2024  |  Email: dearmypet@.gmail.com<br/>
                    </p>
                    <div className="gap20"/>
                    <span style={{marginRight:"50px"}}>개인정보취급방침</span>
                    <span>이용약관</span><br/>
                    <div className="gap20"/>
                    <span>© 2023 DEARMYPET Company</span>
                </div>
                
            </div>
            <div className="gap20"/>
            <div className="sns-icon">
                    <BsInstagram style={{marginRight:"10px"}}/>
                    <FaFacebookF style={{marginRight:"10px"}}/>
                    <RiKakaoTalkFill/>
            </div>
            <div className="gap20"/>
        </div>
        
    );
}

export default InfoBar;