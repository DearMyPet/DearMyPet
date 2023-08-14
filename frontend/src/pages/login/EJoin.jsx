import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../css/EJoin.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const EJoin = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState("");

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // const [isDuplicate, setIsDuplicate] = useState(false);
  // const [emailList, setEmailList] = useState(['guri']);

  // const handleChange = (e) => {
  //   setEmail(e.target.value);
  //   setIsDuplicate(emailList.includes(e.target.value));
  // };

  // const handleSubmit2 = (e) => {
  //   e.preventDefault();
  //   if (!isDuplicate) {
  //     setEmailList([...emailList, email]);
  //     setEmail('');
  //   }
  // };


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
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="EJoin">
      <h4>안녕하세요 👋 <br/>
          필수 정보를 알려주세요.
      </h4>

      <div className='info'>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }}>
          <span className='email-title'>이메일</span>
          <input className='email-box'
            type='email'
            name='email' 
            // value={email}
            // onChange={handleEmailChange}
            // onChange={handleChange}
            placeholder="이메일을 입력해 주세요"
            {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>}
            {/* <button className='doubleBtn' onClick={()=> {isDuplicate && alert(<p>Email already exists!</p>)}}>중복확인</button>      */}

          <span className='pw-title'>비밀번호</span>
          <input className='pw-box'
            type="password"
            name="password"
            // value={password}
            // onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해 주세요"
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
          
          <span className='pwCheck-title'>비밀번호 확인</span>
          <input className='pwCheck-box'
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          {...register('passwordConfirm')}
          />
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          {/* <div className='nextBtn' onClick={handleLogin} disabled={errors || watch()}>다음으로</div> */}
          <button className='nextBtn' onClick={()=>{navigate("/phone")}}>다음으로</button>

        </form>
      </div>
    </div>
  );
}

export default EJoin;
