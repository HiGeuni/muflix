import {useState, useContext} from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserId } from "../App";

const Logout = () => { 
    const {userId, setUserId} = useContext(UserId);

    const navigate = useNavigate();

    const logout = async () => {
        Axios.get('http://localhost:4000/users/logout');
        setUserId(null);
        localStorage.clear();
        console.log(userId);
        navigate('/')
    };
    logout();
    return;
}

export default Logout;