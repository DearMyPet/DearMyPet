import { useState } from 'react';
import axios from 'axios';

const ProductRegistration = () => {
    const [type, setType] = useState('');
    const [part, setPart] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);

    const registrationProduct = () => {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('part', part);
        formData.append('name', productName);
        formData.append('price', price);
        if (image) {
            formData.append('img', image);
        }

        axios.post("http://127.0.0.1:8000/api/products/", formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            alert("등록 완료!");
        })
        .catch(error => {
            alert('등록 실패...');
        });
    }

    return(
        <div style={{padding: "40px 20px"}}>
            <h2>상품 등록</h2>
            <div style={{textAlign: "left"}}>
                <div style={{padding: "10px"}}>
                    <span>타입(사료, 간식) : </span>
                    <input type='text' value={type} onChange={(e) => setType(e.target.value)}/>
                </div>

                <div style={{padding: "10px"}}>
                    <span>파트(눈, 피부) : </span>
                    <input type='text' value={part} onChange={(e) => setPart(e.target.value)}/>
                </div>

                <div style={{padding: "10px"}}>
                    <span>상품명 : </span>
                    <input type='text' value={productName} onChange={(e) => setProductName(e.target.value)}/>
                </div>

                <div style={{padding: "10px"}}>
                    <span>가격 : </span>
                    <input type='number' value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>

                <div style={{padding: "10px"}}>
                    <span>사진 : </span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                </div>
            </div>

            <button onClick={registrationProduct}>저장하기</button>
        </div>
    )
}

export default ProductRegistration;