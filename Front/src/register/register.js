import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Col, Panel, Checkbox} from "react-bootstrap";
import './register.css'
import axios from 'axios';

class Register extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          name: '',
          password: '',
          confirmPassword: '',
          email: '',
          roles: [],
          myRoles: [],
        };
        this.handleName = this.handleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
      } 
      
    
    handleCheckbox(event){
      let item = event.target.value.split(",");
      let aux= 0;
      this.state.myRoles.forEach(function(rol, index, object){
        if (rol.id == item[0]){
          object.splice(index, 1);
          aux = 1;
        }
      });
      
      if(aux == 0){
        let rol = {
          id : item[0],
          role : item[1]
        };
        this.state.myRoles.push(rol);
      }
      
      console.log(this.state.myRoles);
      
    }



    createSelectOptions(){
      let items = [];
      let aux = 0;
      this.state.roles.map((role) => {return (
        items.push(<Checkbox
          key={aux++}
          value = {[role.id, role.role]}
          onChange={this.handleCheckbox}> {role.role} </Checkbox>)
      )});
      return items;
    }

    handleName(event){
        this.setState({name: event.target.value});
    };

    handleEmail(event){
      this.setState({email: event.target.value});
    };
    
    handlePassword(event){

        this.setState({password: event.target.value});
    };
    
    handleConfirmPassword(event){
      this.setState({confirmPassword: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
      };

      componentDidMount() {
        axios.get(`http://35.226.163.50:8080/Backend/roles/`)
                .then(res => {
                    const roles = res.data;
                    //Se asigna falso para opened, para el collapse
                    roles.map( (role) => {role.opened = false});
                    this.setState({roles});
                }).catch(error => {
                    console.log(error.response)
                });
      };

      
      handleRegister  = (event) => {
        event.preventDefault();
        const user = {
          name:this.state.name,
          password:this.state.password,
          email:this.state.email,
          roles:this.state.myRoles,
        };
        const url = 'http://35.226.163.50:8080/Backend/users/create';
        axios.post(url,user)
            .then(res => {
              let userResponse=res.data;
              alert("Usuario agregado exitosamente!");
            }).catch(error => {
              alert("Error");
              console.log(error.response);
              console.log(error.request);
              console.log(error.message);
            });
      };

      validForm = (nam,pass) => () =>{
        var txt;
        var r
        console.log("name: "+ nam);
        console.log("password: "+ pass);
        let users = this.state.users;
        
        users.map( (user, i) => { if((user.name == nam)&& (user.password == pass)){
          console.log("nombre: "+ user.name);
          console.log("pass: "+ user.password);
          r = window.confirm("Presione aceptar para comenzar!");
          if (r == true) {           
            window.location.href='problems/show';
          } else {
            console.log("Error");
            window.location.href='/login';
          } 
            if(user.opened){ //Si es true
                console.log("And its opened");
                user.opened = false;
            }else{
                user.opened = true;
            }
        }
        } );
        this.setState({users});

    };

render(){
  return(
              <div className="Register"  >
              <row>
             
              
                <form onSubmit={this.handleSubmit}>
                 <FormGroup controlId="name"  bsSize="large">
                 <ControlLabel>Nombre</ControlLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.name}
                    onChange={this.handleName}
                  />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <ControlLabel>Contraseña</ControlLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={this.handlePassword}
                    type="password"
                  />
                </FormGroup>
                <FormGroup controlId="confirm password" bsSize="large">
                  <ControlLabel>Confirmar contraseña</ControlLabel>
                  <FormControl
                    value={this.state.confirmPassword}
                    onChange={this.handleConfirmPassword}
                    type="password"
                  />
                </FormGroup>
                <FormGroup controlId="email"  bsSize="large">
                 <ControlLabel>E-mail</ControlLabel>
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.email}
                    onChange={this.handleEmail}
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel> Rol </ControlLabel>
                    {this.createSelectOptions()}
                
                </FormGroup>
                <Button             
                  type="success" onClick = {this.handleRegister}
                >
                  Registrar
                </Button>

              </form>
        
              </row>
              
            </div>
          

        );
       
  
   }    
}

export default Register;