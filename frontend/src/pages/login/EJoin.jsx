import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../css/EJoin.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const EJoin = () => {
  const navigate = useNavigate();

  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isCheckComplete, setIsCheckComplete] = useState(false);

  const formSchema = yup.object({
    email: yup
      .string()
      .required('이메일을 입력해주세요')
      .email('이메일 형식이 아닙니다.'),
    password: yup
      .string()
      .required('영문, 숫자포함 8자리를 입력해주세요.')
      .min(8, '최소 8자 이상 가능합니다')
      .max(15, '최대 15자 까지만 가능합니다')
      .matches( 
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        '영문 숫자포함 8자리를 입력해주세요.'
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 다릅니다.'),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    navigate("/phone", { state: { formData: data } });
  }

  const checkEmail = (email) => {
    axios.post("http://127.0.0.1:8000/api/users/check_email",{
      email: email,
    })
    .then((response)=>{
      setIsDuplicate(false); 
      setIsCheckComplete(true); 
      alert("사용 가능한 이메일입니다.");
      
    })
    .catch((error)=>{
      setIsDuplicate(true);
      setIsCheckComplete(true);
      alert("이메일이 이미 존재합니다.");
    })
  };

  const handleCheckEmail = () => {
    const emailValue = document.querySelector('.email-box').value;
    if(emailValue){
      checkEmail(emailValue);
    }else{
      alert("이메일을 입력해주세요.");
    }
  };

  const allValid = !errors.email && !errors.password && !errors.passwordConfirm && !isDuplicate && isCheckComplete;

  return (
    <div className="EJoin">
      <h4>안녕하세요 👋 <br/>
          필수 정보를 알려주세요.
      </h4>

      <div className='info'>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }}>

          <div className='auth-form'>
            <span className='auth-title'>이메일</span>
            <input className='email-box'
              type='email'
              name='email' 
              placeholder="이메일을 입력해 주세요"
              {...register('email')} />
              {errors.email && <p className='error'>{errors.email.message}</p>}
              <button className='doubleButton' onClick={handleCheckEmail}>중복 확인</button>
          </div>

          <div className='auth-form'>
            <span className='auth-title'>비밀번호</span>
            <input className='auth-box'
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              {...register('password')}
            />
            {errors.password && <p className='error'>{errors.password.message}</p>}
          </div>

          <div className='auth-form'>
            <span className='auth-title'>비밀번호 확인</span>
            <input className='auth-box'
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            {...register('passwordConfirm')}
            />
            {errors.passwordConfirm && <p className='error'>{errors.passwordConfirm.message}</p>}
          </div>

          <button className='nextButton' style={{background: allValid ? 'black' : ''}} onClick={handleSubmit(onSubmit)}>다음으로</button>
        </form>
      </div>
    </div>
  );
}

export default EJoin;
