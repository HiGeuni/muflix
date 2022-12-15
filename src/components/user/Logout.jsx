import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from 'config/api';
import { IsLogin } from 'App';
import React, { useContext } from 'react';
import { userState } from 'atoms/user';
import { useRecoilState } from 'recoil';

const Logout = () => {
  const { setIsLogin } = useContext(IsLogin);
  const [curUserState, setUserState] = useRecoilState(userState);

  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem('loging-token');
    await Axios.get(`${api.url}/users/logout`, {
      headers: {
        Authorization: token,
        withCredentials: true,
      },
    }).then((res) => {
      if (res.status === 200) {
        localStorage.clear();
        setIsLogin(false);
        setUserState({ username: '' });
        navigate('/');
      } else {
        alert('잘못된 요청입니다.');
      }
    });
  };
  logout();
};

export default Logout;
