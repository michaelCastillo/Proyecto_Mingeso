import React, { Component } from 'react';
import { Grid, Row, Col, Label,ListGroup, ListGroupItem,FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';
import axios from 'axios';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Chart from './charts'

export default class TimeChart extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
          userID : 0,
          type : "",
          textTime :0,
          nombreTipo: ""
        
        };
     

    }
   
  
    

    componentDidMount() {
      const type = this.props.type;
      const id = this.props.userID;
       if(type === "student"){
        axios.get(`http://35.226.163.50:8080/Backend/stats/users/` + id + '/totalTime')
       .then(res => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.time);
            this.state.nombreTipo  = "estudiante";
            const textTime=res.data.time;
            this.setState({ textTime });

          
          })
        }
        
        if(type === "careers"){
          axios.get(`http://35.226.163.50:8080/Backend/stats/career/` + id + '/totalTime')
         .then(res => {
              console.log(res);
              console.log(res.data);
              console.log(res.data.totalTime);

              this.state.nombreTipo  = "carrera";
              const textTime=res.data.totalTime;
              this.setState({ textTime });

            

  
            
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
                this.setState({ textTime });
                
    
              
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
                 this.setState({ textTime });   
                  
                
                })
              }
      }  
      handleButton(){
        const type = this.props.type;
      const id = this.props.userID;
       if(type === "student"){
        axios.get(`http://35.226.163.50:8080/Backend/stats/users/` + id + '/totalTime')
       .then(res => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.time);
            this.state.nombreTipo  = "estudiante";
            const textTime=res.data.time;
            this.setState({ textTime });

          
          })
        }
        
        if(type === "careers"){
          axios.get(`http://35.226.163.50:8080/Backend/stats/career/` + id + '/totalTime')
         .then(res => {
              console.log(res);
              console.log(res.data);
              console.log(res.data.totalTime);

              this.state.nombreTipo  = "carrera";
              const textTime=res.data.totalTime;
              this.setState({ textTime });

            

  
            
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
                this.setState({ textTime });
                
    
              
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
                 this.setState({ textTime });   
                  
                
                })
              }
      }



render(){
  console.log("rendesr");
    <Chart userID={this.state.userID} type = {this.state.type} />
    console.log("us id=> "+this.props.userID);
    console.log("type => "+this.props.type);
    console.log("time => "+this.state.textTime);
    const percentage = 100;

return(

    <div>

        <Row>
 
         <Col md={3} smOffset={3} xs={3} sm = {2}>
      
         <h4>
             <Label>Tiempo total empleado para resolver problemas:</Label>
        </h4>
        <br/>
        <CircularProgressbar
             
             percentage={percentage}
             text={`${this.state.textTime} s`}
        />   
        </Col>
        </Row>
         </div>



)




}

}