import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { Grid, Row, FormControl, Col, Label, Panel, Checkbox, ListGroup, ListGroupItem, DropdownButton, MenuItem, Table, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
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
            allSections: [],
            allRoles: [],
            newSections: [],
            newRoles: []
        };

        this.handleEditEmail = this.handleEditEmail.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleEditPassword = this.handleEditPassword.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleCheckboxSections = this.handleCheckboxSections.bind(this);
        this.createSelectOptions = this.createSelectOptions.bind(this);
        this.createSelectOptionsSection = this.createSelectOptionsSection.bind(this);
        this.blockUser = this.blockUser.bind(this);
    }
    componentDidMount() {
        let id_user = this.props.id;
        //Por ahora es la id 6, cuando este el login bien se cambia por aquel que
        //esté logueado.
        let global_url = `http://35.226.163.50:8080/Backend`;
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
        axios.get(`http://35.226.163.50:8080/Backend/roles/`)
            .then(res => {
                const roles = res.data;
                //Se asigna falso para opened, para el collapse
                this.setState({ allRoles: roles });
            }).catch(error => {
                console.log(error.response)
            });
        axios.get(`http://35.226.163.50:8080/Backend/sections/`)
            .then(res => {
                const sections = res.data;
                //Se asigna falso para opened, para el collapse
                this.setState({ allSections: sections });
            }).catch(error => {
                console.log(error.response)
            });
    }
    updateUser = (event) => {
        event.preventDefault();
        const user = {
            id: this.props.id,
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
            sections: this.state.newSections,
            roles: this.state.newRoles
        };
        console.log(user);

        const url = 'http://35.226.163.50:8080/Backend/users/update';
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


    createSelectOptions() {
        let items = [];
        let aux = 0;
        let flag = 0;
        this.state.allRoles.map((role) => {
            this.state.roles.map((myRole) => {
                if (myRole.id == role.id) {
                    flag = 1;
                }
            });
            if (flag == 1) {
                let roleAux = {
                    id: role.id,
                    role: role.role
                };
                this.state.newRoles.push(roleAux);
                items.push(<Checkbox
                    key={aux++}
                    defaultChecked
                    value={[role.id, role.role]}
                    onChange={this.handleCheckbox}> {role.role} </Checkbox>);
            } else {
                items.push(<Checkbox
                    key={aux++}
                    value={[role.id, role.role]}
                    onChange={this.handleCheckbox}> {role.role} </Checkbox>);
            }
            flag = 0;

        });
        return items;
    }
    handleCheckbox(event) {
        let item = event.target.value.split(",");
        let aux = 0;
        this.state.newRoles.forEach(function (role, index, object) {
            if (role.id == item[0]) {
                object.splice(index, 1);
                aux = 1;
            }
        });

        if (aux == 0) {
            let rol = {
                id: item[0],
                role: item[1]
            };
            this.state.newRoles.push(rol);
        }
    }
    createSelectOptionsSection() {
        let items = [];
        let aux = 0;
        let flag = 0;
        this.state.allSections.map((section) => {
            this.state.sections.map((mySection) => {
                if (mySection.id == section.id) {
                    flag = 1;
                }
            });
            if (flag == 1) {
                let sectionAux = {
                    id: section.id,
                    code: section.code
                };
                this.state.newSections.push(sectionAux);
                items.push(<Checkbox
                    key={aux++}
                    defaultChecked
                    value={[section.id, section.code]}
                    onChange={this.handleCheckboxSections}> {section.code} </Checkbox>);
            } else {
                items.push(<Checkbox
                    key={aux++}
                    value={[section.id, section.code]}
                    onChange={this.handleCheckboxSections}> {section.code} </Checkbox>);
            }
            flag = 0;

        });
        return items;
    }
    handleCheckboxSections(event) {
        let item = event.target.value.split(",");
        let aux = 0;
        this.state.newSections.forEach(function (section, index, object) {
            if (section.id == item[0]) {
                object.splice(index, 1);
                aux = 1;
            }
        });

        if (aux == 0) {
            let section = {
                id: item[0],
                code: item[1]
            };
            this.state.newSections.push(section);
        }
    }
    blockUser(event){
        event.preventDefault();
        const user = {
            id: this.props.id,
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
            sections: this.state.newSections,
            roles: this.state.newRoles,
            bloqued: !this.state.bloqued
        };

        const url = 'http://35.226.163.50:8080/Backend/users/update';
        axios.put(url, user)
            .then(res => {
                let userResponse = res.data;
                alert("Usuario bloqueado exitosamente!");
            }).catch(error => {
                alert("Error");
                console.log(error.response);
                console.log(error.request);
                console.log(error.message);
            });
    }



    render() {

        return (
            <Grid>
                <div class="container">
                    <Row>
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
                            </p>
                        </Col>

                        <Col md={3} sm={6}>
                            <h3>
                                <Label bsStyle="danger">Secciones</Label></h3>
                            <br />
                            <h4>
                                <ListGroup>
                                    {this.createSelectOptionsSection()}
                                </ListGroup>
                            </h4>
                            <br />
                            <h3>
                                <Label bsStyle="danger">Roles</Label></h3>
                            <br />
                            <h4>
                                <ListGroup>
                                    {this.createSelectOptions()}
                                </ListGroup>
                            </h4>
                            <br />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5} xs={5}>
                            <Button bsSize="large" onClick={this.updateUser} bsStyle="success" class="btn btn-primary">
                                Guardar</Button>
                        </Col>

                        <Col md={2} xs={2}>
                            <Button bsSize="large" onClick={this.blockUser} bsStyle="danger" class="btn btn-primary">
                                Bloquear</Button>
                        </Col>
                        <Col md={2} xs={2}>
                            <Button bsSize="large" onClick={this.deleteUser} bsStyle="danger" class="btn btn-primary">
                                Eliminar</Button>
                        </Col>

                    </Row>

                </div>

            </Grid>
        );
    }




}




export default EditUser;                