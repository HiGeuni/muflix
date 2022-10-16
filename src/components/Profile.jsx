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
        padding-bottom: 1rem;
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
        display: flex;
    }
    button{
        justify-content: center;
    }
    justify-content: center;
    margin: auto;
`

function Profile(){
    return (
        <CustomDiv>
            <h1>계정</h1>
            <hr />
            <header>
                <h3>계정 & 개인 정보</h3>
                <section>
                    <div>
                        <div className="info_button">
                            <div className="account_info">
                                이름
                            </div>
                            <button>이름 변경</button>
                        </div>
                        
                        <div className="account_info">하위</div>
                    </div>
                </section>
            </header>
        </CustomDiv>
    )
}

export default Profile;