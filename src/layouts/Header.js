import React, {useContext} from "react";
// import styled from "styled-components";
import "./Header.scss";
import {Link} from 'react-router-dom';
import { IsLogin } from "../App";
import logo from "static/logo.png"
import styled from "styled-components";

const StyledLogo = styled.img`
    min-width: 150px;
`

const Header = () => {
    const {isLogin} = useContext(IsLogin);
    
    return (
        <header className="header">
            <div className="contents">
                <Link to="/">
                    <StyledLogo 
                        className="logo" 
                        src= {logo}
                        alt="logo"
                    />
                </Link>
                { isLogin
                    ? <nav className="navigation">
                        <Link className="navigate_element" to="logout">Logout</Link>
                        <Link className="navigate_element" to="profile">Profile</Link>
                        </nav>
                    : <nav className="navigation">
                        <Link className="navigate_element" to="login">Login</Link>
                        <Link className="navigate_element" to="signup">Signup</Link>
                        </nav>
                }
            </div>
        </header>
    );
}

export default Header;