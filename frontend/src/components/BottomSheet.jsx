import "../css/BottomSheet.css"
import { IoClose } from "react-icons/io5";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const BottomSheet = ({ id, price, closeModal }) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const calculatePrice = () => {
        let total = price;
        return total * quantity;
    };

    const handleOrder = () => {
        navigate("/order")
    };
    
    const addToCart = () => {
        const userId = sessionStorage.getItem("user");
        axios.post(`http://127.0.0.1:8000/api/users/cart/${userId}`,{
            quantity: quantity,
            product: id
        })
        .then(response => {
            alert("상품이 장바구니에 담겼습니다.");
        })
    }

    return (
      <div className="modal-background">
        <div className="bottom-sheet">
            <div className="bottom-sheet-header">
                <IoClose className='close-button' onClick={closeModal}/>
            </div>
            <div className="bottom-sheet-body">
                <span>수량을 선택해주세요.</span><br/><br/>
                <div className="body-item-box">
                    <div className="quantity-control">
                        <FiMinusCircle onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}/>
                            {quantity}
                        <FiPlusCircle  onClick={() => setQuantity(prev => prev + 1)}/> 
                    </div>
                    <div>{(calculatePrice()).toLocaleString()} 원</div>
                </div>
                
            </div>
            <div className="bottom-sheet-button-container">
                <button onClick={addToCart}>장바구니 담기</button>
                <button onClick={handleOrder}>바로 구매하기</button>
            </div>
        </div>
      </div>
    );
  }
  
  export default BottomSheet;