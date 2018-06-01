import React, { Component } from 'react';
import {Navbar,NavItem,MenuItem,Nav,NavDropdown} from 'react-bootstrap'
import {  Link } from "react-router-dom";
import imagen from './computer_77914.png';
import './HeaderUp.css';

class HeaderUp extends Component {


    render() {
        return (
            <Navbar inverse collapseOnSelect  style={{ background:'#1D2D44', height: 90}}>
                <Navbar.Header>
                <Navbar.Brand>
                <a  href="/home">
                <img border="10" style={{marginLeft:-60 ,marginTop:-15, width: 80, height: 80}} src={imagen} alt=""/></a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav>
                    <NavDropdown eventKey={3}  title="Problemas" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} href='/problems/create'>Crear</MenuItem>
                    <MenuItem eventKey={3.2} href='/problems/show'>Administrar</MenuItem>
                    <MenuItem eventKey={3.3} href='/problems/misAportes'>Mis Aportes</MenuItem>
                    <MenuItem eventKey={3.4} href='/problems/generales'>Generales</MenuItem>
                    {/*<MenuItem divider />*/}
                    </NavDropdown>
                    <NavItem eventKey={4} href="/Alumnos">
                     Alumnos
                    </NavItem>
                    <NavItem eventKey={5} href="/Profesores">
                     Profesores
                    </NavItem>

                    <NavDropdown eventKey={6}  title="Soluciones" id="basic-nav-dropdown">
                    <MenuItem eventKey={6.1} href='/soluciones/enproceso'>En proceso</MenuItem>
                    <MenuItem eventKey={6.2} href='/soluciones/misSoluciones'> Mis soluciones</MenuItem>
                    </NavDropdown>
                </Nav>
                
                <Nav pullRight>
                    <NavItem eventKey={1} style={{background:'#37d67a0'}} href="/login">
                    Ingresar
                    </NavItem>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }


}

export default HeaderUp;