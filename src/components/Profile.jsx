import musicData from "../data.json";
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
        color: #ACACAC;
        font-weight: 350;
        width: 260px;
        font-size: 10;
    }
    header{
        display: flex;
        margin-top: 5px;
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
    padding-bottom: 500px;
`

function Profile(){
    const dummy_user = {
        "이름": "김 연수",
        "전화번호": "010 4665 7922",
        "계정" : "dustnrkfnfn@naver.com"
    }
    const key_list = ["이름","전화번호","계정"]
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
                            <button>{s} 변경</button>
                        </div>
                        ))}
                    </div>
                </section>
            </header>
        </CustomDiv>
    )
}

export default Profile;