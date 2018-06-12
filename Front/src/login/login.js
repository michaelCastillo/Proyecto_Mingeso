import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './login.css'
import axios from 'axios';

class Login extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
        };
        this.handleName = this.handleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
      } 
      
    handleName(event){
        this.setState({email: event.target.value});
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
          email:this.state.email,
          password:this.state.password,
        };
        axios.post(`http://46.101.81.136:8181/Backend/users/login/`,user)
            .then(res => {
                let userResponse=res.data;
                console.log(userResponse);
                alert("bienvenido")

            }).catch(error => {
                console.log(error.response)
            });
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

