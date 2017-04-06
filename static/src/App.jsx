import React from 'react';
import ReactDOM from 'react-dom';
import ReactTimeout from 'react-timeout';
import RaisedButton from 'material-ui/RaisedButton';
import { Line } from 'react-chartjs-2';
import { get_atmosphere, start_atmosphere, stop_atmosphere, set_interval } from './http_functions';


@ReactTimeout
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                date: [0],
                pressure: [0]
            },
            idTimer: null
        };
	    let _this = this;
	    let request = get_atmosphere();
        request.then(function (response) {
            let pressureMmRtSt = response.data.pressure.map(x => x * 0.7500637);
            _this.setState({
                data: {
                    date: response.data.date,
                    pressure: pressureMmRtSt
                }
            });
        });
    }

    request_atmosphere() {
        let _this = this;
        let request = get_atmosphere();
        request.then(function (response) {
        // request.then(function (response) {
        //     var DATA = []
        //     for (var i=0;  i<response.data.date.length; i++){
        //         DATA.push(new Date(response.data.date[i]));
        //     }
        //
        //     console.log(response.data.date.length)
        //     console.log(DATA)
            let pressureMmRtSt = response.data.pressure.map(x => x * 0.7500637);
            _this.setState({
                data: {
                    date: response.data.date,
                    pressure: pressureMmRtSt
                }
            });
        });
    }

    handleStartClick = () => {
        start_atmosphere();
        let id = this.props.setInterval(() => {this.request_atmosphere()}, 15000);
        this.setState(
            {idTimer: id}
        );
    };

    handleStopClick = () => {
        console.log(this.state.data);
	    stop_atmosphere();
    };

    handleSetIntervalClick = () => {
        console.log("Set Interval 30 sec");
	    set_interval();
    };

    handleStopRequestClick = () => {
        console.log("Stop Requests");
        this.props.clearInterval(this.state.idTimer);
    };

render() {
        const data = {
            labels: this.state.data.date,
            //labels: [],
            datasets: [
            {
                label: 'My First dataset',
		        fill: false,
		        lineTension: 0.1,
		        backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
			    data: this.state.data.pressure
            }
            ]
        };
        const options = {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                millisecond: 'MMM DD HH:mm:ss',
                                second: 'MMM DD HH:mm:ss',
                                minute: 'MMM DD HH:mm:ss',
                                hour: 'MMM DD HH:mm:ss',
                                day: 'MMM DD HH:mm:ss',
                                week: 'MMM DD HH:mm:ss',
                                month: 'MMM DD HH:mm:ss'
                                }
                            }
                        }]
                    }
                };

        return (
            <div>
                <Line
                    data={data}
                    options={options}
                />
                <RaisedButton
                    label="Start"
                    onClick={this.handleStartClick}
                />
                <RaisedButton
                    label="Stop"
                    onClick={this.handleStopClick}
                />
		        <RaisedButton
                    label="Set Interval"
                    onClick={this.handleSetIntervalClick}
                />
		        <RaisedButton
                    label="Stop Request"
                    onClick={this.handleStopRequestClick}
                />
            </div>
        );
    }
}
