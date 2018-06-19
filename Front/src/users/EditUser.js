import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Grid, Row, FormControl, Col, Label, Panel, ListGroup, ListGroupItem, DropdownButton, MenuItem, Table, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import UserProfile from './UserProfile';

class EditUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editState: true,
            name: '',
            email: '',
            password: '',
            state: '',
            sections: [],
            roles: [],
        };

        this.handleEditEmail = this.handleEditEmail.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleEditPassword = this.handleEditPassword.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleSection = this.handleSection.bind(this);
        this.handleRole = this.handleRole.bind(this);
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
    updateUser = (event) => {
        event.preventDefault();
        const user = {
            id: this.props.id,
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
        };
        const url = 'http://46.101.81.136:8181/Backend/users/update';
        axios.put(url, user)
            .then(res => {
                let userResponse = res.data;
                alert("Usuario editado exitosamente!");
            }).catch(error => {
                alert("Error");
                console.log(error.response);
                console.log(error.request);
                console.log(error.message);
            });
    }

    handleEditName(event) {
        this.setState({ name: event.target.value });
    }
    handleEditEmail(event) {
        this.setState({ email: event.target.value });

    }
    handleEditPassword(event) {
        this.setState({ password: event.target.value });
    }
    handleSection(event){

    }
    handleRole(event){

    }



    render() {

        return (
            <Grid>
                <Row>
                    <div class="container">
                        <div class="row">

                            <Col md={3} sm={6}>
                                <h3>
                                    <Label bsStyle="danger">Nombre</Label> </h3>
                                <br />
                                <h4>
                                    <FormControl
                                        autoFocus
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.handleEditName}
                                    /></h4>
                                <br />
                                <br />
                                <p>
                                    <h3>
                                        <Label bsStyle="danger">E-mail</Label></h3>
                                    <br />
                                    <h4>
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            value={this.state.email}
                                            onChange={this.handleEditEmail}

                                        />
                                    </h4>
                                    <br />
                                    <br />
                                    <h3>
                                        <Label bsStyle="danger">Contraseña</Label></h3>
                                    <br />
                                    <h4>
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            value={this.state.password}
                                            onChange={this.handleEditPassword}

                                        /></h4>
                                    <br />
                                    <Col md={6} xs={2}>
                                        <Button bsSize="large" onClick={this.updateUser} bsStyle="success" class="btn btn-primary">
                                            Guardar</Button>
                                    </Col>

                                    <br />
                                    <br />
                                </p>
                            </Col>
                            <Col md={3} sm={6}>
                                <h3>
                                    <Label bsStyle="info">Secciones</Label></h3>
                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.handleSection()}
                                    </ListGroup>
                                </h4>
                                <br />
                                <h3>
                                    <Label bsStyle="info">Roles</Label></h3>
                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.handleRole()}
                                    </ListGroup>
                                </h4>
                                <br />
                                <Col md={6} xs={2}>
                                    <Button bsSize="large" onClick={this.updateUser} bsStyle="danger" class="btn btn-primary">
                                        Bloquear</Button>
                                </Col>
                                <Col md={6} xs={2}>
                                    <Button bsSize="large" onClick={this.updateUser} bsStyle="danger" class="btn btn-primary">
                                        Eliminar</Button>
                                </Col>
                                <br />
                                <br />
                            </Col>


                        </div>
                    </div>
                </Row>

            </Grid>
        );
    }




}




export default EditUser;                