import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid, Row, Col, Label,ListGroup, ListGroupItem,FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import ChartLine from './chartsLine'


export default class Chart extends Component {

    constructor (props) {
        super(props)
        this.state = {
          startDate:  moment(),
          userList:[],
          value: '',
          type: '',
          chartcomponent : false,
          userID: 0,
          listItems:[]

        };
        this.startDate = React.createRef();
        this.chart =  React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleValue = this.handleValue.bind(this);
        this.gets = this.gets.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeComponentStatus = this.changeComponentStatus.bind(this);
        this.boolNext = this.boolNext.bind(this);
      }

      changeComponentStatus(event){
        
        if (this.state.chartcomponent){
            this.setState({chartcomponent:false});
        } else {
            this.setState({chartcomponent:true});
        }

     }  


    handleValue = event => {
        this.setState({ value: event.target.value });
        console.log(this.state.value);
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

   

      gets =(type) => {
        axios.get(`http://35.226.163.50:8080/Backend/` + type)
            .then(res => {
                const userList=res.data;
                this.setState({ userList });
                console.log(res.data);
                this.state.type = type;
                this.state.listItems = userList.map((userl) =>
                <li key={userl.id}>
                     {userl.code}
               </li>
                )                 
            }).catch(error => {
                console.log(error.response)
            });
      };

      getCarrerStudent =(id) => {
        axios.get('http://35.226.163.50:8080/Backend/careers/' + id +'/getStudents/')
            .then(res => {
                const userList=res.data;
                this.setState({ userList });
                console.log(res.data);
                this.state.type = "student";
                this.state.listItems = userList.map((userl) =>
                <li key={userl.id}>
                     {userl.code}
               </li>
                ) 
                
                
            }).catch(error => {
                console.log(error.response)
            });
      };
    

      getClasseStudent =(id) => {
        axios.get('http://35.226.163.50:8080/Backend/classes/' + id +'/students/')
            .then(res => {
                const userList=res.data;
                this.setState({ userList });
                console.log(res.data);
                this.state.type = "student";
                this.state.listItems = userList.map((userl) =>
                <li key={userl.id}>
                     {userl.code}
               </li>
                ) 
                
                
            }).catch(error => {
                console.log(error.response)
            });
      };

      getClasesCoord =(id) => {
        axios.get('http://35.226.163.50:8080/Backend/coordinations/' + id +'/getClasses/')
            .then(res => {
                const userList=res.data;
                this.setState({ userList });
                console.log(res.data);
                this.state.type = "classes";    
            }).catch(error => {
                console.log(error.response)
            });
      };
      
  

      handleInputChange(event) {
        const target = event.target;
        var value = target.type === 'radio' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        this.state.userID = target.value;

       
          
      }

      
    boolNext(event){  

    if((this.state.value === "coordinations") )  
    {  this.getCarrerStudent(this.state.userID);
       this.state.value = "";
      
    }
    
    console.log(this.state.userID)
    if(this.state.value === "careers")
    {this.getClasesCoord(this.state.userID);
      this.state.value = "";

    }

    if(this.state.type === "classes")
    {this.getClasseStudent(this.state.userID);
      this.state.type = "";

    }


    }

    render() {

      let component = null;

     if (this.state.chartcomponent){
        component = <ChartLine ref = {this.chart} userID = {this.state.userID}  type = {this.state.type}/> ;
      }



    if(this.state.type != "classes"){  
      
      this.state.listItems = this.state.userList.map((userl) =>
          <div class="form-check">
          <label key = {userl.id}>

              {userl.code}  

              {userl.name}

            <input 
                name= "radioOption"
                type="radio"
                value = {userl.id}
                onChange={this.handleInputChange}
              />
         
          </label>

          </div>         
              
                ) 
      }      
      
      if(this.state.type === "classes"){  
      
        this.state.listItems = this.state.userList.map((userl) =>
            <div class="form-check">
            <label key = {userl.id}>
  
                {userl.students}  
  
              <input 
                  name= "radioOption"
                  type="radio"
                  value = {userl.id}
                  onChange={this.handleInputChange}
                />
           
            </label>
  
            </div>         
                
                  ) 
        }          
  

        console.log(this.props.startDate);

        return (
            <div>
              
                {this.state.type}
                <Row > 
                  {component}
                 
                <Col md={6} smOffset={2} xs={6} >
                            <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Seleccione gráfico a mostrar</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" onClick={this.handleValue} 
                              value={this.state.value}>
                             <option value="careers">coordinacione(s)</option>
                             <option value="coordinations">carrera(s)</option>
                            </FormControl>
                            </FormGroup>
                            {this.state.listItems}

                            <Button onClick = {this.boolNext}>Siguiente</Button>

                            <Button bsStyle="info" onClick = {this.changeComponentStatus}>Mostrar estadistica</Button>

                            </Col>

                 </Row> 
              </div>

            );
          }
        }
        
        