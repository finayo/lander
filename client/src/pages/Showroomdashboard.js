import {useEffect,useState} from 'react';
import { decode } from 'jsonwebtoken';
import {useNavigate} from 'react-router-dom';
import Logout from './Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
//import AdminShowRoomBar from './adminShowRoomBar';
import Addshowroom from './showroom/Addshowroom';
import DisplayShowroom from './showroom/DisplayShowroom';
import AdminShowRoomBar from './AdminShowRoomBar';
import AdminShowroomStackedChart from './AdminShowroomStackedChart';
import AdminShowroomPieChart from './AdminShowroomPieChart';
import ShowroomMember from './showroom/ShowroomMember';
function Showroomdashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [showroom, setShowroom] = useState('');
  
  useEffect(() => {
    async function papulateData(){
      const req = await fetch('http://localhost:1337/api/quote',{
           headers:{
              'x-access-token' : localStorage.getItem('token')
           } 
        })
  
        const data = await req.json();
        if(data.status === 'error'){
          localStorage.removeItem('token');
          navigate('/login')
        }else {
          setName(data.name.name+" "+data.name.lastname)
          setShowroom(data.name.dealername);
          console.log(data.name.dealername);
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
        papulateData();
      }
    }
    else{
      navigate('/login')
    }
  }, [navigate])
  return (
    <div className="container" style={{background:'#f2f2f2'}}>
      <div className="row" style={{height:'100px'}}>
        <div className="col-md-6">
          <h1>Hi, welcome back!</h1>
        </div>
        <div className="col-md-6">
          <div style={{display:'flex', alignItems:'center', height:'100%', float:'right'}}>
          <button  className="btn btn-success" data-toggle="modal" data-target="#myTeamModal" style={{margin: '0 5px'}}>
              <i className="fa fa-trash-o fa-lg" > Add Team</i> 
            </button>
            <button  className="btn btn-danger" data-toggle="modal" data-target="#myModal">
              <i className="fa fa-trash-o fa-lg" > Add Branch</i> 
            </button>
            <button  className="btn btn-warning" style={{margin: '0 5px'}}>
              <i className="fa fa-trash-o fa-lg"> Feedback</i>
            </button>
            <button  className="btn btn-primary">
              <i className="fa fa-trash-o fa-lg"> Support</i>
            </button>
            <Logout />
          </div>
          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                 {/*  <button type="button" class="close" data-dismiss="modal">&times;</button> */}
                  <h4 className="modal-title">
                  <i className="fa fa-trash-o fa-lg"> Add New Branch</i>
                    </h4>
                </div>
                <div className="modal-body">
                  <Addshowroom />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>

            </div>
          </div>

          <div id="myTeamModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                 {/*  <button type="button" class="close" data-dismiss="modal">&times;</button> */}
                  <h4 className="modal-title">
                  <i className="fa fa-trash-o fa-lg"> Add New Branch</i>
                    </h4>
                </div>
                <div className="modal-body">
                  <ShowroomMember />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>

            </div>
          </div>



        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="row box-card" /* style={{marginRight:'12px'}} */>
                <div className="col-md-5">
                  <AdminShowRoomBar />
                </div>
                <div className="col-md-7">
                  <AdminShowroomPieChart />
                </div>
                {/* <div className="col-md-4">
                  <AdminShowRoomBar />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card sale-diffrence-border background-blue" style={{height:'300px'}}>
            <div className="card-body">
              <div className="row box-card">
                <div className="card-text">
                  <ul className="nav nav-tabs tab-no-active-fill">
                    <li  className="nav-item active"><a data-toggle="tab" href="#home">Executive</a></li>
                    <li><a data-toggle="tab" href="#menu1">Branch</a></li>
                  </ul>
                  <div className="tab-content">
                    <div id="home" className="tab-pane fade in active">
                      <h3>Executive </h3>
                      <p>Some content.</p>
                    </div>
                    <div id="menu1" className="tab-pane fade">
                      <h3>Branch</h3>
                      <p>Some content in menu 1.</p>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-4">
              <div className="card  sale-diffrence-border background-blue">
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <p className="card-text">Some example text.</p>
                  <a href="#" className="btn btn-primary">See Profile</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card sale-diffrence-border background-green">
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <p className="card-text">Some example text.</p>
                  <a  className="btn btn-primary">See Profile</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card sale-diffrence-border background-red">
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <p className="card-text">Some example text.</p>
                  <a href="#" className="btn btn-primary">See Profile</a>
                </div>
              </div>
            </div>
            
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card sale-diffrence-border background-blue" style={{height:'300px'}}>
                <div className="card-body">
                  <div className="row box-card">
                    <div className="card-text">
                      <ul className="nav nav-tabs tab-no-active-fill">
                        <li  className="nav-item active"><a data-toggle="tab" href="#executiveReport">Executive</a></li>
                        <li><a data-toggle="tab" href="#branchReport">Branch</a></li>
                        <li><a data-toggle="tab" href="#overalReport">Overal</a></li>
                      </ul>

                      <div className="tab-content">
                        <div id="executiveReport" className="tab-pane fade in active">
                          <h3>Executive</h3>
                          <p>Some content.</p>
                        </div>
                        <div id="branchReport" className="tab-pane fade">
                          <h3>Branch</h3>
                          <p>Some content in menu 1.</p>
                        </div>
                        <div id="overalReport" className="tab-pane fade">
                          <h3>Overal</h3>
                          <p>Some content in menu 2.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-12">
              <DisplayShowroom />
            </div>
            
          </div>
        </div> 
      </div>




      
    </div>
  );
}

export default Showroomdashboard;
