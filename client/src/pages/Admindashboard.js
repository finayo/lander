import React from 'react';
import {useEffect,useState} from 'react';
import { decode } from 'jsonwebtoken';
import {useNavigate} from 'react-router-dom';
//import { ArrowRight } from 'react-bootstrap-icons';
import '../css/admin-bundle.css';
function Admindashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  
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
        }/* else {
          setName(data.name)
          console.log(data);
        } */
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
        papulateData()
      }
    }
    else{
      navigate('/login')
    }
  }, [navigate])
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <div className="row">
						<div className="col-sm-6 mb-4 mb-xl-0">
							<div className="d-lg-flex align-items-center">
								<div>
									<h3 className="text-dark font-weight-bold mb-2">Hi, welcome back!</h3>
									<h6 className="font-weight-normal mb-2">Last login was 23 hours ago. View details</h6>
								</div>
								<div className="ml-lg-5 d-lg-flex d-none">
										<button type="button" className="btn bg-white btn-icon">
											<i className="mdi mdi-view-grid text-success"></i>
									</button>
										<button type="button" className="btn bg-white btn-icon ml-2">
											<i className="mdi mdi-format-list-bulleted font-weight-bold text-primary"></i>
										</button>
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="d-flex align-items-center justify-content-md-end">
								<div className="pr-1 mb-3 mb-xl-0">
										<button type="button" className="btn btn-outline-inverse-info btn-icon-text">
											Feedback
											<i className="mdi mdi-message-outline btn-icon-append"></i>                          
										</button>
								</div>
								<div className="pr-1 mb-3 mb-xl-0">
										<button type="button" className="btn btn-outline-inverse-info btn-icon-text">
											Help
											<i className="mdi mdi-help-circle-outline btn-icon-append"></i>                          
									</button>
								</div>
								<div className="pr-1 mb-3 mb-xl-0">
										<button type="button" className="btn btn-outline-inverse-info btn-icon-text">
											Print
											<i className="mdi mdi-printer btn-icon-append"></i>                          
										</button>
								</div>
							</div>
						</div>
					</div>
          {/*------------- graph*/}
          <div className="row mt-4">
						<div className="col-lg-8 grid-margin stretch-card">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-lg-4"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
											<h4 className="card-title">Sales Difference</h4>
											{/* <canvas id="salesDifference" style = {{display: 'block', width: '250px', height: '125px'}} width="250" height="125" className="chartjs-render-monitor"></canvas> */}
											<p className="mt-3 mb-4 mb-lg-0">Lorem ipsum dolor sit amet,
												consectetur adipisicing elit.
											</p>
										</div>
										<div className="col-lg-5">
											<h4 className="card-title">Best Sellers</h4>
											<div className="row">
												<div className="col-sm-4">
													<ul className="graphl-legend-rectangle">
														<li><span className="bg-danger"></span>Automotive</li>
														<li><span className="bg-warning"></span>Books</li>
														<li><span className="bg-info"></span>Software</li>
														<li><span className="bg-success"></span>Video games</li>
													</ul>
												</div>
												<div className="col-sm-8 grid-margin"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
													<canvas id="bestSellers" width="203" height="101" style={{display: 'block', width: '203px', height: '101px'}} className="chartjs-render-monitor"></canvas>
												</div>
											</div>
											<p className="mt-3 mb-4 mb-lg-0">Lorem ipsum dolor sit amet,
												consectetur adipisicing elit.
											</p>
										</div>
										<div className="col-lg-3">
											<h4 className="card-title">Social Media Statistics</h4>
											<div className="row">
												<div className="col-sm-12">
													<div className="progress progress-lg grouped mb-2">
														<div className="progress-bar  bg-danger" role="progressbar" style={{width: '40%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
														<div className="progress-bar bg-info" role="progressbar" style={{width: '10%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
														<div className="progress-bar bg-warning" role="progressbar" style={{width: '20%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
														<div className="progress-bar bg-success" role="progressbar" style={{width: '30%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
													</div>
												</div>
												<div className="col-sm-12">
													<ul className="graphl-legend-rectangle">
														<li><span className="bg-danger"></span>Instagram (15%)</li>
														<li><span className="bg-warning"></span>Facebook (20%)</li>
														<li><span className="bg-info"></span>Website (25%)</li>
														<li><span className="bg-success"></span>Youtube (40%)</li>
													</ul>
												</div>
											</div>
											<p className="mb-0 mt-2">Lorem ipsum dolor sit amet,
												consectetur adipisicing elit.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 mb-3 mb-lg-0">
							<div className="card congratulation-bg text-center" style={{background: 'rebeccapurple'}}>
								<div className="card-body pb-0">
									{/* <img src="./Kapella Bootstrap Admin Dashboard Template_files/face29.png" alt="" /> */}  
									<h2 className="mt-3 text-white mb-3 font-weight-bold">Congratulations
										Johnson
									</h2>
									<p>You have done 57.6% more sales today. 
										Check your new badge in your profile.
									</p>
								</div>
							</div>
						</div>
					</div>

          {/* report ------- */}
          <div className="row">
						<div className="col-sm-8 flex-column d-flex stretch-card">
							<div className="row">
								<div className="col-lg-4 d-flex grid-margin stretch-card">
									<div className="card bg-primary">
										<div className="card-body text-white">
											<h3 className="font-weight-bold mb-3">18,39 (75GB)</h3>
											<div className="progress mb-3">
												<div className="progress-bar  bg-warning" role="progressbar" style={{width: '40%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
											</div>
											<p className="pb-0 mb-0">Bandwidth usage</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4 d-flex grid-margin stretch-card">
									<div className="card sale-diffrence-border">
										<div className="card-body">
											<h2 className="text-dark mb-2 font-weight-bold">$6475</h2>
											<h4 className="card-title mb-2">Sales Difference</h4>
											<small className="text-muted">APRIL 2019</small>
										</div>
									</div>
								</div>
								<div className="col-lg-4 d-flex grid-margin stretch-card">
									<div className="card sale-visit-statistics-border">
										<div className="card-body">
											<h2 className="text-dark mb-2 font-weight-bold">$3479</h2>
											<h4 className="card-title mb-2">Visit Statistics</h4>
											<small className="text-muted">APRIL 2019</small>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12 grid-margin d-flex stretch-card">
									<div className="card">
										<div className="card-body">
											<div className="d-flex align-items-center justify-content-between">
												<h4 className="card-title mb-2">Sales Difference</h4>
												<div className="dropdown">
													<a href="https://www.bootstrapdash.com/demo/kapella-free/template/index.html#" className="text-success btn btn-link  px-1"><i className="mdi mdi-refresh"></i></a>
													<a href="https://www.bootstrapdash.com/demo/kapella-free/template/index.html#" className="text-success btn btn-link px-1 dropdown-toggle dropdown-arrow-none" data-toggle="dropdown" id="settingsDropdownsales">
														<i className="mdi mdi-dots-horizontal"></i></a>
														<div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="settingsDropdownsales">
															<a className="dropdown-item">
																<i className="mdi mdi-grease-pencil text-primary"></i>
																Edit
															</a>
															<a className="dropdown-item">
																<i className="mdi mdi-delete text-primary"></i>
																Delete
															</a>
														</div>
												</div>
											</div>
											<div>
												<ul className="nav nav-tabs tab-no-active-fill" role="tablist">
													<li className="nav-item">
														<a className="nav-link pl-2 pr-2" id="revenue-for-last-month-tab" data-toggle="tab" href="https://www.bootstrapdash.com/demo/kapella-free/template/index.html#revenue-for-last-month" role="tab" aria-controls="revenue-for-last-month" aria-selected="false">Revenue for last month</a>
													</li>
													<li className="nav-item">
														<a className="nav-link pl-2 pr-2" id="server-loading-tab" data-toggle="tab" href="https://www.bootstrapdash.com/demo/kapella-free/template/index.html#server-loading" role="tab" aria-controls="server-loading" aria-selected="false">Server loading</a>
													</li>
													<li className="nav-item">
														<a className="nav-link pl-2 pr-2" id="data-managed-tab" data-toggle="tab" href="https://www.bootstrapdash.com/demo/kapella-free/template/index.html#data-managed" role="tab" aria-controls="data-managed" aria-selected="false">Data managed</a>
													</li>
													<li className="nav-item">
														<a className="nav-link pl-2 pr-2 active" id="sales-by-traffic-tab" data-toggle="tab" href="https://www.bootstrapdash.com/demo/kapella-free/template/index.html#sales-by-traffic" role="tab" aria-controls="sales-by-traffic" aria-selected="true">Sales by traffic</a>
													</li>
												</ul>
												<div className="tab-content tab-no-active-fill-tab-content">
													<div className="tab-pane fade" id="revenue-for-last-month" role="tabpanel" aria-labelledby="revenue-for-last-month-tab"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
														<div className="d-lg-flex justify-content-between">
															<p className="mb-4">+5.2% vs last 7 days</p>
															<div id="revenuechart-legend" className="revenuechart-legend"><ul className="2-legend"><li><span className="legend-box" style={{ background:'#0ddbb9' }}></span><span className="legend-label" >Margin</span></li><li><span className="legend-box" style={{background:'#464dee'}}></span><span className="legend-label" >Product</span></li><li><span className="legend-box" style={{background:"#ee5b5b" }}></span><span className="legend-label" >Cost</span></li></ul></div>
														</div>
														<canvas id="revenue-for-last-month-chart" width="0" height="0" style={{display: "block", width: "0px", height: "0px" }} className="chartjs-render-monitor"></canvas>
													</div>
													<div className="tab-pane fade" id="server-loading" role="tabpanel" aria-labelledby="server-loading-tab"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
														<div className="d-flex justify-content-between">
															<p className="mb-4">+5.2% vs last 7 days</p>
															<div id="serveLoading-legend" className="revenuechart-legend"><ul className="3-legend"><li><span className="legend-box" style={{background:"#0ddbb9"}}></span><span className="legend-label" >Margin</span></li><li><span className="legend-box" style={{ background:'#464dee' }}></span><span className="legend-label" >Product</span></li><li><span className="legend-box" style={{background:"#ee5b5b" }}></span><span className="legend-label" >Cost</span></li></ul></div>
														</div>
														<canvas id="serveLoading" height="0" className="chartjs-render-monitor" style={{display: "block", width: "0px", height: "0px" }} width="0"></canvas>
													</div>
													<div className="tab-pane fade" id="data-managed" role="tabpanel" aria-labelledby="data-managed-tab"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
														<div className="d-flex justify-content-between">
															<p className="mb-4">+5.2% vs last 7 days</p>
															<div id="dataManaged-legend" className="revenuechart-legend"><ul className="4-legend"><li><span className="legend-box" style={{background:"#0ddbb9"}}></span><span className="legend-label" >Margin</span></li><li><span className="legend-box" style={{background:"#464dee" }}></span><span className="legend-label" >Product</span></li><li><span className="legend-box" style={{background:"#ee5b5b" }}></span><span className="legend-label" >Cost</span></li></ul></div>
														</div>
														<canvas id="dataManaged" height="0" className="chartjs-render-monitor" style={{display: "block", width: "0px", height: "0px" }} width="0"></canvas>
													</div>
													<div className="tab-pane fade active show" id="sales-by-traffic" role="tabpanel" aria-labelledby="sales-by-traffic-tab"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
														<div className="d-flex justify-content-between">
															<p className="mb-4">+5.2% vs last 7 days</p>
															<div id="salesTrafic-legend" className="revenuechart-legend"><ul className="5-legend"><li><span className="legend-box" style={{background:"#0ddbb9"}}></span><span className="legend-label" >Margin</span></li><li><span className="legend-box" style={{background:"#464dee" }}></span><span className="legend-label" >Product</span></li><li><span className="legend-box" style={{background:"#ee5b5b" }}></span><span className="legend-label" >Cost</span></li></ul></div>
														</div>
														<canvas id="salesTrafic" height="404" className="chartjs-render-monitor" style={{display: "block", width: "809px", height: "404px" }} width="809"></canvas>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-4 flex-column d-flex stretch-card">
							<div className="row flex-grow">
								<div className="col-sm-12 grid-margin stretch-card">
									<div className="card">
										<div className="card-body">
											<div className="row">
												<div className="col-lg-8">
													<h3 className="font-weight-bold text-dark">Canada,Ontario</h3>
													<p className="text-dark">Monday 3.00 PM</p>
													<div className="d-lg-flex align-items-baseline mb-3">
														<h1 className="text-dark font-weight-bold">23<sup className="font-weight-light"><small>o</small><small className="font-weight-medium">c</small></sup></h1>
														<p className="text-muted ml-3">Partly cloudy</p>
													</div>
												</div>
												<div className="col-lg-4">
													<div className="position-relative">
														<img src="./Kapella Bootstrap Admin Dashboard Template_files/live.png" className="w-100" alt="" />
														<div className="live-info badge badge-success">Live</div>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-12 mt-4 mt-lg-0">
													<div className="bg-primary text-white px-4 py-4 card">
														<div className="row">
															<div className="col-sm-6 pl-lg-5">
																<h2>$1635</h2>
																<p className="mb-0">Your Iincome</p>
															</div>
															<div className="col-sm-6 climate-info-border mt-lg-0 mt-2">
																<h2>$2650</h2>
																<p className="mb-0">Your Spending</p>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="row pt-3 mt-md-1">
												<div className="col">
													<div className="d-flex purchase-detail-legend align-items-center">
														<div id="circleProgress1" className="p-2">
                                graph


                            </div>
														<div>
															<p className="font-weight-medium text-dark text-small">Sessions</p>
															<h3 className="font-weight-bold text-dark  mb-0">26.80%</h3>
														</div>
													</div>
												</div>
												<div className="col">
													<div className="d-flex purchase-detail-legend align-items-center">
														<div id="circleProgress2" className="p-2">
                              Graph 2
                            </div>
														<div>
															<p className="font-weight-medium text-dark text-small">Users</p>
															<h3 className="font-weight-bold text-dark  mb-0">56.80%</h3>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-sm-12 grid-margin stretch-card">
									<div className="card">
										<div className="card-body">
											<div className="row">
												<div className="col-sm-12"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div></div>
													<div className="d-flex align-items-center justify-content-between">
														<h4 className="card-title mb-0">Visits Today</h4>
														<div className="dropdown">
															<a href="https://www.bootstrapdash.com/demo/kapella-free/template/index.html#" className="text-success btn btn-link  px-1"><i className="mdi mdi-refresh"></i></a>
															<a href="https://www.bootstrapdash.com/demo/kapella-free/template/index.html#" className="text-success btn btn-link px-1 dropdown-toggle dropdown-arrow-none" data-toggle="dropdown" id="profileDropdownvisittoday"><i className="mdi mdi-dots-horizontal"></i></a>
															<div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdownvisittoday">
																<a className="dropdown-item">
																	<i className="mdi mdi-grease-pencil text-primary"></i>
																	Edit
																</a>
																<a className="dropdown-item">
																	<i className="mdi mdi-delete text-primary"></i>
																	Delete
																</a>
															</div>
														</div>
													</div>
													<p className="mt-1">Calculated in last 30 days</p>
													<div className="d-lg-flex align-items-center justify-content-between">
														<h1 className="font-weight-bold text-dark">4332</h1>
														<div className="mb-3">
															<button type="button" className="btn btn-outline-light text-dark font-weight-normal">Day</button>
															<button type="button" className="btn btn-outline-light text-dark font-weight-normal">Month</button>
														</div>
													</div>
{/* 													<canvas id="visitorsToday" width="360" height="180" style="display: block; width: 360px; height: 180px;" className="chartjs-render-monitor"></canvas> */}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
    </div>
  );
}

export default Admindashboard;
