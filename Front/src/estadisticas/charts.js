import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
export default class Chart extends Component {

    constructor (props) {
        super(props)
        this.state = {
          startDate: ""  
        };
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    render() {
        var darte =  new Date(this.state.startDate); 
        const data = {
            labels: [darte,'January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
          };

        return (
            <div>
                <Row > 
                    <Col md={10} xs={10}>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            dateFormat="DD/MM/YYYY"
                            todayButton={""}
                        />
                    </Col>    
                    <Col md={6} xs={6}>
                        <h2>Line Example</h2>
                        <Line data={data}
                        width = {600}
                        height = {400}  
                        />
                    </Col>
                </Row>    
              </div>
            );
          }
        }
        
        