import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import ShowUser from './ShowUser'
import EditUser from './EditUser'
import { Grid, Row,FormControl, Col, Label, Panel ,DropdownButton,MenuItem ,Table, ButtonGroup,Button,ButtonToolbar} from 'react-bootstrap';

class UserProfile extends Component{

    constructor(props){
        super(props);

        this.state = {
            idUser: this.props.match.params.id,            
            componentState: true,
            name: '',
            email:'',
            password:'',
        };
        this.showUser = React.createRef();        
        this.editUser = React.createRef();        
        this.handleComponentChange = this.handleComponentChange.bind(this);
        this.handleComponent = this.handleComponent.bind(this);
    }

    handleComponent(){
        let item;
        if(this.state.componentState){            
            item = <ShowUser ref = {this.showUser} id={this.state.idUser}/> ;
            
        } else {
            
            item = <EditUser ref = {this.editUser} 
            id={this.state.idUser}/> ;
            
        }
        return item;
    }
    handleComponentChange(){
        if (this.state.componentState){
            this.setState({componentState:false});
        } else {
            this.setState({componentState:true});
        }
    }
    handleEditButton(){
        let item;
        if(this.state.componentState){
            item=<Button bsSize="large" onClick={this.handleComponentChange} bsStyle="warning" class="btn btn-primary">
            Editar</Button>;
        } else {
            item=
            <Button bsSize="large" onClick={this.handleComponentChange} bsStyle="success" class="btn btn-primary">
            Aceptar</Button>;
        }
        return item;
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
                                    {this.handleComponent()}
                                    
                                    <div class="btn-group">
                                        {this.handleEditButton()}
                                        
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




export default UserProfile;                