import ProductData from "../data/ProductData"
import { useNavigate } from "react-router-dom";

const Product = () => {
    const navigate = useNavigate();

    return(
        <div>
            <div className="list-Form" onClick={()=>{navigate("/detail/1")}}>
                {ProductData.map((item, index) => (
                    <div key={item.id} className={index % 2 === 0 ? 'column1' : 'column2'}>
                        <img src={item.img} alt="Product" className="list-img" />
                        <span className="list-form-name">{item.name}</span> <br/>
                        <span className="list-form-price">{item.price.toLocaleString()}원</span><br/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product;