import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { SlArrowLeft } from "react-icons/sl";

const SimpleTopBar = ({ text }) => {
    const navigate = useNavigate();
    
    const handleGoBack = () => {
      navigate(-1);
    };

    return(
            <Navbar fixed="top" bg="white">
                <Container>
                    <Navbar.Brand > <SlArrowLeft onClick={handleGoBack}/></Navbar.Brand>
                    <Navbar.Brand className="order-header">{text}</Navbar.Brand>
                </Container>
            </Navbar>
    )
}

export default SimpleTopBar;