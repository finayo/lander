import React from 'react'

export default function DisplayShowoomList({list}) {
    console.log(list);
    return (
        <div>
            <h4 style={{marginBottom: '1.5rem'}}><i className="fa fa-trash-o fa-lg"> Branch Details</i></h4>
            {list && list.length > 0 && list.map((data,index) => {
                return (
                    <div className="card sale-diffrence-border background-mustard" style={{marginBottom:'5px !important',background:'#6f89fcab'}}>
                        <div className="card-body">
                            <h4 className="card-title">{data.showroomName}</h4>
                            <div className="row box-card">
                                <div className="card-text">
                                    <div className="row"> 
                                        <div className="card-body"> 
                                            <div class="col-md-4">
                                            {data.address} 
                                            </div>
                                            <div class="col-md-4">
                                                {data.city}
                                            </div>
                                            <div class="col-md-4">
                                                <p className="card-text ">
                                                    <div className="empCount">{data.member.length}</div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                )
            })}
        </div>
    )
}
