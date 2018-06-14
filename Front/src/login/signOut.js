import React, { Component } from 'react';
import {signOutAction} from '../actions/signOutAction';
import { Button } from "react-bootstrap";

class Signout extends Component {

    submit = () => {
        signOutAction();
      }


render(){

    return(
       <div> 
        {this.submit}
        
       </div> 
    );


}


}    

export default Signout;