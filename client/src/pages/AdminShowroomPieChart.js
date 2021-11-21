import React from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import { getList } from './showroom/ShowroomList'
import Chart from "react-google-charts";
export default class AdminShowroomPieChart extends React.Component {
    state = {
        list:[['Task', 'Hours per Day'],]  
    }
    componentDidMount(){
        getList()
        .then(items => {
            console.log(items)
            //this.setState({ list: items.data })
            if(items.status == 'ok') {
                items.data.map(item=>{
                    let chart = [];
                    chart.push(item.showroomName);
                    chart.push(25);
                    this.state.list.push(chart);
                })
            }
            console.log("------------ 22");
            console.log(this.state.list);
        })
    }
    render() {
        return (
        <div>
            <Chart
                width={'400px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={this.state.list}
                options={{
                    title: 'Branch Status',
                    // Just add this option
                    pieHole: 0.4,
                }}
                rootProps={{ 'data-testid': '3' }}
            />
        </div>
        );
    }
}