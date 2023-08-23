import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import '../../css/NavBar.css'
import cart from '../../img/cart.svg'


const NavBar = () => {
    let navigate = useNavigate();
    return (
        <div>
             {[false].map((expand) => (
                <Navbar key={expand} bg="white" expand={expand} className="navbar">
                    <Container fluid>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                        <Navbar.Brand className='topIcon'>
                            <img src={cart} className='cart' onClick={()=>navigate("/cart")} alt=""/>
                        </Navbar.Brand>
                        
                        <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start">

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
                            <Nav.Link onClick={()=>{ navigate("/detail")}}>전체 보기</Nav.Link>
                            <Nav.Link onClick={()=>{ navigate("/detail")}}>수제 사료</Nav.Link>
                            <Nav.Link onClick={()=>{ navigate("/detail")}}>수제 간식</Nav.Link>
                            <NavDropdown
                                title="정기 구독"
                                id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                <NavDropdown.Item onClick={()=>{ navigate("/detail")}}>정기 구독 신청</NavDropdown.Item>
                                <NavDropdown.Item onClick={()=>{ navigate("/detail")}}>정기 구독 해지</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={()=>{ navigate("/detail")}}>요금제 보기</NavDropdown.Item>
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