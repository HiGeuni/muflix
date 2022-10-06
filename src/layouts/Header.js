import React from "react";
// import styled from "styled-components";
import "./Header.scss";

function Header({isLogin}){
    return (
        <header className="header">
            <div className="contents">
                <b>Logo</b>
                <nav className="navigation">
                    <a>{isLogin ? "Logout" : "Login"}</a>
                    <a>{isLogin? "Profile" : "Signup"}</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;