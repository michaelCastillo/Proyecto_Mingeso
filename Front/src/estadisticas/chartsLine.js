import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid, Row, Col, Label,ListGroup, ListGroupItem,FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';
import moment from 'moment';
import Chart from './charts'
import axios from 'axios';



export default class ChartLine extends Component {

    constructor (props) {
        super(props)
        this.state = {
          startDate:  moment(),
          userID : 0
        
        };
        this.handleChange = this.handleChange.bind(this);
     


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


      handleChange(date) {
        this.setState({
          startDate: date
        });
      }


      handleSubmit = (id) => {
      
        var dateLimit =  new Date(this.state.startDate); 
        const date2 = dateLimit.toDateString();
        var post = {dateLimit:this.formatDate(date2)};
        console.log(post);
       
        axios.post(`http://35.226.163.50:8080/Backend/stats/student/` + id + '/problemsSolved' ,post)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }  

      
      render() {
          var date =  new Date(this.state.startDate); 
          const date2 = date.toDateString();
          const NewDate = this.formatDate(date2);
             <Chart userID={this.state.userID}/>
            
             console.log(this.props.userID)
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
                      <Col md={10}  smOffset={2} xs={10}>
                          <DatePicker
                              selected={this.state.startDate}
                              onChange={this.handleChange}
                              dateFormat="DD/MM/YYYY"
                              todayButton={"today"}
                              maxDate={moment()}
                          />
                          
                      </Col>    
                      <Col md={6} smOffset={2} xs={6}>
                          <h2>Gráfico problemas resueltos</h2>
                          <Line data={data}
                          width = {600}
                          height = {400}  
                          />
                      </Col>
                      {this.handleSubmit(this.props.userID)}
  
                  
                  </Row> 
                 
                     
                </div>
  
              );
            }





    }      