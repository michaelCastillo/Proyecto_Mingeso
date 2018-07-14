import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Grid, Row, FormControl, Col, Label, Panel, ListGroup, ListGroupItem, DropdownButton, MenuItem, Table, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import UserProfile from './UserProfile';

class ShowUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editState: false,
            name: '',
            email: '',
            password: '',
            state: '',
            sections: [],
            roles: [],
        };
        this.showSection = this.showSection.bind(this);
        this.showRole = this.showRole.bind(this);
        this.handleState = this.handleState.bind(this);

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
                    password: user.password,
                    state: user.bloqued,
                    sections: user.sections,
                    roles: user.roles
                });
            }).catch(error => {
                console.log(error.response);
            });
    }

    showSection() {
        let items = [];
        this.state.sections.map((section) => {
            items.push(<ListGroupItem bsStyle="info"> {section.code} </ListGroupItem>);
        });
        return items;
    }
    showRole() {
        let items = [];
        this.state.roles.map((role) => {
            items.push(<ListGroupItem bsStyle="info"> {role.role} </ListGroupItem>);
        });
        return items;
    }
    handleState(){
        let item;
        if(this.state.state == false){
            item = <Label > Activo </Label>;
        } else {
            item = <Label > Bloqueado </Label>;            
        }
        return item;
    }


    render() {
        return (
            <Grid>
                <Row>
                    <div class="container">
                        <div class="row">
                            <Col md={3} sm={6}>
                                <h3>
                                    <Label bsStyle="info">Nombre</Label> </h3>
                                <br />
                                <h4>
                                    {this.state.name}</h4>
                                <br />
                                <p>
                                    <h3>
                                        <Label bsStyle="info">E-mail</Label></h3>
                                    <br />
                                    <h4>
                                        {this.state.email}
                                    </h4>
                                    <h3>
                                    <Label bsStyle="info">Estado</Label></h3>
                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.handleState()}
                                    </ListGroup>
                                </h4>
                                    <br />
                                    <h3>
                                        <Label bsStyle="info">Contraseña</Label></h3>
                                    <br />
                                    <h4>
                                        {this.state.password}</h4>
                                    <br />

                                </p>

                            </Col>
                            <Col md={3} sm={6}>
                                
                                <h3>
                                    <Label bsStyle="info">Secciones</Label></h3>
                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.showSection()}
                                    </ListGroup>
                                </h4>
                                <br />
                                <h3>
                                    <Label bsStyle="info">Roles</Label></h3>
                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.showRole()}
                                    </ListGroup>
                                </h4>
                                <br />
                            </Col>

                        </div>
                    </div>
                </Row>

            </Grid>
        );
    }




}




export default ShowUser;                