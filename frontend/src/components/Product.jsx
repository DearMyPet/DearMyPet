import { useNavigate } from "react-router-dom";

const Product = ({ data }) => {
    const navigate = useNavigate();

    return(
        <div>
            <div className="list-Form">
                {data && data.map((item, index) => (
                    <div key={item.id} className={index % 2 === 0 ? 'column1' : 'column2'} onClick={()=>{navigate(`/detail/${item.id}`)}}>
                        <img src={item.img} alt="Product" className="list-img" />
                        <span className="list-form-name">{item.name}</span> <br/>
                        <span className="list-form-price">{Number(item.price).toLocaleString()}원</span><br/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product;