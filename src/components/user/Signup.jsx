// react-hook-form을 이용해서 form을 만들기
import { useForm } from 'react-hook-form';
import NewStyle from 'styles/FormStyle';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from 'config/api';
import React from 'react';

function SignInForm() {
  const navigate = useNavigate();

  const onButtonClick = async (data) => {
    if (data.password1 === data.password2) {
      const response = await Axios.post(`${api.url}/signup`, data);
      navigate('/login');
    } else {
      alert('비밀번호를 확인해주세요!');
    }
  };
  const { register, handleSubmit, watch, setError, formState: {errors} } = useForm();

  const password = watch("password");
  
  //추가 예정
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    console.log(value);

    if(value === password) return setError("passwordConfirm");

    setError(
      "passwordConfirm",
      "notEqual",
      "Password are different"
    );
  }

  return (
    <NewStyle>
      <h2>회원 가입</h2>
      <form onSubmit={handleSubmit((data) => onButtonClick(data))}>
        <label>E-mail</label>
        <input
          name="email"
          placeholder="test@google.com"
          {...register('email')}
        />
        <label>nickname</label>
        <input
          name="nickname"
          placeholder="nickname"
          {...register('nickname')}
        />
        <label>전화번호</label>
        <input
          name="전화번호"
          placeholder="010-1234-5678"
          {...register('phonenum')}
        />
        <label>password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          {...register('password1')}
        />
        {errors.password && <p>{errors.passwrod.message}</p>}
        <label className='password-check'>password 확인</label>
        <input
          name="passwordConfirm"
          type="password"
          placeholder="Verify Password"
          {...register('password2')}
        />
        {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        <input type="submit" className="submitButton" value="등록" />
      </form>
    </NewStyle>
  );
}

export default SignInForm;
