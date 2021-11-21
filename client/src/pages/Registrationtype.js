import React,{ useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import MultiSelectAll from "./MultiSelectAll";

const Registrationtype = () => {
    const [businessType, setBusinessType] = useState('');
    const [showroomType, setShowroomType] = useState('');
    const nevigate = useNavigate();
    async function updateBusinessProfile(e){
        e.preventDefault();
        const req = await fetch('http://localhost:1337/api/registationupdateprofile',{
            method:'POST',   
            headers:{
                'Content-Type' :'application/json',
                'x-access-token' : localStorage.getItem('regtoken')
            },
            body:JSON.stringify({
                businessType,
                showroomType
            })
        })
        const data = await req.json();
        if(data.status === 'ok'){
          localStorage.removeItem('regtoken');
          nevigate('/login');
        }else {
          //setName(data.name)
          console.log(data);
          return;
        }
    }
    const sendDataToParent = (data) => { // the callback. Use a better name
        setShowroomType(data);
      };
    return (
        <div>
            <form onSubmit={updateBusinessProfile}>
            <select value={businessType} onChange={(e)=>setBusinessType(e.target.value)}>
                <option value="">Select Business Type</option>
                <option value="Sole Proprietorship">Sole Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="Limited Liability Partnership(LLP)">Limited Liability Partnership(LLP)</option>
                <option value="Public/Private Limited companies">Public/Private Limited companies</option>
                <option value="Trust/NGO/Societies">Trust/NGO/Societies</option>
            </select>
            <br />
            
            <MultiSelectAll sendDataToParent={sendDataToParent}/>
            {showroomType.length > 0 && <input type="submit" value="Update Profile" /> }
            </form>
        </div>
    )
}

export default Registrationtype
