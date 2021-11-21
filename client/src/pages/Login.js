import {useState,useEffect} from 'react';
import { decode } from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';
import Logincred from './Logincred';
import Verifyotp from './Verifyotp';
function Login() {
  const nevigate = useNavigate();
  const [typeFlag, setTypeFlag] = useState(0);
  const [otp, setOtp] = useState('');
  const [loginData, setLoginData] = useState('')
  useEffect(() => {
    const token =  localStorage.getItem('token');
    if(token){
      const user = decode(token);
      if(user.usertype === 1) {
        nevigate('/showroom-dashboard');
      }
      else {
        nevigate('/admin-dashboard');
      }
    }
    
  }, [nevigate])
  const sendDataToParent = (index,data,otp) => { // the callback. Use a better name
    setOtp(otp);
    setTypeFlag(index);
    setLoginData(data);
    
    
   };
   const sendDataToParentForlogin = (userOtp) => { // the callback. Use a better name
    if(userOtp === otp) {
      localStorage.setItem('token',loginData);
      const user = decode(loginData);
      console.log("-------------"+user.usertype);
      if(user.usertype === 1) {
          window.location.href='/showroom-dashboard';
      }
      else {
          window.location.href='/admin-dashboard';
      }
    }
    else {
        alert("Invalid otp !");
    }
   };
  return (
    <div className="App">
      {typeFlag  == 0 && <Logincred sendDataToParent={sendDataToParent}/>}
      {typeFlag  === 1 && otp != '' && <Verifyotp  sendDataToParent={sendDataToParentForlogin} />}
    </div>
  );
}
export default Login;