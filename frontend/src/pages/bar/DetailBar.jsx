import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import cart from '../../img/cart.svg'
import myPage from '../../img/myPage.svg'
import { SlArrowLeft } from "react-icons/sl";
import { useState } from "react";

const DetailBar = ({ text }) => {
    const navigate = useNavigate();
    const title = useState(text);
    const handleGoBack = () => {
      navigate(-1);
    };

    return(
        <div>
            <Navbar fixed="top" bg="white" className="detail-nav">
                <Container>
                    <Navbar.Brand onClick={handleGoBack}> 
                        <SlArrowLeft/>
                    </Navbar.Brand>
                    <Navbar.Brand className="header">{title}</Navbar.Brand>
                    <Navbar.Brand className='topIcon'>
                        <img src={cart} className='cart'onClick={()=>{navigate("/cart")}}/>
                        <img src={myPage} className='user'/>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default DetailBar;