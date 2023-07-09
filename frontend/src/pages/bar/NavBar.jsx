import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import '../../css/NavBar.css'
import menu1 from '../../img/menu1.svg';
import menu2 from '../../img/menu2.svg';
import menu3 from '../../img/menu3.svg';
import menu4 from '../../img/menu4.svg';
import cart from '../../img/cart.svg'
import myPage from '../../img/myPage.svg'


const NavBar = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryName) => {
        navigate("/lists", { state: { category: categoryName } });
    };
    return (
        <div>
             {[false].map((expand) => (
                <Navbar fixed='top' key={expand} bg="white" expand={expand} className="navbar">
                    <Container fluid>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                        <Navbar.Brand className='topIcon'>
                            <img src={cart} className='cart' onClick={()=>{navigate("/cart")}}/>
                            <img src={myPage} className='user'/>
                        </Navbar.Brand>
                        
                        <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start"
                        className="menu-btn">

                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            DearMyPet
                        </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                        <Nav className="menu">
                        <Form className="menu_form">
                            <div className="searchContainer">
                            <Form.Control
                                type="search"
                                placeholder="무엇을 찾으시나요?"
                                className="searchBox"
                                aria-label="Search"
                            />
                            <FiSearch className="searchIcon" />
                            </div>
                        </Form>
                            <Nav.Link onClick={()=>{ navigate("/home")}}>Home</Nav.Link>
                            <Nav.Link onClick={()=>handleCategoryClick("전체 보기")}>전체 보기</Nav.Link>
                            <Nav.Link onClick={()=>handleCategoryClick("수제 사료")}>수제 사료</Nav.Link>
                            <Nav.Link onClick={()=>handleCategoryClick("수제 간식")}>수제 간식</Nav.Link>
                            <NavDropdown
                                title="정기 구독"
                                id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                <NavDropdown.Item onClick={()=>{ navigate("/lists")}}>정기 구독 신청</NavDropdown.Item>
                                <NavDropdown.Item onClick={()=>{ navigate("/lists")}}>정기 구독 해지</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={()=>{ navigate("/lists")}}>요금제 보기</NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                            
                        </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    );
}

export default NavBar; 