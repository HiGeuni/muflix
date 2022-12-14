import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { api } from 'config/api';
import React, { useState, useEffect } from 'react';

import 'styles/slick-theme.css';
import 'styles/slick.css';

const USER = 0;
const PLAYLIST = 1;

const CustomDiv = styled.div`
  width: 1024px;
  h1 {
    padding-top: 1rem;
    font-weight: 530;
  }
  h3 {
    margin-top: 5px;
    padding-top: 5px;
    color: #acacac;
    font-weight: 350;
    width: 260px;
    font-size: 10;
  }
  header {
    display: flex;
    margin-top: 5px;
    margin-bottom: 50px;
  }
  .account_info {
    font-size: large;
    margin-top: 5px;
    padding-top: 5px;
  }
  .info_button {
    width: 764px;
    display: flex;
    justify-content: space-between;
    .account_info_name {
      min-width: 200px;
    }
  }
  button {
    display: inline-block;
  }
  justify-content: center;
  margin: auto;
  padding-bottom: 200px;
`;

const BtStyle = styled(Link)`
  display: inline-block;
  margin-top: 5px;
  padding-top: 5px;
  text-decoration: none;
  color: #0073e6;
`;

const PlaylistControl = styled.div`
  display: flex;
  align-items: center;
  h1 {
    margin: 1rem;
  }
  nav {
    font-size: 15px;
    font-weight: 600;
    background-color: #0c0c0c;
    color: #ffffff;
    border: 2px solid;
    margin: 0.3rem;
    border-radius: 4px;
    padding: 3px;
  }
`;

const DelUser = styled.div`
  margin-top: 15px;
  font-size: 12px;
  color: gray;
`;

function Profile() {
  const [user, setUsers] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('loging-token');
      const response = await Axios.get(`${api.url}/users/profile`, {
        headers: {
          Authorization: token,
          withCredentials: true,
          'Content-Type': 'application/json',
        },
      });
      const t_user = response.data[USER];
      setPlaylist(response.data[PLAYLIST].playlist);
      setUsers(t_user);
    } catch (e) {
      console.log(e);
    }
  };

  const delUser = async () => {
    // ????????? ?????? ?????????????????? ??????s
    // ?????? ??????
    // ????????????
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const key_list = ['user_id', '??????', '????????????'];
  return (
    <CustomDiv>
      <PlaylistControl>
        <h1>??????</h1>
      </PlaylistControl>
      <hr />
      <header>
        <h3>?????? & ?????? ??????</h3>
        <section>
          <div>
            {user
              ? key_list.map((s) => (
                  <div key={s.id} className="info_button">
                    <div className="account_info">{user[s]}</div>
                    {/* <BtStyle to={{ pathname: `/userEdit/${user.id}` }}>
                      {s} ??????
                    </BtStyle> */}
                  </div>
                ))
              : ''}
          </div>
          {/* <DelUser>?????? ??????</DelUser> */}
        </section>
      </header>
      <header>
        <h3>??????????????????</h3>
        <section>
          <div>
            {playlist?.map((s) => (
              <div key={s.id} className="info_button">
                <div className="account_info_name">{s.name}</div>
                <div className="account_info_information">{s.information}</div>
                <BtStyle to={{ pathname: `/playlistDetail/${s.id}` }}>
                  ????????? ??????
                </BtStyle>
              </div>
            ))}
          </div>
        </section>
      </header>
    </CustomDiv>
  );
}

export default Profile;
