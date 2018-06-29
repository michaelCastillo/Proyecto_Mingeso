import React, { Component } from 'react';
import {Tab, Col, Nav, NavItem, ListGroup, ListGroupItem, Label, Button, Glyphicon} from "react-bootstrap";
import axios from 'axios';
import './profile.css'

class Perfil extends Component
{
  constructor(props)
  {
    super(props);
    this.state=
    {
        users: [],
        roles: [],
        problems: [],
        sections: [],
        solutions: [],
    }
  }

  componentDidMount()
  {
    axios.get(`http://46.101.81.136:8181/Backend/users/` + this.props.match.params.id)
      .then(res => {
        const users2 = res.data;
        //console.log(users2);
        const roles2 = res.data.roles;
        const problems2 = res.data.problems;
        const sections2 = res.data.sections;
        const solutions2 = res.data.solutions;
        this.setState({users:users2, roles:roles2, problems:problems2, sections:sections2, solutions:solutions2});
      })
  }

  render() 
  {
        return(
          <section id="paginaPerfil">
            <section id="opciontesIzq">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Col sm={2}>
                  <Nav bsStyle="pills" stacked>
                    <NavItem href='/problems/show'>
                      <Glyphicon id="imagenOpciones" glyph="file" />
                      {" Problemas"}
                    </NavItem>
                    <NavItem href='/solutions'>
                      <Glyphicon id="imagenOpciones" glyph="book" />
                      {" Soluciones"}
                    </NavItem>
                  </Nav>
                </Col>
              </Tab.Container>
            </section>
            <section id="cuadroDatos">
              <ListGroup>
                <ListGroupItem bsStyle="info">
                  <Label bsStyle="info">Nombre</Label>
                  <p id="informacion">{this.state.users.name}</p>
                </ListGroupItem>
                <ListGroupItem bsStyle="info">
                  <Label bsStyle="info">E-mail</Label>
                  <p id="informacion">{this.state.users.email}</p>
                </ListGroupItem>
                <ListGroupItem bsStyle="info">
                  <Label bsStyle="info">Categoria</Label>
                  {this.state.roles.map((data) => {return (<p id="informacion">{data.role}</p>);})}
                </ListGroupItem>
                <ListGroupItem bsStyle="info">
                  <Label bsStyle="info">Secciones</Label>
                  {this.state.sections.map((data) => {return (<p id="informacion">{data.code}</p>);})}
                </ListGroupItem>
              </ListGroup>
            </section>
          </section>
        );
  }
}

export default Perfil;