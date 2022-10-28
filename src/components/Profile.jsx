import playlistData from "../data.json";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Axios from 'axios';

import "../styles/slick-theme.css";
import "../styles/slick.css";
import { useState, useEffect } from "react";

const USER = 0;
const PLAYLIST = 1;
var dummy_user = {
    "이름": "김 연수",
    "전화번호": "010 4665 7922",
    "user_id" : "dustnrkfnfn@naver.com"
}

const CustomDiv = styled.div`
    width : 1024px;
    h1 {
        padding-top: 1rem;
        font-weight: 530;
    }
    h3 {
        margin-top: 5px;
        padding-top: 5px;
        color: #ACACAC;
        font-weight: 350;
        width: 260px;
        font-size: 10;
    }
    header{
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
    }
    button{
        display: inline-block;
    }
    justify-content: center;
    margin: auto;
    padding-bottom: 200px;
`
const BtStyle = styled(Link)`
    display: inline-block;
    margin-top: 5px;
    padding-top: 5px;
    text-decoration: none;
    color: #0073e6;
`

const Profile = () => {
    const fetchUsers = async () => {
        try{
            let token = localStorage.getItem('loging-token');
            console.log(token);
            const response = await Axios.get('http://localhost:4000/users/profile',
            { headers: {
                "Authorization": token,
                "withCredentials": true,
                "Content-Type" :'application/json',
            }
            },
            );
            dummy_user = response.data[USER];
            setUsers(dummy_user);
            console.log(response);
        }
        catch (e){
            console.log(e);
        }
    }
    const [user, setUsers] = useState(null);
    useEffect(() => {
        console.log("프로필 확인");
        fetchUsers();
    },[]);
    const dummy_playlist = playlistData.playlist
    //console.log(dummy_playlist);
    //dummy_playlist = [];
    console.log(dummy_user);
    const key_list = ["user_id","이름","전화번호"];
    return (
        <CustomDiv>
            <h1>계정</h1>
            <hr />
            <header>
                <h3>계정 & 개인 정보</h3>
                <section>
                    <div>
                        { key_list.map((s) => (
                            <div className="info_button">
                                <div className="account_info">
                                    {dummy_user[s]}
                                </div>
                                <BtStyle>{s} 변경</BtStyle>
                            </div>
                        ))}
                    </div>
                </section>
            </header>
            <header>
                <h3>플레이리스트</h3>
                <section>
                    <div>
                        { dummy_playlist.map((s) => (
                            <div className="info_button">
                                <div className="account_info">
                                    {s.name}
                                </div>
                                <div className="account_info">
                                    {s.info}
                                </div>
                                <BtStyle to={{pathname: "/playlistDetail/"+s.id}}>
                                    수정
                                </BtStyle>
                            </div>
                        ))}
                    </div>
                </section>
            </header>
        </CustomDiv>
    )
}

export default Profile;