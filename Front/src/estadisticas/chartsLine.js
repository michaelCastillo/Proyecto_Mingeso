import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid, Row, Col,Button,InputGroup } from 'react-bootstrap';
import moment, { relativeTimeThreshold } from 'moment';
import Chart from './charts'
import axios from 'axios';
import ReactLoading from "react-loading";




export default class ChartLine extends Component {

    constructor (props) {
        super(props)
        this.state = {
          startDate:  moment(),
          userID : 0,
          dateList: [],
          listItems:[],
          listDate:[],
          nameDate:"",
          type : "",
          nombreTipo : "",
          dateActual: "",
          ready:false,
          signal:false
        
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleButton = this.handleButton.bind(this);
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


      handleChange = (date)=> {

        this.setState({
          startDate: date
        });

      }

      handleButton(event){
        
        this.handleSubmit(this.props.userID,this.props.type);

      }

      handleSubmit = (id,type) => {
        var post = {dateLimit:this.state.dateActual};
        console.log(post);
        console.log(this.state.dateActual);
        console.log(this.state.type);
       if(type === "student"){
        axios.post(`http://35.226.163.50:8080/Backend/stats/student/` + id + '/problemsSolved' ,post)
       .then(res => {
            console.log(res);
            console.log(res.data);
            this.state.nombreTipo  = "estudiante";
            const dateList=res.data.result;
            this.setState({ dateList });
            const listItems = dateList.map(date => date.date);
            this.setState({listItems});
            const listDate = dateList.map(date => date.numberSolved);
            this.setState({listDate,ready : true});
            this.state.type = "";

          
          })
        }
        
        if(type === "careers"){
          axios.post(`http://35.226.163.50:8080/Backend/stats/careers/` + id + '/problemsSolved' ,post)
         .then(res => {
              console.log(res);
              console.log(res.data);
              this.state.nombreTipo  = "carrera";
              const dateList=res.data.result;
              this.setState({ dateList });
              const listItems = dateList.map(date => date.date);
              this.setState({listItems});
              const listDate = dateList.map(date => date.numberSolved);
              this.setState({listDate,ready : true});
              this.state.type = "";

  
            
            })
          }

          if(type === "classes"){
            axios.post(`http://35.226.163.50:8080/Backend/stats/classes/` + id + '/problemsSolved' ,post)
           .then(res => {
                console.log(res);
                console.log(res.data);
                this.state.nombreTipo  = "clase";
                const dateList=res.data.result;
                this.setState({ dateList });
                const listItems = dateList.map(date => date.date);
                this.setState({listItems});
                const listDate = dateList.map(date => date.numberSolved);
                this.setState({listDate,ready : true});
                this.state.type = "";

    
              
              })
            }

            if(type === "coordinations"){
              axios.post(`http://35.226.163.50:8080/Backend/stats/coordinations/` + id + '/problemsSolved' ,post)
             .then(res => {
                  console.log(res);
                  console.log(res.data);
                  this.state.nombreTipo  = "coordinación";
                  const dateList=res.data.result;
                  this.setState({ dateList });
                  const listItems = dateList.map(date => date.date);
                  this.setState({listItems});
                  const listDate = dateList.map(date => date.numberSolved);
                  this.setState({listDate,ready : true});
                  this.state.type = "";

                
                })
              }

              this.setState({ready : false});



      }  

      
      render() {
          this.state.dateActual=this.formatDate(this.state.startDate._d);
          console.log(this.state.dateActual);
          <Chart userID={this.state.userID} type = {this.state.type} signal = {this.state.signal}/>
             const data = {
              labels: this.state.listItems,
              datasets: [
                {
                  label: "Problemas resueltos diariamente hasta la fecha" ,
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
                  data: this.state.listDate
                }
              ]
            };

          if(this.state.ready !== true ){
            
            return(
             <div> 
              <Col md={10}  smOffset={1.3} xs={10}>
                          <DatePicker
                              selected={this.state.startDate}
                              onChange={this.handleChange}
                              dateFormat="YYYY-MM-DD"
                              todayButton={"today"}
                              maxDate={moment()}
                              onYearChange = {this.handleChange}
                              
                          />
                          <br/>
                            <Button bsStyle="info" onClick = {this.handleButton}>Aceptar</Button>
              </Col> 
              <ReactLoading type={"spin"} color={" #2876e1 "} height={667} width={375} />
            </div>
            )
          } 
          
          
          return (
              <div>
                  <Row > 
                      <Col md={10}  smOffset={1.3} xs={10}>
                          <DatePicker
                              selected={this.state.startDate}
                              onChange={this.handleChange}
                              dateFormat="YYYY-MM-DD"
                              todayButton={"today"}
                              maxDate={moment()}
                              onYearChange = {this.handleChange}
                              
                          />
                          <br/>
                            <Button bsStyle="info" onClick = {this.handleButton}>Aceptar</Button>
                            <br/>
                            <br/>
                      </Col>    
                      <Col md={8} smOffset={1.5} xs={6}>
                          <h2>Cantidad problemas resueltos desde: {this.state.dateActual} <br/>
                              Tipo:{this.state.nombreTipo}
                          
                          </h2>
                         
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