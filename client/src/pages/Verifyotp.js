import React,{useState} from 'react';

function Verifyotp({mailOtp,sendDataToParent}) {
    const [otp, setOtp] = useState('');
    function checkOtp(e){
        e.preventDefault();
        sendDataToParent(otp);
    }
    return (
        <div>
            
            <form onSubmit={checkOtp}>
            <div className="form-group">
                <label htmlFor="email">Your OTP:</label>
                <input type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter You otp"/>
            </div>
            
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}

export default Verifyotp
