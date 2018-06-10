import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './register.css'
import axios from 'axios';

class Register extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          name: "",
          password: "",
          email: "",
          roles: [],
          rol: {
            id: 0,
            role: "",
          },
        };
        this.handleName = this.handleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleRole = this.handleRole.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
      } 
      
    handleRole = event => {
      //this.setState({rol:event.target.value})
      let rol = event.target.value.split(',');
      this.state.rol.id = parseInt(rol[0]);
      this.state.rol.role = rol[1];     
    }

    createSelectOptions(){
      let items = [];
      items.push(<option value = "" disabled="disabled" selected="true" > Seleccione rol </option>);
      this.state.roles.map((role) => {return (
        items.push(<option value = {[role.id,role.role]}> {role.role} </option>)
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

    handleSubmit = event => {
        event.preventDefault();
      };

      componentDidMount() {
        axios.get(`http://46.101.81.136:8181/Backend/roles/`)
                .then(res => {
                    const roles = res.data;
                    //Se asigna falso para opened, para el collapse
                    roles.map( (role) => {role.opened = false});
                    this.setState({roles});
                }).catch(error => {
                    console.log(error.response)
                });
      };

      
      handleRegister  = () => {
        let user = {
          name:this.state.name,
          password:this.state.password,
          email:this.state.email,
          roles:this.state.rol,
        };
        axios.post(`46.101.81.136:8181/Backend/users/createUser`,user)
            .then(res => {
                let userResponse=res.data;
                console.log(userResponse);
            }).catch(error => {
                console.log(error.response)
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
              <grid>
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
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={this.handlePassword}
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
                  <FormControl componentClass="select" onChange={this.handleRole}>
                    {this.createSelectOptions()}
                  </FormControl>
                </FormGroup>
                <Button             
                  type="submit" onClick = {this.handleRegister}
                >
                  Registrar
                </Button>

              </form>
              </row>
              </grid>
            </div>
          

        );
       
  
   }    
}

export default Register;