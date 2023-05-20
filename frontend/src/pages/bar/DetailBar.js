import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import cart from '../../img/cart.svg'
import myPage from '../../img/myPage.svg'
import { SlArrowLeft } from "react-icons/sl";

const DetailBar = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

    return(
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand onClick={handleGoBack}> 
                        <SlArrowLeft/>
                    </Navbar.Brand>
                    <Navbar.Brand>상품</Navbar.Brand>
                    <Navbar.Brand className='topIcon'>
                        <img src={cart} className='cart'/>
                        <img src={myPage} className='user'/>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default DetailBar;