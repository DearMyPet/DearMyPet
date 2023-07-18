import Recommend1 from "../img/recommend1.svg"
import Recommend2 from "../img/recommend2.svg"

const ProductBox = () => {
    const product = [{name: "고구마 말랭이", img: Recommend1, price: 7500, tag: "#베타카로틴 #안토시아닌 #루테인"}, 
                    {name: "베지 앤 후르츠 믹스 칩", img: Recommend2, price: 7500, tag: "#베타카로틴 #안토시아닌 #비타민A"}]
    return(
        <div>
            {product.map((item, index) => (
                <div className="recommend-product-box">
                    <img src={item.img}/> <br/>
                    <span className="product-sub-text">{item.name}</span> <br/>
                    <span className="product-sub-text2">{item.price.toLocaleString()}원</span> <br/>
                    <span>{item.tag}</span>
                </div>
            ))}  
        </div>
    )
}

export default ProductBox;