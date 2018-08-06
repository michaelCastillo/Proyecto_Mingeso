import React, { Component } from 'react';
import {signOutAction} from '../actions/signOutAction';
import { connect } from 'react-redux';


class Signout extends Component {

    componentWillMount() {
        signOutAction();
        window.location.href = "/home";

    }

render(){

    return( 
        <div className="content">Vuelve cuando quieras...</div>        
    );


}


}    

export default connect(null, {signOutAction})(Signout);