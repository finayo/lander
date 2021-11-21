import React,{useEffect,useState} from 'react';
import CompanyProfile from './CompanyProfile';
import ProfileBankDetails from './ProfileBankDetails';
import {useNavigate} from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { data } from 'jquery';

function ShowroomProfile() {
    const init = {}
    const initBank = {}
    const [companyProfile, setCompanyProfile] = useState({});
    const [bankDetails, setBankDetails] = useState({});
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [uniqueCode, setUniqueCode] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        async function papulateData(){
          const req = await fetch('http://localhost:1337/api/quote',{
               headers:{
                  'x-access-token' : localStorage.getItem('token')
               } 
            })
      
            const data = await req.json();
            console.log(data);
            if(data.status === 'error'){
              localStorage.removeItem('token');
              navigate('/login')
            }else {
                setUserName(data.name.name+" "+data.name.lastname);
                setUserEmail(data.name.email);
                setUniqueCode(data.name.uniqueCode);
                init['companyName'] = data.name.companyProfile.length > 0 ? data.name.companyProfile[0].companyName : '';
                init['showroomName'] = data.name.companyProfile.length > 0 ? data.name.companyProfile[0].showroomName : '';
                init['cin'] = data.name.companyProfile.length > 0 ? data.name.companyProfile[0].cin : '';
                init['inc'] = data.name.companyProfile.length > 0 ? data.name.companyProfile[0].inc : '';
                init['bPancard'] = data.name.companyProfile.length > 0 ? data.name.companyProfile[0].bPancard : '';
                init['gst'] = data.name.companyProfile.length > 0 ? data.name.companyProfile[0].gst : '';
                init['bWebsite'] = data.name.companyProfile.length > 0 ? data.name.companyProfile[0].bWebsite : '';
                setCompanyProfile(init);
                console.log(data.name.bankDetails);
                initBank['bankName'] = data.name.bankDetails.length > 0 ? data.name.bankDetails[0].bankName: '';
                initBank['branchName'] = data.name.bankDetails.length  > 0  ? data.name.bankDetails[0].branchName : '';
                initBank['accountNumber'] = data.name.bankDetails.length  > 0   ?data.name.bankDetails[0].accountNumber  : '';
                initBank['ifsc'] = data.name.bankDetails.length  > 0   ? data.name.bankDetails[0].ifsc  : '';
                initBank['accountName'] = data.name.bankDetails.length  > 0   ? data.name.bankDetails[0].accountName : '';
                setBankDetails(initBank);
                return;
            }
                              
        }
        const token = localStorage.getItem('token');
        console.log(token);
        if(token){
          const user = decode(token);
          if(!user){
            localStorage.removeItem('token');
            navigate('/login')
          }
          else {
            papulateData().then(()=>{
                console.log(companyProfile);
                console.log(bankDetails) 
            });
            
          }
        }
        else{
          navigate('/login')
        }
      }, [navigate])
    return (
        <>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                            <span className="font-weight-bold">{uniqueCode}</span>
                            <span className="font-weight-bold">{userName}</span>
                            <span className="text-black-50" >{userEmail}</span><span> </span></div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value="" /></div>
                                <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value="" placeholder="surname" /></div>
                            </div>
                            <div className="row mt-3">
                                {/* <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" value="" /></div>
                                <div className="col-md-12"><label className="labels">Address Line 1</label><input type="text" className="form-control" placeholder="enter address line 1" value="" /></div>
                                <div className="col-md-12"><label className="labels">Address Line 2</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                <div className="col-md-12"><label className="labels">State</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                <div className="col-md-12"><label className="labels">Area</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                                <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email id" value="" /></div>
                                <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education" value="" /></div> */}
                            </div>
                            <div className="row mt-3">
                                {/* <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" value="" /></div>
                                <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="" placeholder="state" /></div> */}
                            </div>
                            <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 py-5">
                            <ul className="nav nav-tabs tab-no-active-fill">
                                <li className="nav-item active"><a data-toggle="tab" href="#companyDetails">Company Details</a></li>
                                <li><a data-toggle="tab" href="#bankDetails">Bank Details</a></li>
                            </ul>

                            <div className="tab-content">
                                <div id="companyDetails" className="tab-pane fade in active">
                                    <CompanyProfile companyName={companyProfile.companyName} sroomName={companyProfile.showroomName} pcin={companyProfile.cin} pinc={companyProfile.inc} pbPancard={companyProfile.bPancard} pgst={companyProfile.gst} pbWebsite={companyProfile.bWebsite}/>
                                </div>
                                <div id="bankDetails" className="tab-pane fade">
                                    <ProfileBankDetails bName = {bankDetails.bankName} brName = {bankDetails.branchName} acNumber = {bankDetails.accountNumber} ifscCode = {bankDetails.ifsc} acName = {bankDetails.accountName} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default ShowroomProfile
