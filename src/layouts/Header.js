import React from "react";
// import styled from "styled-components";
import "./Header.scss";
import {Link} from 'react-router-dom';
import styled from "styled-components";




function Header({isLogin}){
    return (
        <header className="header">
            <div className="contents">
                <Link to="/">
                    <img className="logo" 
                    src="https://cdn.discordapp.com/attachments/874897301292875836/1030724425194156092/mufilx.png" />
                </Link>
                <nav className="navigation">
                    <a>{isLogin ? "Logout" : "Login"}</a>
                    <a>{isLogin? "Profile" : "Signup"}</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;