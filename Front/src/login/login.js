import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './login.css'
import axios from 'axios';

class Login extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          name: "",
          password: "",
          tipo:"alumno",
        };
        this.handleName = this.handleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleTipo = this.handleTipo.bind(this);
      } 
      
    handleTipo = event => {
      console.log(event.target.value);
      this.setState({tipo:event.target.value})
      
    }

    handleName(event){
        this.setState({name: event.target.value});
    };
    
    handlePassword(event){

        this.setState({password: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
      };

      componentDidMount() {
        
      };

      
      handleLogin  = () => {
        let user = {
          name:this.state.name,
          password:this.state.password,
          tipo:"Admin",
        };
        axios.post(`http://localhost:1313/users/login`,user)
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
              <div className="Login">
                <form onSubmit={this.handleSubmit}>
                 <FormGroup controlId="name"  bsSize="large">
                 <ControlLabel>Email</ControlLabel>
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
                <FormGroup>
                  <ControlLabel> Tipo </ControlLabel>
                  <FormControl componentClass="select" value={this.state.tipo} onChange={this.handleTipo}> 
                    <option value = "alumno"> alumno </option>
                    <option value="profesor"> profesor </option>
                  </FormControl>
                </FormGroup>
                <Button             
                  type="submit" onClick = {this.handleLogin}
                >
                  Login
                </Button>

              </form>
            </div>
          

        );
       
  
   }    
}

export default Login;

