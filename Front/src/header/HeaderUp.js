import React, { Component } from 'react';
import {Navbar,NavItem,MenuItem,Nav,NavDropdown} from 'react-bootstrap'
import imagen from './computer_77914.png';
import { Row, Col} from 'react-bootstrap';

import { connect } from 'react-redux';


class HeaderUp extends Component {



    
    navbarLinks() {
      const role = localStorage.getItem('role');
      
        if (this.props.authenticated   && role === "su") {
          
          return [
            
            <div>
              <Row>
          <Col md={11} xs={3} >      
            <Nav>
                <NavDropdown eventKey={3}  title="Problemas" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1} href='/problems/create'>Crear</MenuItem>
                <MenuItem eventKey={3.2} href='/problems/show'>Administrar Problemas</MenuItem>
                <MenuItem eventKey={3.3} href='/problems/misAportes'>Mis Aportes</MenuItem>
                <MenuItem eventKey={3.4} href='/problems/generales'>Generales</MenuItem>
                {/*<MenuItem divider />*/}
                </NavDropdown>
                <NavItem eventKey={4} href="/alumnos">
                 Alumnos
                </NavItem>
                <NavItem eventKey={5} href="/Profesores">
                 Profesores
                </NavItem>

                <NavDropdown eventKey={6}  title="Soluciones" id="basic-nav-dropdown">
                <MenuItem eventKey={6.1} href='/soluciones/enproceso'>En proceso</MenuItem>
                <MenuItem eventKey={6.2} href='/soluciones/misSoluciones'> Mis soluciones</MenuItem>
                </NavDropdown>
                <NavItem eventKey={7} href="/users/showlist">
                 Administrar usuarios
                </NavItem>
            </Nav>

            
            
            <Nav pullRight>
             
                <NavItem eventKey={2} style={{background:'#37d67a0'}} href="/signout" >
                Salir({role})
                </NavItem>
            </Nav>
          </Col> 
          </Row> 
           </div>
          ];
        }

        if (this.props.authenticated && role === 'student'  ) {
          console.log(role);
          return [
            <div>
          <Row>
          <Col md={11} xs={3} >      
            <Nav>
                <NavDropdown eventKey={3}  title="Problemas" id="basic-nav-dropdown">
                <MenuItem eventKey={3.2} href='/problems/show'>Problemas a resolver</MenuItem>
                {/*<MenuItem divider />*/}
                </NavDropdown>
                <NavDropdown eventKey={6}  title="Soluciones" id="basic-nav-dropdown">
                <MenuItem eventKey={6.1} href='/soluciones/enproceso'>En proceso</MenuItem>
                <MenuItem eventKey={6.2} href='/soluciones/misSoluciones'> Mis soluciones</MenuItem>
                </NavDropdown>
            </Nav>
            
            <Nav pullRight>
                
                <NavItem eventKey={2} style={{background:'#37d67a0'}} href="/signout" >
                Salir(Estudiante)
                </NavItem>
            </Nav>
            </Col>
            </Row>
           </div>
          ];
        }

        if (this.props.authenticated   && role === "teacher") {
          console.log(role);
          return [
            <div>
            <Row>
            <Col md={11} xs={3} >           
            <Nav>
                <NavDropdown eventKey={3}  title="Problemas" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1} href='/problems/create'>Crear</MenuItem>
                <MenuItem eventKey={3.2} href='/problems/show'>Administrar Problemas</MenuItem>
                <MenuItem eventKey={3.3} href='/problems/misAportes'>Mis Aportes</MenuItem>
                <MenuItem eventKey={3.4} href='/problems/generales'>Generales</MenuItem>
                {/*<MenuItem divider />*/}
                </NavDropdown>
                <NavItem eventKey={4} href="/alumnos">
                 Alumnos
                </NavItem>
                
            </Nav>
            
            <Nav pullRight>
                <NavItem eventKey={2} style={{background:'#37d67a0'}} href="/signout" >
                Salir (Profesor)
                </NavItem>
            </Nav>
            </Col>
            </Row>
           </div>
          ];
        }

        if (this.props.authenticated   && role === "coordination") {
          
          return [
            
            <div>

              <Row>
              <Col md={11} xs={3} >           
            <Nav>
                <NavDropdown eventKey={3}  title="Problemas" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1} href='/problems/create'>Crear</MenuItem>
                <MenuItem eventKey={3.2} href='/problems/show'>Administrar Problemas</MenuItem>
                <MenuItem eventKey={3.3} href='/problems/misAportes'>Mis Aportes</MenuItem>
                <MenuItem eventKey={3.4} href='/problems/generales'>Generales</MenuItem>
                {/*<MenuItem divider />*/}
                </NavDropdown>
                <NavItem eventKey={4} href="/alumnos">
                 Alumnos
                </NavItem>
                <NavItem eventKey={5} href="/Profesores">
                 Profesores
                </NavItem>
                
            </Nav>
            
            <Nav pullRight>
                <NavItem eventKey={2} style={{background:'#37d67a0'}} href="/signout" >
                Salir (Coordinación)
                </NavItem>
            </Nav>
            </Col>
            </Row>
           </div>
          ];
        }

        
        
        return [
          
            
        ];
      }











    render() {


        
        return (
            
            <div className="container">
            <Navbar inverse collapseOnSelect  style={{ background:'#1D2D44', height: 90}}>
            <Navbar.Header>
            <Navbar.Brand>
            <a  href="/dashboard">
            <img border="10" style={{marginLeft:-60 ,marginTop:-15, width: 80, height: 80}} src={imagen} alt=""/></a>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <ul>
              {this.navbarLinks()}
            </ul>  
              </Navbar.Collapse>
             </Navbar>
          </div>

        );
    }


}




function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    };
  }
  
  export default connect(mapStateToProps)(HeaderUp);