import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Grid, Row,FormControl, Col, Label, Panel ,DropdownButton,MenuItem ,Table, ButtonGroup,Button,ButtonToolbar} from 'react-bootstrap';
import UserProfile from './UserProfile';

class ShowUser extends Component{

    constructor(props){
        super(props);

        this.state = {
            editState: false,
            name: '',
            email:'',
            password:'',
        };
        
    }
    componentDidMount() {
        let id_user = this.props.id;
        //Por ahora es la id 6, cuando este el login bien se cambia por aquel que
        //esté logueado.
        let global_url = `http://46.101.81.136:8181/Backend`;
        let user = axios.get(global_url + `/users/` + id_user)
            .then(res => {
                const user = res.data;
                this.setState({
                    name: user.name,
                    email: user.email,
                    password: user.password
                });
            }).catch(error => {
                console.log(error.response);
            });
    }

    
            
    render(){
        return(
            <Grid>
                <Row>
                <div class="container">
                <div class="row">
                   
                                <div class="col-sm-6 col-md-8">
                                    <h3>
                                    <Label bsStyle="info">Nombre</Label> </h3>
                                        <br />
                                        <h4>
                                        {this.state.name}</h4>
                                        <br />
                                        <br />
                                    <p>
                                        <h3>
                                        <Label bsStyle="info">E-mail</Label></h3>
                                        <br />
                                        <h4>
                                        {this.state.email}
                                        </h4>
                                        <br />
                                        <br />
                                        <h3>
                                        <Label bsStyle="info">Contraseña</Label></h3>
                                        <br />
                                        <h4>
                                        {this.state.password}</h4>
                                        <br />
                                        
                                        </p>
                                    
                                    
                                </div>
                            </div>
                        </div>
            </Row>
                    
            </Grid>
        );
    }




}




export default ShowUser;                