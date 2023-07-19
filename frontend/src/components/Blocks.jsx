import { useNavigate } from 'react-router-dom'

const Block = ({ text, color, path, value }) => {
    const navigate = useNavigate();

    const handleChange = () => {
        navigate(path, { state: { defaultValue: value } });
    }
    return (
        <div 
            className="block" 
            style={{backgroundColor: color}} 
            onClick={handleChange}
        >
            <span className="block-title">{text}</span><br/>
            <span className="block-sub">지난 보고서 보기</span>
        </div>
    )
}

const CheckBox = () => {
    return (
        <div className="check-box">
            <label>
                <input type="checkbox" name="checkbox1" value="checkbox1" />
                6월 4일 13시 동물병원 예약
            </label>
            <br />
            <label>
                <input type="checkbox" name="checkbox2" value="checkbox2" />
                6월 4일 13시 동물병원 예약
            </label>
            <br />
            <label>
                <input type="checkbox" name="checkbox3" value="checkbox3" />
                7월 dear my pet box 구매
            </label>
            <br />
        </div>
    )
}

const CustomBlock = ({ text, subText, color, value, unit }) => {
    return (
        <div className="block" style={{backgroundColor: color}}>
            <span className="block-title">{text}</span><br/>
            <span className="block-sub">{subText}</span>
            <div className="block-value-form">
                <span className="block-value">{value}</span>
                <span className="block-title">{unit}</span>
            </div>
        </div>
    )
}

export { Block, CheckBox, CustomBlock };