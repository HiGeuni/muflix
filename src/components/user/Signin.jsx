// react-hook-form을 이용해서 form을 만들기
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { api } from 'config/api';
import { IsLogin } from 'App';
import React, { useContext } from 'react';
import NewStyle from 'styles/FormStyle';

function SignInForm() {
  const { setIsLogin } = useContext(IsLogin);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onValid = async (data) => {
    const response = await Axios.post(`${api.url}/signin`, data, {
      withCredentials: true,
    });
    if (response.data === 'Try Again!') alert('Email이나 Password를 확인해주세요.');
    else {
      setIsLogin(true);
      localStorage.setItem('loging-token', response.data.token);
      navigate('/');
    }
  };

  const onInvalid = (data) => console.log(data, 'onInvalid');
  return (
    <NewStyle>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <label>E-mail</label>
        <input
          name="email"
          {...register('email', {
            required: 'email error',
            pattern: /^[\w.]+@[\w.]+\.[A-Za-z]{2,3}$/i,
          })}
          placeholder="E-mail"
          type="text"
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register('password', {
            required: 'password error',
            minLength: {
              value: 8,
              message: 'too short',
            },
          })}
          placeholder="Password"
        />
        <input type="submit" className="submitButton" value="로그인" />
      </form>
      <div className="isUser">
        회원이 아니신가요?
        <Link to={{ pathname: '/signup' }}>회원 가입 </Link>
      </div>
    </NewStyle>
  );
}

export default SignInForm;
