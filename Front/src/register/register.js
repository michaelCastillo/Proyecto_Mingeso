
import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Col, Panel, Checkbox } from "react-bootstrap";
import './register.css'
import axios from 'axios';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
      roles: [],
      coordinations: [],
      classes: [],
      careers: [],
      myCareers: [],
      myRoles: [],
      myCoordinations: [],
      myClasses: [],
      coordinationCode: -1,
      flags: -1,
      flagsCareer: -1
    };
    this.handleName = this.handleName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.generateCareersOptions = this.generateCareersOptions.bind(this);
    this.generateCoordinationOptions = this.generateCoordinationOptions.bind(this);
    this.handleCheckboxCoordinations = this.handleCheckboxCoordinations.bind(this);
    this.generateClassesOptions = this.generateClassesOptions.bind(this);
    this.handleCheckboxClasses = this.handleCheckboxClasses.bind(this);
    this.handleCheckboxCareers = this.handleCheckboxCareers.bind(this);
  }
  
  handleCheckboxCareers(event) {

    let item = event.target.value.split(",");
    let aux = 0;
    this.state.myCareers.forEach(function (career, index, object) {
      if (career.id == item[0]) {
        object.splice(index, 1);
        aux = 1;
      }
    });
    
    if (aux == 0) {
      let career = {
        id: item[0],
        name: item[1]
      };
      this.state.myCareers.push(career);
    }
  }
  handleCheckboxClasses(event) {

    let item = event.target.value.split(",");
    let aux = 0;
    this.state.myClasses.forEach(function (classAux, index, object) {
      if (classAux.id == item[0]) {
        object.splice(index, 1);
        aux = 1;
      }
    });

    if (aux == 0) {
      let classAux = {
        id: item[0],
        code: item[1]
      };
      this.state.myClasses.push(classAux);
    }


  }
  handleCheckboxCoordinations(event) {
    let item = event.target.value.split(",");
    let aux = 0;
    let flagAux = -1;
    this.state.myCoordinations.forEach(function (rol, index, object) {
      if (rol.id == item[0]) {
        object.splice(index, 1);
        aux = 1;
      }
      if ((rol.role === "student") || (rol.role === "teacher")) {
        flagAux = 0;
      }
    });
    if (aux == 0) {
      let coordination = {
        id: item[0],
        code: item[1],
        classes: item[2]
      };
      this.state.coordinationCode = item[0];
      this.state.myCoordinations.push(coordination);
    }
    this.setState({ flags: flagAux });

  }
  generateCareersOptions() {
    let items = [];
    if (this.state.flagsCarreer == 0) {
      let aux = 0;
      items.push(<ControlLabel>Carreras Disponibles</ControlLabel>);


      this.state.careers.map((carreras) => {

        return (
          items.push(<Checkbox
            key={aux++}
            value={[carreras.id, carreras.name]}
            onChange={this.handleCheckboxCareers}> {carreras.name}  </Checkbox>)
        )


      });
    }
    return items;
  }
  generateClassesOptions() {
    let items = [];
    if (this.state.flags == 0) {
      let aux = 0;

      this.state.coordinations.map((coordinations) => {
        if (this.state.coordinationCode == coordinations.id) {
          coordinations.classes.map((coordinationClass) => {

            return (
              items.push(<Checkbox
                key={aux++}
                value={[coordinationClass.id, coordinationClass.code]}
                onChange={this.handleCheckboxClasses}> Codigo: {coordinationClass.code} Sala: {coordinationClass.classRoom}  </Checkbox>)
            )
          });
        }

      });

    }
    


    return items;

  }
  generateCoordinationOptions() {
    let flag = 0;
    let flagCarreer = -1;
    this.state.myRoles.forEach(function (rol, index, object) {
      if (rol.role === "student") {
        flagCarreer = 0;
      }
      if ((rol.role === "student") || (rol.role === "teacher")) {
        flag = 1;
      }
      if (rol.role === "coordination") {
        flag = 2;
      }

    });
    let items = [];
    this.state.flagsCarreer = flagCarreer;

    let aux = 0;

    //Si es Coordinador
    if (flag === 2) {
      items.push(<ControlLabel>Coordinaciones Disponibles</ControlLabel>);
      this.state.coordinations.map((coordination) => {
        items.push(<Checkbox
          key={aux++}
          value={[coordination.id, coordination.code, coordination.classes]}
          onChange={this.handleCheckboxCoordinations}> {coordination.code} </Checkbox>)

      }
      )


    }
    //Si es estudiante
    if (flag === 1) {
      this.state.flags = 0;
      items.push(<ControlLabel>Coordinaciones Disponibles</ControlLabel>);
      this.state.coordinations.map((coordination) => {
        return (
          items.push(<Checkbox
            key={aux++}
            value={[coordination.id, coordination.code, coordination.classes]}
            onChange={this.handleCheckboxCoordinations}> {coordination.code} </Checkbox>)

        )


      });

      items.push(<ControlLabel>Clases Disponibles</ControlLabel>);
    }

    return items;

  }
  handleCheckbox(event) {
    let item = event.target.value.split(",");
    let aux = 0;
    this.state.myRoles.forEach(function (rol, index, object) {
      if (rol.id == item[0]) {
        object.splice(index, 1);
        aux = 1;
      }
    });

    if (aux == 0) {
      let rol = {
        id: item[0],
        role: item[1]
      };
      this.state.myRoles.push(rol);
    }
    this.generateCoordinationOptions();
    this.forceUpdate();


  }



  createSelectOptions() {
    let items = [];
    let aux = 0;
    this.state.roles.map((role) => {
      return (
        items.push(<Checkbox
          key={aux++}
          value={[role.id, role.role]}
          onChange={this.handleCheckbox}> {role.role} </Checkbox>)
      )
    });
    return items;
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  };

  handleEmail(event) {
    this.setState({ email: event.target.value });
  };

  handlePassword(event) {

    this.setState({ password: event.target.value });
  };

  handleConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  componentDidMount() {
    axios.get(`http://35.226.163.50:8080/Backend/roles/`)
      .then(res => {
        const roles = res.data;
        //Se asigna falso para opened, para el collapse
        roles.map((role) => { role.opened = false });
        this.setState({ roles });
      }).catch(error => {
        console.log(error.response)
      });
    axios.get(`http://35.226.163.50:8080/Backend/coordinations/`)
      .then(res => {
        const coordinations = res.data;
        //Se asigna falso para opened, para el collapse

        this.setState({ coordinations });
      }).catch(error => {
        console.log(error.response)
      });
    axios.get(`http://35.226.163.50:8080/Backend/classes/`)
      .then(res => {
        const classes = res.data;
        //Se asigna falso para opened, para el collapse

        this.setState({ classes });
      }).catch(error => {
        console.log(error.response)
      });
    axios.get(`http://35.226.163.50:8080/Backend/careers/`)
      .then(res => {
        const careers = res.data;
        //Se asigna falso para opened, para el collapse

        this.setState({ careers });
      }).catch(error => {
        console.log(error.response)
      });
  };


  handleRegister = (event) => {
    event.preventDefault();
    const user = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      roles: this.state.myRoles,
      careers: this.state.myCareers,
      coordCoordinations: this.state.myCoordinations,
      classes_teachers: this.state.myClasses,
      classes_students: []
    };
    console.log(user);
    

    const url = 'http://35.226.163.50:8080/Backend/users/create';
    axios.post(url, user)
      .then(res => {
        let userResponse = res.data;
        alert("Usuario agregado exitosamente!");
      }).catch(error => {
        alert("Error");
        console.log(error.response);
        console.log(error.request);
        console.log(error.message);
      });
    
  };

  validForm = (nam, pass) => () => {
    var txt;
    var r
    console.log("name: " + nam);
    console.log("password: " + pass);
    let users = this.state.users;

    users.map((user, i) => {
      if ((user.name == nam) && (user.password == pass)) {
        console.log("nombre: " + user.name);
        console.log("pass: " + user.password);
        r = window.confirm("Presione aceptar para comenzar!");
        if (r == true) {
          window.location.href = 'problems/show';
        } else {
          console.log("Error");
          window.location.href = '/login';
        }
        if (user.opened) { //Si es true
          console.log("And its opened");
          user.opened = false;
        } else {
          user.opened = true;
        }
      }
    });
    this.setState({ users });

  };

  render() {
    return (
      <div className="Register"  >
        <row>


          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="name" bsSize="large">
              <ControlLabel>Nombre</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.name}
                onChange={this.handleName}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Contraseña</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handlePassword}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="confirm password" bsSize="large">
              <ControlLabel>Confirmar contraseña</ControlLabel>
              <FormControl
                value={this.state.confirmPassword}
                onChange={this.handleConfirmPassword}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>E-mail</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.email}
                onChange={this.handleEmail}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel> Rol </ControlLabel>
              {this.createSelectOptions()}

            </FormGroup>
            <FormGroup>

              {this.generateCareersOptions()}

            </FormGroup>
            <FormGroup>

              {this.generateCoordinationOptions()}

            </FormGroup>
            <FormGroup>

              {this.generateClassesOptions()}

            </FormGroup>


            <Button
              type="success" onClick={this.handleRegister}
            >
              Registrar
                </Button>

          </form>

        </row>

      </div>


    );


  }
}


export default Register;