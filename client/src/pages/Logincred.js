import React,{useState} from 'react'

function Logincred({sendDataToParent}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function loginUser (event) {
        event.preventDefault();
        const response = await fetch('http://localhost:1337/api/login',{
        method:'POST',
        headers:{
            'Content-Type' :'application/json'
        },
        body:JSON.stringify({
            email,
            password
        })
        })

        const data = await response.json();
        if (data.user){
        /*  */
            sendDataToParent(1,data.user,data.otp);
        }
        else {
            alert("Please check your username and password !")
        }
        console.log(data);
    }
    return (
        <div>
           <h1>Sign In Here</h1>
            <form onSubmit={loginUser}>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email"/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"/>
                <input type="submit" value="Sign In" />
            </form> 
        </div>
    )
}

export default Logincred
