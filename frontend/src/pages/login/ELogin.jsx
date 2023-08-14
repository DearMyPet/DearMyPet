import '../../css/EJoin.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const EJoin = () => {
  const navigate = useNavigate();

  const formSchema = yup.object({
    email: yup
      .string()
      .required('이메일을 입력해주세요')
      .email('이메일 형식이 아닙니다.'),
    password: yup 
      .string()
      .required('영문, 숫자포함 8자리를 입력해주세요.')
      .min(4, '최소 8자 이상 가능합니다')
      .max(15, '최대 15자 까지만 가능합니다')
      .matches( 
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,15}$/,
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

  const onSubmit = (data) => {handleLogin(data.email, data.password);};

  const handleLogin = (email, password) => {
    console.log(email, password)
    axios.post("http://127.0.0.1:8000/api/users/login/", {
        email: email,
        password: password
    })
    .then((response)=>{
      const { id, access, refresh } = response.data;
      sessionStorage.clear()
      sessionStorage.setItem("user", id);
      sessionStorage.setItem("accessToken", access);
      sessionStorage.setItem("refreshToken", refresh);
      alert("로그인 성공!");
        setTimeout(() => {
          navigate("/main");
        }, 1000);
    })
    .catch(function(error) {
      alert("이메일과 비밀번호를 다시 확인해주세요!")
      console.log("로그인 실패!", error);
    })
  };

  return (
    <div className="EJoin">
      <h4>반가워요 👋 <br/>
      로그인 정보를 알려주세요
      </h4>

      <div className='info'>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }}>
          <span className='email-title'>이메일</span>
          <input className='email-box'
            name="email" 
            placeholder="이메일을 입력해 주세요"
            {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>}      

          <span className='pw-title'>비밀번호</span>
          <input className='pw-box'
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}

          {/* <Link className='nextBtn' to="/main" disabled={errors || watch()}>로그인</Link> */}
          <button className='nextBtn' type="submit" onClick={handleSubmit(onSubmit)}>로그인</button>
        </form>
      </div>
    </div>
  );
}

export default EJoin;
