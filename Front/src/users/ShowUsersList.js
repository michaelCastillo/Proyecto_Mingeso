import React, {Component} from 'react';
import {Button, Grid,Row,Col,Panel,Collapse,Well, Label} from 'react-bootstrap';
import axios from 'axios';
import {trashO} from 'react-icons-kit/fa/trashO';
import {edit} from 'react-icons-kit/fa/edit';
import {publish} from 'react-icons-kit/entypo/publish';
import './ShowUsersList.css';


import Icon from 'react-icons-kit';




class ShowUsersList extends Component{

    constructor(props){
        super(props);
    
    
        this.state={
            users:[],
            opened:[],
        }
        this.collapse = this.collapse.bind(this);
    }
   
    componentDidMount() {
            
            axios.get(`http://46.101.81.136:8181/Backend/users`)
                .then(res => {
                    const users = res.data;
                    //Se asigna falso para opened, para el collapse
                    users.map( (user) => {user.opened = false});
                    this.setState({users});
                    console.log(users);
                }).catch(error => {
                    console.log(error.response)
                });
        };

        collapse = (id) => () =>{
            console.log("id: "+ id);
            let users = this.state.users;
            
            users.map( (user, i) => { if(user.id == id){
                console.log("Are Equals");
                if(user.opened){ //Si es true
                    console.log("And its opened");
                    user.opened = false;
                }else{
                    user.opened = true;
                }
            }
            } );
            this.setState({users});

        };



    render(){
        return(
            <div id="users" className = "users">
                <br/>
                <br/>
                <br/>
                <Grid>
                    <Row > 
                        <Col md={12} xs={12}>
                        <h1  className="center"><Label id="title">Usuarios:</Label></h1>
                        </Col>
                    </Row>
                    {

                        /* Aqui se mapean todos los problemas y se envian a la id según corresponda. */ 
                        this.state.users.map((user) => {return (
                            <Row className="grid-show">
                                <Col sm ={6} md={12}>
                                    {/* Deberia no ser un boton, sino algo más bonito, ademas faltarian los botones para editar, borrar y 
                                    PUBLICAR! un problema.*/}
                                    <Panel bsStyle="primary" >
                                        <Panel.Heading  style={{background: '#66B3DD'  }}>
                                            {/* Cabecera de cada panel */}
                                            <Row>
                                                <Col md={7} ms={12} onClick={this.collapse(user.id)}>
                                                    <Panel.Title componentClass="h3">{user.name}</Panel.Title>
                                                </Col>
                                                
                                                <Col md={1} sm={6} mdOffset={1}>
                                                    <Icon icon={publish} size={25}/>
                                                </Col>
                                                <Col md={1} sm={6} >
                                                    <Icon icon ={edit} size={25} />
                                                    <Button href={`/users/${user.id}`} >
                                                     Visualizar
                                                    </Button>
                                                </Col>
                                                <Col md={1} sm={6}>
                                                    <Icon icon={trashO} size={25}  style={{color:'#f33'}}  />
                                                </Col>  
                                            </Row>
                                        </Panel.Heading>
                                        <Panel.Body>
                                            {console.log("desde: "+user.opened)}
                                            <Collapse in={user.opened}>
                                                <div>
                                                    <Well>
                                                        <Label>E-mail:</Label> {user.email}
                                                        <br/>
                                                        <br/>
                                                        <Label>Roles:</Label> 
                                                        {user.roles.map((rol) => {return (
                                                        rol.role
                                                        );})}
                                                        <br/>
                                                        <br/>
                                                        
                                                           
                                                    </Well>
                                                </div>
                                            </Collapse>
                                        </Panel.Body>
                                    </Panel>
                                </Col>
                            </Row>
                        );})
                    }
                </Grid>
            </div>
        );
    }

    


}

export default ShowUsersList;