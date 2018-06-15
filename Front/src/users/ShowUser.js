import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Grid, Row,FormControl, Col, Label, Panel ,DropdownButton,MenuItem ,Table, ButtonGroup,Button,ButtonToolbar} from 'react-bootstrap';

class ShowUser extends Component{

    constructor(props){
        super(props);

        this.state = {
            editState: false,
            name: '',
            email:'',
            password:'',
    
        };
        this.handleEditEmail = this.handleEditEmail.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        
    }
    componentDidMount() {
        let id_user = this.props.match.params.id;
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

    handleEditEmail(){
        let item;
        if(this.state.editState){
            item=<Label>{this.state.email}</Label>;
        } else {
            item=
            <FormControl
            autoFocus
            type="text"
            value={this.state.email}
            
          />;
        }
        console.log(this.state.editState);
        return item;
    }

    handleEdit(){
        this.state.editState = !this.state.editState;
    }
            
    render(){
        
        return(
            <Grid>
                <Row>
                <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-6">
                        <div class="well well-sm">
                            <div class="row">
                                <div class="col-sm-6 col-md-4">
                                    <img src="http://placehold.it/380x500" alt="" class="img-rounded img-responsive" />
                                </div>
                                <div class="col-sm-6 col-md-8">
                                    <h4>
                                        {this.state.name}</h4>
                                  
                                    <p>
                                        <Label>E-mail</Label>
                                        <br />
                                        {this.handleEditEmail}
                                        <br />
                                        <br />
                                        <Label>Contraseña</Label>
                                        <br />
                                        {this.state.password}
                                        <br />
                                        </p>
                                
                                    <div class="btn-group">
                                        <Button onClick={this.handleEdit} bsStyle="info" class="btn btn-primary">
                                            Editar</Button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            </Row>
                    
            </Grid>
        );
    }




}




export default ShowUser;                