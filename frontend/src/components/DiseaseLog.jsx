import { Block } from "../components/Blocks"

const DiseaseLog = () => {
    return (
        <div>
            <div className="log-body">
                <div className="log-detail-head">
                    <span className="log-detail-title">눈, 피부 더 신경 쓰셔야 해요</span>
                </div>
                
                <div className="block-form">
                    <Block text="눈 건강" color={'#f9e467'} value="1"/>
                    <Block text="피부 건강" color={'#f5be6e'} value="2"/>
                </div>

                <span className="disease-desc">
                    아이가 좋아하는 것을 눈앞에서 상하좌우로 움직이거나 회전
                    시켜 보고 양쪽 눈이 동시에 움직이지 않는다면 응급상황으로 
                    볼 수 있어요. 되도록 빠르게 전문 수의사를 통한 검진을 권장
                    하며 내원 후에는 주 1회 이상 주기적은 눈 체크를 통해 아이의 
                    눈을 건강하게 지켜주세요.
                </span>
            </div>
            
            <div className="horizontal-line3"/>

            <div className="log-body">
                <div className="log-detail-head">
                    <span className="log-detail-title">일 년 동안 총 2회 체크했어요</span>
                </div>
            </div>
        </div>
    )
}

export default DiseaseLog;