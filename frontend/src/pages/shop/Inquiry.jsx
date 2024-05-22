import SimpleTopBar from "../bar/SimpleTopBar";
import { useParams } from 'react-router-dom';
import orderProduct from "../../img/orderProduct.png"

const Inquiry = () => {
    const { id } = useParams();
    console.log(id)

    return(
        <div>
            <SimpleTopBar text="문의하기"/>
            <div style={{height:"60px"}}/>

            <div className="order-info">
                {/* <span className="order-product-title" >문의 상품</span> */}
                <div className="order-product">
                    <img src={orderProduct} className="order-product-img" alt="orderProduct"/>
                    <div className="product-cont">
                        <span className="product-title">동결건조 딸기</span>
                        <span className="product-detail">수량 1개</span>
                        <span className="order-price">7,500 원</span>
                    </div>
                </div>
            </div>

            <br/>

            <span>문의 내용 : </span>

            <span>태그(배송, 상품, 기타) : </span>
        </div>
    )
}

export default Inquiry;