import React, { Component } from 'react';

import {ControlLabel} from 'react-bootstrap';
import axios from 'axios';
import "./time.css";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Chart from './charts';

import {Spin } from 'antd';

export default class TimeChart extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
          userID : 0,
          type : "",
          textTime :"--",
          nombreTipo: "",
          ready:true,
          signal:false,
          idcurrent: 0
        
        };
     
        this.handleButton = this.handleButton.bind(this);
    }
   
  
    

    componentDidMount() {

      this.setState({
        type:this.props.type,
        id:this.props.userID,
        idcurrent:this.props.userID,
      
      });
      }
      
      postTime(){
        this.setState({ ready:false });
        var type = this.state.type;
        var id = this.state.id;
        if(type === "student"){
          axios.get(`http://35.226.163.50:8080/Backend/stats/users/` + id + '/totalTime')
         .then(res => {
              console.log(res);
              console.log(res.data);
              console.log(res.data.time);
              this.state.nombreTipo  = "estudiante";
              const textTime=res.data.time;
              this.setState({ textTime,ready:true });
  
            
            })
          }
          
          if(type === "careers"){
            axios.get(`http://35.226.163.50:8080/Backend/stats/career/` + id + '/totalTime')
           .then(res => {
                console.log(res);
                console.log(res.data);
                console.log(res.data.time);
  
                this.state.nombreTipo  = "carrera";
                const textTime=res.data.time;
                this.setState({ textTime,ready:true});          
              })
            }
  
            if(type === "classes"){
              axios.get(`http://35.226.163.50:8080/Backend/stats/classes/` + id + '/totalTime')
             .then(res => {
                  console.log(res);
                  console.log(res.data);
                  console.log(res.data.time);
  
                  this.state.nombreTipo  = "clase";
                  const textTime=res.data.time;
                  this.setState({ textTime ,ready:true });
                  
      
                
                })
              }
  
              if(type === "coordinations"){
                  axios.get(`http://35.226.163.50:8080/Backend/stats/coordination/` + id + '/totalTime')
               .then(res => {
                    console.log(res);
                    console.log(res.data);
                    console.log(res.data.time);
  
                   this.state.nombreTipo  = "coordinación";
                   const textTime=res.data.time;
                   this.setState({ textTime ,ready:true});   
                    
                  
                  })
                }
  
             
  
      }
      
      handleButton(){
        this.postTime();
      }


render(){
   if(this.state.idcurrent != this.props.userID){
    

    this.componentDidMount()


   }


    <Chart userID={this.state.userID} type = {this.state.type} />
    console.log(this.props.userID);
    console.log(this.props.type);
    console.log(this.state.textTime);
    const percentage = 100;
    if(this.state.ready !== true ){

      return(
         <div className="querySpinTime">
            <Spin tip="" size="large">
            </Spin>
          </div>
      )

      
    }
return(

    <div>

 
         <h4>
         <ControlLabel>Tiempo total empleado en resolver problemas (segundos): </ControlLabel>
        </h4>
        <br/>
        <CircularProgressbar
             
             percentage={percentage}
             text={`${this.state.textTime} s`}
        />   
         </div>



)




}

}