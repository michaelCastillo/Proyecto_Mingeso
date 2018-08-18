
import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, Label, ListGroup, ListGroupItem } from 'react-bootstrap';

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
            careers: [],
            cordinations: [],
            studentClasses: [],
            teacherClasses: [],
        };
        this.showSection = this.showSection.bind(this);
        this.showRole = this.showRole.bind(this);
        this.handleState = this.handleState.bind(this);
        this.showCoordinations = this.showCoordinations.bind(this);
        this.showClassesStudent = this.showClassesStudent.bind(this);
        this.showClassesTeacher = this.showClassesTeacher.bind(this);
        this.showCareers = this.showCareers.bind(this);

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
                    roles: user.roles,
                    careers: user.careers,
                    cordinations: user.coordCoordinations,
                    studentClasses: user.classes_students,
                    teacherClasses: user.classes_teachers
                });
                console.log(user);
            }).catch(error => {
                console.log(error.response);
            });
    }
    showCareers(){
        let items = [];
        if(this.state.careers.length>0){
            items.push(<Label bsStyle="info">Carrera</Label>);
            this.state.careers.map((careersAux) => {
                items.push(<ListGroupItem bsStyle="info"> {careersAux.name} </ListGroupItem>);
            });
        }
        
        return items;
    }
    showSection() {
        let items = [];
        if(this.state.sections){
            this.state.sections.map((section) => {
                items.push(<ListGroupItem bsStyle="info"> {section.code} </ListGroupItem>);
            });
        }
        
        return items;
    }
    showClassesStudent() {
        let items = [];
        if(this.state.studentClasses.length>0){
            items.push(<Label bsStyle="info">Clases</Label>);
            this.state.studentClasses.map((myClass) => {
                items.push(<ListGroupItem bsStyle="info"> {myClass.classRoom} </ListGroupItem>);
            });
        }
        
        return items;
    }
    showClassesTeacher() {
        let items = [];
        if(this.state.teacherClasses.length>0){
            items.push(<Label bsStyle="info">Clases a cargo</Label>);
            this.state.teacherClasses.map((myClass) => {
                items.push(<ListGroupItem bsStyle="info"> {myClass.classRoom} </ListGroupItem>);
            });
        }
        
        return items;
    }
    showCoordinations() {
        let items = [];
        if(this.state.cordinations.length>0){
            items.push(<Label bsStyle="info">Coordinaciones a cargo</Label>);
            this.state.cordinations.map((coord) => {
                items.push(<ListGroupItem bsStyle="info"> {coord.code} </ListGroupItem>);
            });
        }
        
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
                                    <Label bsStyle="info">Roles</Label></h3>
                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.showRole()}
                                    </ListGroup>
                                </h4>
                                <br />

                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.showCoordinations()}
                                    </ListGroup>
                                </h4>
                                <br />

                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.showCareers()}
                                    </ListGroup>
                                </h4>
                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.showClassesStudent()}
                                    </ListGroup>
                                </h4>
                                <br />

                                <br />
                                <h4>
                                    <ListGroup>
                                        {this.showClassesTeacher()}
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