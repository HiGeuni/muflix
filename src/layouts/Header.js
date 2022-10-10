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
                    <b>Logo</b>
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