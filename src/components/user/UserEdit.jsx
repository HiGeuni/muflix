import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { api } from 'config/api';
import React, { useState, useEffect } from 'react';
import NewStyle from 'styles/FormStyle';
import { useForm } from 'react-hook-form';
import Background from 'layouts/Background';

function UserEdit() {
  const [user, setUsers] = useState(null);
  const { register, handleSubmit } = useForm();

  const onValid = async (data) => {
    const response = await Axios.post(`${api.url}/signin`, data, {
      withCredentials: true,
    });
    if (response.data === 'Try Again!')
      alert('Email이나 Password를 확인해주세요.');
    else {
      setIsLogin(true);
      localStorage.setItem('loging-token', response.data.token);
      navigate('/');
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem('loging-token');
    await await Axios.get(`${api.url}/users/profile`, {
      headers: {
        Authorization: token,
        withCredentials: true,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      setUsers(res.data[0]);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Background />
      <NewStyle>
        <h2>회원 정보 수정</h2>
        <form onSubmit={handleSubmit((data) => onValid(data))}>
          <label>E-mail</label>
          <input
            name="email"
            defaultValue={user?.user_id}
            placeholder="test@google.com"
            {...register('email')}
          />
          <label>nickname</label>
          <input
            name="nickname"
            defaultValue={user?.이름}
            placeholder="nickname"
            {...register('nickname')}
          />
          <label>전화번호</label>
          <input
            name="전화번호"
            defaultValue={user?.전화번호}
            placeholder="010-1234-5678"
            {...register('phonenum')}
          />
          <input type="submit" className="submitButton" value="등록" />
        </form>
      </NewStyle>
    </>
  );
}

export default UserEdit;
