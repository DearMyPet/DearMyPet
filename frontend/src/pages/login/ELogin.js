import '../../css/EJoin.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';



function EJoin() {
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
      <h4>반가워요 👋 <br/>
      로그인 정보를 알려주세요
      </h4>

      <div className='info'>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Link className='nextBtn' to="/main" disabled={errors || watch()}>로그인</Link>
        </form>

      </div>


    </div>
  );
}

export default EJoin;
