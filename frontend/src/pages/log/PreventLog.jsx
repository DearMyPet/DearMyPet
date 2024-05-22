import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../css/PreventLog.css';
import { Link } from 'react-router-dom';
import TodoList from '../../components/TodoList';
import more from '../../img/more.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';




function PreventLog() {
    const naqvigate = useNavigate();
    let [제목, 제목변경] = useState(['병원 기록 🏥', '예방 접종 💉', '복용 약물 💊']) 
    let [내용, 내용변경] = useState([
        '우리 아이의 진료 내역을 기록해 보아요. \n 주기적인 건강 검진을 통해 미리 질병을 예방하고 \n 조기에 치료받을 수 있도록 자주 지켜봐 주세요',
        '우리 아이의 예방 접종 내역을 기록해 보아요. \n 예방접종을 통한 면역력 형성을 해주는 것은 건강한 생활을 하는데 매우 필수적이에요. \n 기초 접종과 주기적인 예방 접종을 통해 미리 예방해 주세요.',
        '우리 아이의 복용 약물을 기록해 보아요. \n 복용 중인 약물을 기록해 복용 주기와 복용 방법을 \n 잊지 않도록 관리해 주세요.'
    ])
    let [버튼, 버튼변경] = useState(['진료 기록 보러가기', '예방 접종 기록 보러가기', '복용 약물 기록 보러가기'])
    let [페이지, 페이지변경] = useState(['medicalRecord', 'vaccineRecord', 'medicineRecord'])

    return(
        <div>
            <div className='prevent-check'>
                <span className='check-title'>체크 리스트 ✅</span>
                <TodoList/>
            </div>

            {
                제목.map((data, i)=>{
                    return(
                        <div className='record-writing'>
                            <span className='record-writing-title'>{제목[i]}</span>
                            <div className='record-writing-content'>{내용[i]}</div>
                            <div className='go-record-button' onClick={()=>naqvigate("/" + 페이지[i])}>
                            <span>{버튼[i]}</span>
                            <img className='go-record-more' src={more}/>
                            </div>
                        </div>
                    )
                })
            }


            
        </div>
    );
}
export default PreventLog;
