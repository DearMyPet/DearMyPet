import Product from '../../components/Product';
import DetailBar from '../bar/DetailBar';
import NavBottomBar from '../bar/NavBottomBar';
import { useLocation } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {
    const location = useLocation();
    const selectedCategory = location.state?.category || "전체보기";
    const [productList, setProductList] = useState(); 

    useEffect(() => {
        let url = `http://127.0.0.1:8000/api/products`;
        if(selectedCategory !== "전체보기") {
            url += `?part=${selectedCategory}`;
        }
        
        axios.get(url)
        .then(response => {
            setProductList(response.data);
        })
    }, [selectedCategory])

    const [sortOrder, setSortOrder] = useState('정렬');

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
        const sortedList = [...productList];
        if (order === '가격 낮은 순') {
            sortedList.sort((a, b) => a.price - b.price);
        } else if (order === '가격 높은 순') {
            sortedList.sort((a, b) => b.price - a.price);
        }
        setProductList(sortedList);
    };

    return(
        <div>
            <DetailBar text={selectedCategory} />
            <div style={{"height": "60px"}}/>

            <div className='banner'/>

            <div className='info-list-head'>
                <div className='info-list'>
                    <span className='list-title'>
                        총 <span style={{ color: 'blue', style: "bold" }}>{productList?.length || 0}개</span> 상품
                    </span>
                </div>
                <div className='fillter-toggle'>
                    <Dropdown as={NavItem}>
                        <Dropdown.Toggle as={NavLink}>
                        {sortOrder === '정렬' ? '정렬' : sortOrder === '가격 낮은 순' ? '가격 낮은 순' : '가격 높은 순'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSortOrderChange('가격 낮은 순')}>가격 낮은 순</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortOrderChange('가격 높은 순')}>가격 높은 순</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            
            <Product data={productList}/>

            <NavBottomBar/>
        </div>
    )
}

export default List;