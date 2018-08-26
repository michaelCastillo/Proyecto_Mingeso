import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid, Row, Col,Button,InputGroup, Popover } from 'react-bootstrap';
import moment, { relativeTimeThreshold } from 'moment';
import Chart from './charts'
import axios from 'axios';
import {Spin } from 'antd';
import "./time.css";



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
          signal:false,
          idcurrent:0,
          ready1:false,
          message:""
        
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleButton = this.handleButton.bind(this);
      }

      formatDate(date) {
            var month = "01",
            day = "01",
            year = "1996";
    
    
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
        this.state.idcurrent = this.props.userID;
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
            const message = res.data.message;
            this.setState({ dateList, message });
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
              const message = res.data.message;
              this.setState({ dateList, message });
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
                const message = res.data.message;
                this.setState({ dateList, message });
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
                  const message = res.data.message;
                  this.setState({ dateList, message });
                  const listItems = dateList.map(date => date.date);
                  this.setState({listItems});
                  const listDate = dateList.map(date => date.numberSolved);
                  this.setState({listDate,ready : true});
                  this.state.type = "";

                
                })
              }

              this.setState({ready : false, ready1:false});



      }  

      
      render() {
        if(this.state.idcurrent != this.props.userID){
          this.state.ready = false;   
          this.state.ready1=true;    
          this.state.message = "";  
          }  
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

         //   <ReactLoading type={"spin"} color={" #2876e1 "} height={667} width={375} />
          if(this.state.ready !== true ){
              if(this.state.ready1===true ){
                   return(
                    <div>                   
                    <Line data={data}
                    width = {600}
                    height = {530}  
                    />
                  </div>
            )}
            else{
              return(
                <div  className="querySpin">
                  <Spin tip="" size="large">
                  </Spin>
                </div>
               
              )
            } 
          } 
          return (
            <div>
                          <Line data={data}
                          width = {600}
                          height = {530}  
                          />
                </div>
              );
            }






    }      