import React, { Component } from 'react';
import { Button, Grid, Row, Col, Panel, Collapse, Well, Label, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';
import axios from 'axios';
import { trashO } from 'react-icons-kit/fa/trashO';
import { edit } from 'react-icons-kit/fa/edit';
import { publish } from 'react-icons-kit/entypo/publish';
import './ShowUsersList.css';


import Icon from 'react-icons-kit';




class ShowUsersList extends Component {

    constructor(props) {
        super(props);


        this.state = {
            orderBy: "name",
            descending: true,
            users: [],
            originalUsers: [],
            usersSections: [],
            usersRoles: [],
            opened: [],
            sections: [],
            roles: [],
        }
        this.collapse = this.collapse.bind(this);
        this.orderList = this.orderList.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.compare = this.compare.bind(this);
        this.createSectionsOptions = this.createSectionsOptions.bind(this);
        this.createRoleOptions = this.createRoleOptions.bind(this);
        this.selectSection = this.selectSection.bind(this);
        this.selectRole = this.selectRole.bind(this);
        this.usersArray = this.usersArray.bind(this);
    }

    componentDidMount() {

        axios.get(`http://35.226.163.50:8080/Backend/users`)
            .then(res => {
                const users = res.data;
                //Se asigna falso para opened, para el collapse
                users.map((user) => { user.opened = false });
                users.sort(this.compare);
                this.setState({ users });
                this.setState({ originalUsers: this.state.users });
                this.setState({ usersRoles: this.state.users });
                this.setState({ usersSections: this.state.users });
            }).catch(error => {
                console.log(error.response)
            });
        axios.get(`http://35.226.163.50:8080/Backend/sections/`)
            .then(res => {
                const sections = res.data;
                //Se asigna falso para opened, para el collapse
                sections.map((section) => { section.opened = false });
                this.setState({ sections });
            }).catch(error => {
                alert("Error con conexion a base de datos de secciones");
                console.log(error.response)
            });
        axios.get(`http://35.226.163.50:8080/Backend/roles`)
            .then(res => {
                const roles = res.data;
                //Se asigna falso para opened, para el collapse
                roles.map((role) => { role.opened = false });
                this.setState({ roles });
            }).catch(error => {
                console.log(error.response)
            });
    };

    collapse = (id) => () => {
        let users = this.state.users;

        users.map((user, i) => {
            if (user.id == id) {
                if (user.opened) { //Si es true
                    user.opened = false;
                } else {
                    user.opened = true;
                }
            }
        });
        this.setState({ users });

    }

    usersArray(){
        let userAux = [];
        console.log(this.state.usersSections.length);        
        for(var i = 0; i<this.state.usersSections.length; i++){
            for(var j = 0; j<this.state.usersRoles.length; j++){
                if (this.state.usersSections[i].id == this.state.usersRoles[j].id){
                    userAux.push(this.state.usersSections[i]);
                    break;
                }
                
            }
        }
        userAux.sort(this.compare);          
        this.setState({users: userAux});
    }

    selectRole(event) {
        let userAux = [];
        this.state.originalUsers.map((user) => {
            if (event.target.value != "all") {
                user.roles.map((role) => {
                    if(role.id == event.target.value){
                        userAux.push(user);
                    }
                });
                this.state.usersRoles=userAux;
            } else {
                this.state.usersRoles=this.state.originalUsers;
            }
        });
        this.usersArray();
    }
    
    selectSection(event) {
        let userAux = [];
        this.state.originalUsers.map((user) => {
            if (event.target.value != "all") {
                if(user.sections){
                    user.sections.map((section) => {
                        if(section.id == event.target.value){
                            userAux.push(user);
                        }
                    });
                    this.state.usersSections=userAux;
                }
                
            } else {
                this.state.usersSections=this.state.originalUsers;
            }
        });
        this.usersArray();
    }
    createRoleOptions() {
        let items = [];
        let aux = 0;
        this.state.roles.map((role) => {
            return (
                items.push(<option
                    key={aux++}
                    value={role.id}
                    onChange={this.handleShowSections}> {role.role} </option>)
            )
        });
        return items;
    }

    createSectionsOptions() {
        let items = [];
        let aux = 0;
        if(this.state.sections){
            this.state.sections.map((section) => {
                return (
                    items.push(<option
                        key={aux++}
                        value={section.id}
                        onChange={this.handleShowSections}> {section.code} </option>)
                )
            });
        }
        
        return items;
    }

    compare(a, b) {
        if (this.state.orderBy == "name") {
            if (this.state.descending == true) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        }
        if (this.state.orderBy == "email") {
            if (this.state.descending == true) {
                if (a.email.toLowerCase() < b.email.toLowerCase()) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                if (a.email.toLowerCase() < b.email.toLowerCase()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        }
        if (this.state.orderBy == "timestamp") {
            if (this.state.descending == true) {
                if (a.id < b.id) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                if (a.id < b.id) {
                    return 1;
                } else {
                    return -1;
                }
            }
        }

        return 0;
    }
    orderList(event) {
        this.state.orderBy=event.target.value;
        this.setState({ users: this.state.users.sort(this.compare) });
    }
    handleCheckbox() {
        this.state.descending=!this.state.descending;
        this.setState({ users: this.state.users.sort(this.compare) });
    }



    render() {
        return (
            <div id="users" className="users">
                <br />
                <br />
                <br />
                <Grid>
                    <Row >
                        <Col md={12} xs={12}>
                            <h1 className="center"><Label id="title">Usuarios:</Label></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} xs={4}>
                            <h3>
                                <ControlLabel>Ordenar por: </ControlLabel>
                                <FormControl componentClass="select" placeholder="select" onChange={this.orderList}>
                                    <option value="name">Nombre</option>
                                    <option value="email">E-Mail</option>
                                    <option value="timestamp">Fecha de Ingreso</option>
                                </FormControl>
                            </h3>
                            <h4>
                                <Checkbox onChange={this.handleCheckbox}> Descendente </Checkbox>
                            </h4>
                        </Col>
                        <Col md={4} xs={4}>
                            <h3>
                                <ControlLabel>Seccion: </ControlLabel>
                                <FormControl componentClass="select" placeholder="select" onChange={this.selectSection}>
                                    <option selected="true" value="all">Todas</option>
                                    {this.createSectionsOptions()}
                                </FormControl>
                            </h3>
                        </Col>
                        <Col md={4} xs={4}>
                            <h3>
                                <ControlLabel>Rol: </ControlLabel>
                                <FormControl componentClass="select" placeholder="select" onChange={this.selectRole}>
                                    <option selected="true" value="all">Cualquiera</option>
                                    {this.createRoleOptions()}
                                </FormControl>
                            </h3>
                        </Col>
                        
                    </Row>
                    <ControlLabel>Mostrando {this.state.users.length} usuario/s</ControlLabel>
                    
                    <br />
                    <br />
                    <br />
                    {

                        /* Aqui se mapean todos los problemas y se envian a la id según corresponda. */
                        this.state.users.map((user) => {
                            return (
                                <Row className="grid-show">
                                    <Col sm={6} md={12}>
                                        {/* Deberia no ser un boton, sino algo más bonito, ademas faltarian los botones para editar, borrar y 
                                    PUBLICAR! un problema.*/}
                                        <Panel bsStyle="primary" >
                                            <Panel.Heading style={{ background: '#66B3DD' }}>
                                                {/* Cabecera de cada panel */}
                                                <Row>
                                                    <Col md={9} ms={12} onClick={this.collapse(user.id)}>
                                                        <img src={"https://api.adorable.io/avatars/30/"+user.name+"@adorable.png"} alt="" class="img-rounded img-responsive" />
                                                            
                                                            <Panel.Title  componentClass="h1">{user.name}</Panel.Title>
                                                    </Col>

                                                    
                                                    <Col md={1} sm={6} >
                                                        <h1><a href={`/users/${user.id}`}><span class="glyphicon glyphicon-eye-open"></span></a>
                                                        </h1>
                                                    </Col>
                                                    
                                                </Row>
                                            </Panel.Heading>
                                            <Panel.Body>
                                                <Collapse in={user.opened}>
                                                    <div>
                                                        <Well>
                                                            <Label>E-mail:</Label> {user.email}
                                                            <br />
                                                            <br />
                                                            <Label>Roles:</Label>
                                                            {user.roles.map((rol) => {
                                                                return (
                                                                    rol.role
                                                                );
                                                            })}
                                                            <br />
                                                            <br />


                                                        </Well>
                                                    </div>
                                                </Collapse>
                                            </Panel.Body>
                                        </Panel>
                                    </Col>
                                </Row>
                            );
                        })
                    }
                </Grid>
            </div>
        );
    }




}

export default ShowUsersList;