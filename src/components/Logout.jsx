import React, {useContext} from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserLoggedIn } from "../App";

function Logout(){ 
    const {isLoggedIn, setLoginState} = useContext(UserLoggedIn);

    const navigate = useNavigate();
    const logout = async () => {
        Axios.get('http://localhost:4000/users/logout');
        console.log("session clear");
        setLoginState(false);
        console.log(isLoggedIn);

        navigate("/")
    };
    logout();
    return;
}

export default Logout;