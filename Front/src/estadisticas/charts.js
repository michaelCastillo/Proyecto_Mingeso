import React, { Component } from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
export default class Chart extends Component {

    constructor (props) {
        super(props)
        this.state = {
          startDate:  moment(),

        };
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

      handleSubmit = event => {
      
        var dateLimit =  new Date(this.state.startDate); 
        const date2 = dateLimit.toDateString();
        var post = {dateLimit:this.formatDate(date2)};
        console.log(post);
       
        axios.post(`http://35.226.163.50:8080/Backend/stats/student/11/problemsSolved`,post)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }  






    render() {
        var date =  new Date(this.state.startDate); 
        const date2 = date.toDateString();
        const NewDate = this.formatDate(date2);

        const data = {
            labels: [NewDate,'January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'Problemas resueltos',
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
                            todayButton={"today"}
                            maxDate={moment()}
                        />
                        <button type="submit" onClick= {this.handleSubmit}>Aceptar</button>
                    </Col>    
                    <Col md={6} xs={6}>
                        <h2>Gráfico problemas resueltos</h2>
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
        
        