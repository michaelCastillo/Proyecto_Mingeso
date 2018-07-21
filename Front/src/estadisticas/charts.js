import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid, Row, Col, Label,ListGroup, ListGroupItem,FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';

export default class Chart extends Component {

    constructor (props) {
        super(props)
        this.state = {
          startDate:  moment(),
          userList:[],
          value: '',
          name: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleValue = this.handleValue.bind(this);
        this.gets = this.gets.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);


      }

    handleValue = event => {
        this.setState({ value: event.target.value });
        {this.gets(this.state.value)}
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


      gets =(type) => {
        axios.get(`http://35.226.163.50:8080/Backend/` + type)
            .then(res => {
                const userList=res.data;
                this.setState({ userList });
                console.log(res.data);
                console.log(userList[0].code);

                this.state.listItems = userList.map((userl) =>
                <li key={userl.id}>
                     {userl.code}
               </li>
                )                 
            }).catch(error => {
                console.log(error.response)
            });
      };
    

  

      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'radio' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        console.log(name)
      }


    render() {
      const listItems = this.state.userList.map((userl) =>

          <div class="form-check">
          <label key = {userl.id}>

              {userl.code}

            <input 
                name= {userl.id}
                type="radio"
                value = {userl.id}
                onChange={this.handleInputChange}
              />
         
          </label>
          </div>         
              
                ) 

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
                <Col md={6} xs={6}>
                            
                            <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Select</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" onClick={this.handleValue} 
                              value={this.state.value}>
                             <option value="careers">carrera(s)</option>
                             <option value="coordinations ">coordinacion(s)</option>
                            </FormControl>
                            </FormGroup>
                            {listItems}
                            </Col>

                   
              </div>

            );
          }
        }
        
        