import { useState } from "react";
import axios from 'axios';

const ProductInfoRegistration = () => {
    const [productInfo, setProductInfo] = useState({
        id: '',
        category_desc1: '',
        category_desc2: '',
        category_desc3: '',
        stiffness: '',
        size: '',
        content1: '',
        content2: '',
        content_img: null,
        ingredient_img1: null,
        ingredient_img2: null,
        ingredient1: '',
        ingredient2: '',
        ship_method_img: null,
        summary_info_img: null
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setProductInfo(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setProductInfo(prev => ({ ...prev, [name]: value }));
        }
    };

    const registrationProductInfo = () => {
        const formData = new FormData();
        for (const key in productInfo) {
            formData.append(key, productInfo[key]);
        }

        axios.post(`http://127.0.0.1:8000/api/products/${productInfo.id}`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            alert("등록 완료!");
        })
        .catch(error => {
            alert('등록 실패...');
            console.log(error)
        });
    }

    return(
        <div style={{padding: "20px"}}>
            <h2>상품 상세 정보 등록</h2>

            <div style={{textAlign: "left"}}>
                <div style={{padding: "10px"}}>
                    <span>id : </span>
                    <input 
                        type='number' 
                        name="id"
                        value={productInfo.id}
                        onChange={handleInputChange}/>
                    <br/>
                    <span>category_desc1 : </span>
                    <input 
                        type='text' 
                        name="category_desc1"
                        value={productInfo.category_desc1}
                        onChange={handleInputChange}/>
                    <br/>
                    <span>category_desc2 : </span>
                    <input 
                        type='text' 
                        name="category_desc2"
                        value={productInfo.category_desc2}
                        onChange={handleInputChange}/>
                    <br/>
                    <span>category_desc3 : </span>
                    <input 
                        type='text' 
                        name="category_desc3"
                        value={productInfo.category_desc3}
                        onChange={handleInputChange}/>
                </div>
            </div>

            <div style={{textAlign: "left"}}>
                <div style={{padding: "10px"}}>
                    <span>stiffness : </span>
                    <input 
                        type='number' 
                        name="stiffness"
                        value={productInfo.stiffness}
                        onChange={handleInputChange}/>
                    <br/>
                    <span>size : </span>
                    <input 
                        type='number'
                        name="size"
                        value={productInfo.size}
                        onChange={handleInputChange}/>
                </div>
            </div>

            <div style={{textAlign: "left"}}>
                <div style={{padding: "10px"}}>
                    <span>content1 : </span>
                    <input 
                        type='text' 
                        name="content1"
                        value={productInfo.content1}
                        onChange={handleInputChange}/>
                    <br/>
                    <span>content2 : </span>
                    <input 
                        type='text' 
                        name="content2"
                        value={productInfo.content2}
                        onChange={handleInputChange}/>
                </div>
            </div>

            <div style={{textAlign: "left"}}>
                <div style={{padding: "10px"}}>
                    <span>content_img : </span>
                    <input 
                        type='file'
                        name="content_img"
                        onChange={handleInputChange}/>

                    <span>ingredient_img1: </span>
                    <input 
                        type='file'
                        name="ingredient_img1"
                        onChange={handleInputChange}/>

                    <span>ingredient_img1: </span>
                    <input 
                        type='file'
                        name="ingredient_img2"
                        onChange={handleInputChange}/>
                </div>
            </div>

            <div style={{textAlign: "left"}}>
                <div style={{padding: "10px"}}>
                    <span>ingredient1 : </span>
                    <input 
                        type='text' 
                        name="ingredient1"
                        value={productInfo.ingredient1}
                        onChange={handleInputChange}/>
                    <br/>
                    <span>ingredient2 : </span>
                    <input 
                        type='text' 
                        name="ingredient2"
                        value={productInfo.ingredient2}
                        onChange={handleInputChange}/>
                    <br/>
                </div>
            </div>

            <div style={{textAlign: "left"}}>
                <div style={{padding: "10px"}}>
                    <span>ship_method_img: </span>
                    <input 
                        type='file'
                        name="ship_method_img"
                        onChange={handleInputChange}/>

                    <span>summary_info_img : </span>
                    <input 
                        type='file'
                        name="summary_info_img"
                        onChange={handleInputChange}/>
                </div>
            </div>

            <button onClick={registrationProductInfo}>저장하기</button>
        </div>
    )
}

export default ProductInfoRegistration;