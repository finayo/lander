import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
function ProfileBankDetails({bName,brName,acNumber,ifscCode,acName}) {
    console.info(brName,acNumber,ifscCode,acName);
    const navigate = useNavigate();
    const [bankName, setBankName] = useState('');
    const [branchName, setBranchName] = useState('')
    const [accountNumber, setAccountNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [accountName, setAccountName] = useState('');
    async function editBank(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:1337/api/addBankDetail',{
            method:'POST',
            headers:{
                'x-access-token' : localStorage.getItem('token'),
                'Content-Type' :'application/json'
            },
            body:JSON.stringify({
                bankName,
                branchName,
                accountNumber,
                ifsc,                
                accountName
            })
        })
        const data = await response.json();
        if(data.status ='error'){
            window.location.href = '/showroom-profile';
        }
        else {
            navigate('/login');
        }
       // window.location.href = '/showroom-profile';
    }
    useEffect(() => {
        async function papulateData(){
            
            setBankName(bName);
            setBranchName(brName);
            setAccountNumber(acNumber);
            setIfsc(ifscCode);
            setAccountName(acName);
        }
        papulateData();
    }, [bName,brName,acNumber,ifscCode,acName])
    return (
        <div>
            <form onSubmit={editBank}>
                <div className="form-group">
                    <label htmlFor="email">Bank name:</label>
                    <input className="form-control" type="text" defaultValue={bankName} onChange={(e)=>setBankName(e.target.value)}  placeholder="Enter your bank name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="Addres">Branch name:</label>
                    <input className="form-control" type="text" defaultValue={branchName} onChange={(e)=>setBranchName(e.target.value)} placeholder="Enter your branch name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="City">Account Number</label>
                    <input className="form-control" type="text" defaultValue={accountNumber} onChange={(e)=>setAccountNumber(e.target.value)} placeholder="Enter your account number"/>
                </div>
                <div className="form-group">
                    <label htmlFor="Country">IFSC Code:</label>
                    <input className="form-control" type="text" defaultValue={ifsc} onChange={(e)=>setIfsc(e.target.value)} placeholder="Enter your IFSC code"/>
                </div>
                <div className="form-group">
                    <label htmlFor="gstno">Account Holder Name:</label>
                    <input className="form-control" type="text" defaultValue={accountName} onChange={(e)=>setAccountName(e.target.value)} placeholder="Enter your Account Name"/>
                </div>
                <div style={{textAlign:'center'}}>
                    <button className="btn btn-success" style={{marginTop:'5px', marginBottom:'5px'}}>Edit Bank</button>
                </div>
            </form> 
        </div>
    )
}

export default ProfileBankDetails
