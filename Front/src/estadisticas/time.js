import React, { Component } from 'react';
import { Grid, Row, Col, Label,ListGroup, ListGroupItem,FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';
import axios from 'axios';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Chart from './charts';
import ReactLoading from "react-loading";


export default class TimeChart extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
          userID : 0,
          type : "",
          textTime :0,
          nombreTipo: "",
          ready:false,
          signal:false,
          idcurrent: 0
        
        };
     

    }
   
  
    

    componentDidMount() {
      const type = this.props.type;
      const id = this.props.userID;
      this.state.idcurrent = id;
      
      console.log(this.state.id);
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
              console.log(res.data.totalTime);

              this.state.nombreTipo  = "carrera";
              const textTime=res.data.totalTime;
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

        <ReactLoading type={"spin"} color={" #2876e1 "} height={667} width={375} />

      )

      
    }
return(

    <div>

        <Row>
 
         <Col md={8} smOffset={3} xs={8} sm = {2}>
         <h4>
         <ControlLabel>Tiempo total empleado para resolver problemas: </ControlLabel>
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