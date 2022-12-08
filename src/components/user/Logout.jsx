import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { api } from "config/api";

const Logout = () => { 

    const navigate = useNavigate();

    const logout = async () => {
        const token = localStorage.getItem("loging-token");
        await Axios.get(`${api.url}/users/logout`, {
            headers: {
                "Authorization": token,
                "withCredentials": true,
            }
        })
        .then((res) => {
            if(res.status === 200){
                alert(res.data.message);
                localStorage.clear();
                navigate('/');
            }else{
                alert("잘못된 요청입니다.")
            }
            
        })
        
    };
    logout();
    return;
}

export default Logout;