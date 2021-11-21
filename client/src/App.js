import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Admindashboard from "./pages/Admindashboard";
import Showroomdashboard from "./pages/Showroomdashboard";
import ShowroomMember from "./pages/showroom/ShowroomMember";
import ShowroomProfile from "./pages/profile/ShowroomProfile";
class App extends React.Component {
    render() {
        return ( 
            <Router>
                <div>
                    <Routes>
                        <Route exact path="/" element={<Login/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/register" element={<Registration/>}/>
                        <Route exact path="/admin-dashboard" element={<Admindashboard/>}/>
                        <Route exact path="/showroom-dashboard" element={<Showroomdashboard/>}/>
                        <Route exact path="/add-showroom-member" element={<ShowroomMember/>}/>
                        <Route exact path="/showroom-profile" element={<ShowroomProfile />}/>
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default App;