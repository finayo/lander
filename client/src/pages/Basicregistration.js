import React from 'react'
import {useState,useEffect} from 'react';
import { decode } from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Basicregistration({sendDataToParent }) {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [typeFlag, setTypeFlag] = useState(0);
    const nevigate = useNavigate();
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

    async function registerUser (event) {
        event.preventDefault();
        
        const response = await fetch('http://localhost:1337/api/register',{
            method:'POST',
            headers:{
                'Content-Type' :'application/json'
            },
            body:JSON.stringify({
                name,
                lastname,
                mobile,
                email,
                password
            })
        })

        const data = await response.json();
        console.log(data);
        if(data.status === 'ok') {
            //navigate('/login');
            localStorage.setItem('regtoken',data.token);
            sendDataToParent(1,data,data.otp);
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
            <div className="form-group">
                <label htmlFor="email">First Name:</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter You Fist Name"/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Last Name:</label>
                <input type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)} placeholder="Enter Your Last Name"/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email :</label>
                <input type="email" autoComplete="none" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Mobile:</label>
                <input type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Enter Your Mobile No"/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Password:</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your Password"/>
            </div>  
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}
