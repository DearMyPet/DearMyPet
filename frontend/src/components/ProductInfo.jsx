
const ProductInfo = () => {
    return(
        <div>
            <div className="component-part">
                <span className="order-product-title" >상품정보</span>
                <div className="gap20"/>

                <span className="content-part-title">포장타입</span>
                <span className="content-part">상온(종이포장)</span><br/>
                <span className="content-sub">택배배송은 에코 포장이 스티로품이로 대체됩니다.</span>
                <div className="gap20"/>

                <span className="content-part-title">판매단위</span>
                <span className="content-part">1팩</span>
                <div className="gap20"/>

                <span className="content-part-title">중량/용량</span>
                <span className="content-part">40g</span>
                <div className="gap20"/>

                <span className="content-part-title">안내사항</span>
                <span className="content-part">
                    반려동물의 취향이나 상태에 따라 기호성의 차이가 있을 수 있으니
                    구매에 참고 부탁드립니다.
                </span>
            </div> 
        </div>
    );
}

export default ProductInfo;