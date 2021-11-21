import React,{useState,useEffect} from 'react'

function ShowroomMember() {
    const [employee, setEmployee] = useState('');
    const [mobile, setMobile] = useState('');
    const [qualification, setQualification] = useState('');
    const [email, setEmail] = useState('');
    const [showroom, setShowroom] = useState([]);
    const [memberShowroom, setMemberShowroom] = useState('');
    const [loading, setLoading] = React.useState(true);
     useEffect(() => {
        async function getShowroom() {
            const response = await fetch('http://localhost:1337/api/displayShowroom',{
                headers:{
                'x-access-token' : localStorage.getItem('token'),
                'Content-Type' :'application/json'
                }
            })
            const data = await response.json();
            if (data.status === 'ok'){
                //setShowroom(data);
                console.log(data.data);
                setShowroom(data.data.map(({showroomName,_id}) => ({ label: showroomName, value: _id })));
                    
               
                setLoading(false);
            }
            else {
            alert("Invalid Token !")
            }
        }
        getShowroom();
        console.log(showroom)
    }, [])
    async function AddRoomMeber (event) {
        event.preventDefault();
        const response = await fetch('http://localhost:1337/api/addShowroomMember',{
            method:'POST',
            headers:{
            'x-access-token' : localStorage.getItem('token'),
            'Content-Type' :'application/json'
            },
            body:JSON.stringify({
                employee,
                mobile,
                qualification,
                email,
                memberShowroom
            })
        })
        const data = await response.json();
        if (data.status){
            console.log("Successfull");
            //nevigate('/showoom-dashboard');
            window.location.href = '/showroom-dashboard';
        }
        else {
           alert("Invalid Token !")
        }
    }
    return (
        <div>
            <form onSubmit={AddRoomMeber}>
            { <div className="form-group">
                    <label htmlFor="Country">Showoom :</label>
                    <select className="form-control"
                    disabled={loading}
                    onChange={e => setMemberShowroom(e.currentTarget.value)}>
                        <option>Select Showroom</option>
                        {showroom.map(({ label, value }) => (
                            <option key={value+"abc"} value={value}>
                            {label}
                            </option>
                        ))}
                    </select>
                </div> }
                <div className="form-group">
                    <label htmlFor="email">Employee Name:</label>
                    <input className="form-control" type="text" value={employee} onChange={(e)=>setEmployee(e.target.value)} placeholder="Enter your Employee name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="Addres">Mobile No:</label>
                    <input className="form-control" type="text" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Enter Your Mobile No"/>
                </div>
                <div className="form-group">
                    <label htmlFor="City">Email</label>
                    <input className="form-control" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your email"/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="gstno">Qualification:</label>
                    <input className="form-control" type="text" value={qualification} onChange={(e)=>setQualification(e.target.value)} placeholder="Enter Your Qualification"/>
                </div>
                <div style={{textAlign:'center'}}>
                    <button className="btn btn-success" style={{marginTop:'5px', marginBottom:'5px'}}>Add Showroom Members</button>
                </div>
            </form>
        </div>
    )
}
export default ShowroomMember

