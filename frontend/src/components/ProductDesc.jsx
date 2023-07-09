import product from "../img/productImg.svg"
import icon1 from "../img/items-icon1.svg"
import icon2 from "../img/items-icon2.svg"
import icon3 from "../img/items-icon3.svg"
import percentBar1 from "../img/percentBar1.svg"
import percentBar2 from "../img/percentBar2.svg"
import feed from "../img/feed.png"
import feedAmount from "../img/feedAmount.png"
import productInfoImg from "../img/productInfoImg.png"

const ProductDesc = () => {
    return(
        <div>
            <img src={product} className="productImg"/>
            <span className="p-name"> 무항생제 오리안심 육포 </span> 
            <div className="gap20"/>
            <div className="info-list">
                <span><img src={icon1}/> 재료와 성분</span>
                <ui>
                    <li>무항생제 인증을 받은 국내산 오리고기</li>
                    <li>필수 아미노산이 풍부</li>
                    <li>無 보존제, 無항생제無 향미제, 無 색소</li>
                    <li>GMO 프리5 원칙으로 엄선된 재료</li>
                </ui>
                <br/>
                <span><img src={icon2}/> 생산 및 유통 과정</span>
                <ui>
                    <li>저온 건조로 영양소 보존</li>
                    <li>살균 및 소독이 완료된 조리장</li>
                    <li>상할 걱정 없는 신선 배송</li>
                </ui>
                <br/>
                <span><img src={icon3}/> 활용법</span>
                <ui>
                    <li>씹고 즐기기에 최적화된, CHEW 간식 라인</li>
                    <li>스트레스 해소 및 에너지 회복</li>
                    <li>생후 4개월 이상의 반려견에게 급여</li>
                </ui>
            </div>

            <div className="gap"></div>
            <span className="percent-name"> 얼마나 큰가요? </span>
            <img src={percentBar1}/><br/><br/>
            <p className="p-content">
                큰 편이에요.<br/>
                작은 아이들에게는 적당한 크기로 잘라 주세요.
            </p>
            <div className="gap"></div>
            <span className="percent-name"> 얼마나 딱딱한가요? </span>
            <img src={percentBar2}/><br/><br/>
            <p className="p-content">
                부드럽게 쫄깃해요.<br/>
                치아가 약한 아이들은 조심해서 급여 해주세요.
            </p>
            <div className="gap"/>
            <div className="horizontal-line2"></div>
            <div className="gap"/>
            <span className="way"> 이렇게 급여하세요. </span>
            <img src={feed}/>
            <div className="gap"></div>
            <span className="way">1일 권장 급여량</span>
            <img src={feedAmount}/>
            <div className="gap"></div>
            <span className="way">상품 요약 정보</span>
            <img src={productInfoImg}/>

            <div className="detail-info">
                <span className="info-title">제품명</span>
                <span className="info-value">오리육포</span>
                <div className="gap20"/>
                <span className="info-title">중량</span>
                <span className="info-value">40g</span>
                <div className="gap20"/>
                <span className="info-title">유통기한</span>
                <span className="info-value">제품에 별도 표기</span>
                <div className="gap20"/>
                <span className="info-title">제조일</span>
                <span className="info-value">유통기한으로 부터 6개월 전 생산</span>
                <div className="gap20"/>
                <span className="info-title">전성분</span>
                <span className="info-value">오리 안심(국내산)</span>
                <div className="gap20"/>
                <span className="info-title">사이즈</span>
                <span className="info-value">3cm  x 10cm</span>
                <div className="gap20"/>
                <span className="info-title">일일 권장 섭취량</span>
                <span className="info-value">
                    <p>
                    초소형견(생후 3개월 ~ 5kg): 1개이내<br/>
                    소형견(5kg ~ 10kg): 2개 이내<br/>
                    중형견(10kg ~ 25kg): 3개 이내<br/>
                    대형견(25kg ~ 50kg): 5개 이내<br/>
                    </p>
                </span> <div style={{height:"80px"}}/>
                <span className="info-title">보관 방법</span>
                <span className="info-value">
                    <ui>
                        <li>직사광선이 없는 서늘한 곳에서 보관해주세요.</li>
                        <li>개봉 후 냉장보관해주세요.</li>
                        <li>가급적 빨리 급여해주세요.</li>
                    </ui>    
                </span> <div style={{height:"60px"}}/>
                <span className="info-title">주의 사항</span>
                <span className="info-value">
                    <ui>
                        <li>원재료에 대한 반려견의 알러지 여부 확인 후 급여해주세요.</li>
                    </ui>
                </span> <div style={{height:"40px"}}/>
                <span className="info-title">제조원</span>
                <span className="info-value">별도표기</span>
                <div className="gap20"/>
                <span className="info-title">판매원</span>
                <span className="info-value">
                    <p>
                        (주)디어마이펫 | 경기도 시흥시 산기대학로 237  <br/>
                        |2020-2024|  <br/>
                        www.dearmypet.co.kr  <br/>
                    </p>
                </span>
            </div>
        </div>
    );
}

export default ProductDesc;