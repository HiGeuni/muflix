import playlistData from "../data.json";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "../styles/slick-theme.css";
import "../styles/slick.css";

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
const Bt_style = styled(Link)`
    display: inline-block;
    margin-top: 5px;
    padding-top: 5px;
    text-decoration: none;
    color: #ACACAC;
`

function Profile(){
    const dummy_user = {
        "id": 1,
        "이름": "김 연수",
        "전화번호": "010 4665 7922",
        "user_id" : "dustnrkfnfn@naver.com"
    }
    const dummy_playlist = playlistData.playlist
    const key_list = ["user_id","이름","전화번호"]
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
                                <Bt_style>{s} 변경</Bt_style>
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
                                <Bt_style to={{pathname: "/playlistDetail/"+s.id}}>
                                    수정
                                </Bt_style>
                            </div>
                        ))}
                    </div>
                </section>
            </header>
        </CustomDiv>
    )
}

export default Profile;