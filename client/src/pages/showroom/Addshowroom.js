import {useState,useEffect} from 'react';
import { decode } from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

function Addshowroom() {
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
  const [showroom, setShowroom] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  async function AddShowroom (event) {
     event.preventDefault();
    const response = await fetch('http://localhost:1337/api/addShowroom',{
      method:'POST',
      headers:{
        'x-access-token' : localStorage.getItem('token'),
        'Content-Type' :'application/json'
      },
      body:JSON.stringify({
        showroom,
        address,
        city,
        country,
        pincode
      })
    })

    const data = await response.json();
    if (data.status){
      console.log("Successfull");
      window.location = '/showroom-dashboard';
    }
    else {
        alert("Invalid Token !")
    }
    
  }
  return (
    <div className="App">
      <form onSubmit={AddShowroom}>
        <div className="form-group">
          <label htmlFor="email">Banch Name:</label>
          <input className="form-control" type="text" value={showroom} onChange={(e)=>setShowroom(e.target.value)} placeholder="Enter your Branch name"/>
        </div>
        <div className="form-group">
          <label htmlFor="Addres">Addres:</label>
          <input className="form-control" type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter Your Address"/>
        </div>
        <div className="form-group">
          <label htmlFor="City">City</label>
          <input className="form-control" type="text" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter Your City"/>
        </div>
        <div className="form-group">
          <label htmlFor="Country">Country:</label>
          <input className="form-control" type="text" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="Enter Your Country"/>
        </div>
        <div className="form-group">
          <label htmlFor="gstno">Pincode:</label>
          <input className="form-control" type="text" value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder="Enter Pincode"/>
        </div>
        <div style={{textAlign:'center'}}>
          <button className="btn btn-success" style={{marginTop:'5px', marginBottom:'5px'}}>Add Showroom</button>
        </div>
      </form>
    </div>
  );
}
export default Addshowroom;