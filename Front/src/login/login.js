import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './login.css'
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../actions/actionSign';
import { connect } from 'react-redux';

class Login extends Component{

    submit = (values) => {
      this.props.signInAction(values, this.props.history);
      console.log(values)
    }



    errorMessage() {
      if (this.props.errorMessage) {
        return (
          <div className="info-red">
            {this.props.errorMessage}
          </div>
        );
      }
    }


render(){
  const { handleSubmit } = this.props;
  return(
              <div className="Login">
                <form onSubmit={ handleSubmit(this.submit) } >
                 <FormGroup controlId="name"  bsSize="large">
                 <ControlLabel>Email: </ControlLabel>
                 <br/>
                 <Field name="email"
                   component="input"
                   type="text"
                   placeholder="Email" 
                 />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <ControlLabel>Password: </ControlLabel>
                  <br/>
                  <Field 
                   
                   name="password" 
                   component="input"
                   type="password"
                   placeholder="Password" 
                />
                </FormGroup>
               
                <Button             
                  type="submit" 
                >
                  Login
                </Button>

              </form>
              {this.errorMessage()}
            </div>
          

        );
       
  
   }    
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
  form: 'Login'
})(Login);

export default connect(mapStateToProps, {signInAction})(reduxFormSignin);
