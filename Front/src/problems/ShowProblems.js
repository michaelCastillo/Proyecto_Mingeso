import React, {Component} from 'react';
import {Button, Grid,Row,Col,Panel,Collapse,Well, Label} from 'react-bootstrap';
import axios from 'axios';
import {bullhorn} from 'react-icons-kit/icomoon/bullhorn';
import {lock} from 'react-icons-kit/icomoon/lock';
import {trashO} from 'react-icons-kit/fa/trashO';
import {ic_unarchive} from 'react-icons-kit/md/ic_unarchive';
import {newspaper} from 'react-icons-kit/icomoon/newspaper';
import {edit} from 'react-icons-kit/fa/edit';
import {publish} from 'react-icons-kit/entypo/publish';
import {ic_code} from 'react-icons-kit/md/ic_code';
import {  Link } from "react-router-dom";
import './ShowProblems.css';


import Icon from 'react-icons-kit';




class ShowProblems extends Component{

    constructor(props){
        super(props);
    
    
        this.state={
            problems:[],
            opened:[],
        }
        this.collapse = this.collapse.bind(this);
    }

    componentDidMount() {
            let global = `http://35.226.163.50:8080/Backend/problems/`;
            let local = `http://localhost:1313/problems`;
            axios.get(local)
                .then(res => {
                    const problems = res.data;
                    //Se asigna falso para opened, para el collapse
                    problems.map( (problem) => {problem.opened = false});
                    this.setState({problems});
                }).catch(error => {
                    console.log(error.response)
                });
        };

        collapse = (id) => () =>{
            console.log("id: "+ id);
            let problems = this.state.problems;
            
            problems.map( (problem, i) => { if(problem.id == id){
                console.log("Are Equals");
                if(problem.opened){ //Si es true
                    console.log("And its opened");
                    problem.opened = false;
                }else{
                    problem.opened = true;
                }
            }
            } );
            this.setState({problems});

        };


        navbarlinks(problemid){
            const role = localStorage.getItem('role');
            
            if (this.props.authenticated   && role == "su") {
                return[
                    <div>
                        
                        <Col md={1} sm={6}>                                    
                        <Button href={`/code/${problemid}`} >
                        A programar! 
                        </Button>
                        </Col>
                        <Col md={1} sm={6} mdOffset={1}>
                        <Icon icon={publish} size={25}/>
                        </Col>
                        <Col md={1} sm={6} >
                                                        
                        </Col>
                        <Col md={1} sm={6}>
                        <Icon icon={trashO} size={25}  style={{color:'#f33'}}  />
                        </Col>  
                            
                    </div>

                    
                ] 
            }

            if (this.props.authenticated   && role == "student") {
                return[
                    <div>
                        <Col md={1} sm={6}>                                    
                        <Button href={`/code/${problemid}`} >
                        A programar! 
                        </Button>
                        </Col>   
                        <Col md={1} sm={6} >
                        <a href={`/problemsProfile/${problemid}`}><span class="glyphicon glyphicon-eye-open"></span></a>
                                                        
                        </Col>  
                    </div>

                    
                ] 
            }

            if (this.props.authenticated   && (role == "teacher" || role ==="coordination")) {
                return[
                    <div>
                      
                        <Col md={1} sm={6} mdOffset={1}>
                        <Icon icon={publish} size={25}/>
                        </Col>
                        <Col md={1} sm={6} >
                        <a href={`/problemsProfile/${problemid}`}><span class="glyphicon glyphicon-eye-open"></span></a>
                        </Col>
                        <Col md={1} sm={6}>
                        <Icon icon={trashO} size={25}  style={{color:'#f33'}}  />
                        </Col>  
                            
                    </div>

                    
                ] 
            }
        }





    render(){
        return(
            <div id="problems" className = "problems">
                <br/>
                <br/>
                <br/>
                <Grid>
                    <Row > 
                        <Col md={12} xs={12}>
                        <h1  className="center"><Label id="title">Problemas a realizar:</Label></h1>
                        </Col>
                    </Row>
                    {

                        /* Aqui se mapean todos los problemas y se envian a la id según corresponda. */ 
                        this.state.problems.map((problem) => {return (
                            <Row className="grid-show">
                                <Col sm ={6} md={12}>
                                    {/* Deberia no ser un boton, sino algo más bonito, ademas faltarian los botones para editar, borrar y 
                                    PUBLICAR! un problema.*/}
                                    <Panel bsStyle="primary" >
                                        <Panel.Heading  style={{background: '#66B3DD'  }}>
                                            {/* Cabecera de cada panel */}
                                            <Row>
                                                <Col md={7} ms={12} onClick={this.collapse(problem.id)}>
                                                    <Panel.Title componentClass="h3">{problem.name}</Panel.Title>
                                                </Col>
                                               {this.navbarlinks(problem.id)}
                                            </Row>
                                        </Panel.Heading>
                                        <Panel.Body>
                                            {console.log("desde: "+problem.opened)}
                                            <Collapse in={problem.opened}>
                                                <div>
                                                    <Well>
                                                        <Label>Dificultad:</Label> {problem.difficulty}
                                                        <br/>
                                                        <br/>
                                                        <Label>Lenguaje:</Label> {problem.language}
                                                        <br/>
                                                        <br/>
                                                        <Label>Enunciado:</Label>
                                                        <br/>
                                                        <br/>
                                                        <Well style={{background:'#c4def6' }}>  
                                                            {problem.statement}
                                                        </Well>    
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

export default ShowProblems;