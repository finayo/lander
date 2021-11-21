import React,{useState,useEffect} from 'react'

function CompanyProfile({companyName,sroomName,pcin,pinc,pbPancard,pgst,pbWebsite}) {
    /* //const { companyName } = props[0]; */
    console.log(companyName)
    const [cname, setCompanyName] = useState('');
    const [showroomName, setShowroomName] = useState('');
    const [cin, setCin] = useState('');
    const [inc, setInc] = useState('');
    const [bPancard, setBPancard] = useState('');
    const [gst, setGst] = useState('');
    const [bWebsite, setBWebsite] = useState('');
    useEffect(() => {
        async function papulateData(){
            
            setCompanyName(companyName);
            setShowroomName(sroomName);
            setCin(pcin);
            setInc(pinc);
            setBPancard(pbPancard);
            setGst(pgst);
            setBWebsite(pbWebsite);
        }
        papulateData();
    }, [companyName,sroomName,pcin,pinc,pbPancard,pgst,pbWebsite])
    async function editCompany(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:1337/api/addCompanyProfile',{
            method:'POST',
            headers:{
                'x-access-token' : localStorage.getItem('token'),
                'Content-Type' :'application/json'
            },
            body:JSON.stringify({
                cname,
                showroomName,
                cin,
                inc,                
                bPancard,
                gst,
                bWebsite
            })
        })
        const data = await response.json();
        window.location.href = '/showroom-profile';
    }
    return (
        <div>
            <form onSubmit={editCompany}>
                <div className="form-group">
                    <label htmlFor="email">Registered company name:</label>
                    <input className="form-control" type="text" defaultValue={cname} onChange={(e)=>setCompanyName(e.target.value)}  placeholder="Enter your company name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="Addres">Showroom name:</label>
                    <input className="form-control" type="text" defaultValue={showroomName} onChange={(e)=>setShowroomName(e.target.value)} placeholder="Enter your showroon name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="City">Year of INC</label>
                    <input className="form-control" type="text" defaultValue={inc} onChange={(e)=>setInc(e.target.value)} placeholder="Enter your yea of INC"/>
                </div>
                <div className="form-group">
                    <label htmlFor="Country">CIN number:</label>
                    <input className="form-control" type="text" defaultValue={cin} onChange={(e)=>setCin(e.target.value)} placeholder="Enter your CIN number"/>
                </div>
                <div className="form-group">
                    <label htmlFor="gstno">Business pancard:</label>
                    <input className="form-control" type="text" defaultValue={bPancard} onChange={(e)=>setBPancard(e.target.value)} placeholder="Enter your business pancard"/>
                </div>
                <div className="form-group">
                    <label htmlFor="gstno">GST Number:</label>
                    <input className="form-control" type="text" defaultValue={gst} onChange={(e)=>setGst(e.target.value)} placeholder="Enter your gst number"/>
                </div>
                <div className="form-group">
                    <label htmlFor="gstno">Business website:</label>
                    <input className="form-control" type="text" defaultValue={bWebsite} onChange={(e)=>setBWebsite(e.target.value)} placeholder="Enter your website"/>
                </div>
                <div style={{textAlign:'center'}}>
                <button className="btn btn-success" style={{marginTop:'5px', marginBottom:'5px'}}>Edit Company</button>
                </div>
            </form> 
        </div>
    )
}

export default CompanyProfile
