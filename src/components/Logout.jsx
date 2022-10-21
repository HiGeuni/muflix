import {useContext} from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { SessionId } from "../App";

const Logout = () => { 
    const {sessionId, setSessionId} = useContext(SessionId);

    const navigate = useNavigate();

    const logout = async () => {
        Axios.post('http://localhost:4000/users/logout',{
            withCredentials : true,
        }); //post로 바꿈
        console.log("session clear");
        setSessionId(null);
        console.log(sessionId);
        navigate('/')
    };
    logout();
    return;
}

export default Logout;