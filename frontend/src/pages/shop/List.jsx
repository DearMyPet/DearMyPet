import Product from '../../components/Product';
import DetailBar from '../bar/DetailBar';
import NavBottomBar from '../bar/NavBottomBar';
import { useLocation } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

const List = () => {
    const location = useLocation();
    const selectedCategory = location.state?.category || "전체 보기";

    return(
        <div>
            <DetailBar text={selectedCategory} />
            <div style={{"height": "60px"}}/>

            <div className='banner'/>

            <div className='info-list-head'>
                <div className='info-list'>
                    <span className='list-title'>총 <span style={{ color: 'blue', style: "bold" }}>10개</span> 상품</span>
                </div>
                <div className='fillter-toggle'>
                    <Dropdown as={NavItem}>
                        <Dropdown.Toggle as={NavLink}>추천순</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>가격 낮은 순</Dropdown.Item>
                            <Dropdown.Item>가격높은 순</Dropdown.Item>
                            <Dropdown.Item>리뷰 높은 순</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            
            <Product />

            <NavBottomBar/>
        </div>
    )
}

export default List;