import React from "react";
import {useNavigate} from 'react-router-dom';
function Logout(){
    const navigate = useNavigate();
    const doLogout = () =>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return(
        <button onClick={()=>doLogout()}>Logout</button>
    )
}
export default Logout;