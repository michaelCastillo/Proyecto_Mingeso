import React, {Component} from 'react';
import {Button, Grid,Row,Col,Panel,Collapse,Well, Label,OverlayTrigger,Tooltip} from 'react-bootstrap';
import axios from 'axios';
import {trashO} from 'react-icons-kit/fa/trashO';
import {publish} from 'react-icons-kit/entypo/publish';
import {info} from 'react-icons-kit/icomoon/info'
import './ShowProblems.css';
import ReactLoading from "react-loading";
import {buttonQuestion} from 'react-icons-kit/metrize/buttonQuestion'



import Icon from 'react-icons-kit';




class ShowProblems extends Component{

    constructor(props){
        super(props);
    
    
        this.state={
            problems:[],
            opened:[],
            ready:false,
        }
        this.collapse = this.collapse.bind(this);
    }

    componentDidMount() {
            let global = `http://35.226.163.50:8080/Backend/problems/`;
            let local = `http://localhost:1313/problems`;
            axios.get(global)
                .then(res => {
                    const problems = res.data;
                    //Se asigna falso para opened, para el collapse
                    problems.map( (problem) => {problem.opened = false});
                    this.setState({problems,ready:true});
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
            
            if (this.props.authenticated   && role === "su") {
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

            if (this.props.authenticated   && role === "student") {
                const tooltip = (
                    <Tooltip id="tooltip">
                      <strong>Resumen problema</strong>
                    </Tooltip>
                  ); 
                return[
                    <div>
                        <Col md={1} sm={6}>                                    
                        <Button href={`/code/${problemid}`} >
                        A programar! 
                        </Button>
                        </Col>   
                        <Col md={1} sm={4} smOffset = {1} >
                        <OverlayTrigger placement="top" overlay={tooltip}>
                        <a href={`/problemsProfile/${problemid}`}> <Icon icon={info} size={25}  style={{color:'#415171'}} /></a>
                        </OverlayTrigger>                                
                        </Col>  
                    </div>

                    
                ] 
            }

            if (this.props.authenticated   && (role === "teacher" || role ==="coordination")) {
                const tooltip = (
                    <Tooltip id="tooltip">
                      <strong>Resumen problema</strong>
                    </Tooltip>
                  ); 
                  const tooltip1 = (
                    <Tooltip id="tooltip">
                      <strong>Eliminar problema</strong>
                    </Tooltip>
                  ); 

                  const tooltip2 = (
                    <Tooltip id="tooltip">
                      <strong>Publicar problema</strong>
                    </Tooltip>
                  );

                return[
                    <div>
                      
                        <Col md={1} sm={6} mdOffset={1}>
                        <OverlayTrigger placement="top" overlay={tooltip2}>
                        <Icon icon={publish} size={25}/>
                        </OverlayTrigger>
                        </Col>
                        <Col md={1} sm={6} >
                        <OverlayTrigger placement="top" overlay={tooltip}>
                        <a href={`/problemsProfile/${problemid}`}><Icon icon={info} size={25}  style={{color:'#415171'}} /></a>
                        </OverlayTrigger>
                        </Col>
                        <Col md={1} sm={6}>
                        <OverlayTrigger placement="top" overlay={tooltip1}>
                        <Icon icon={trashO} size={25}  style={{color:'#f33'}}  />
                        </OverlayTrigger>
                        </Col>  
                            
                    </div>

                    
                ] 
            }
        }





    render(){
        console.log(this.state.problems.length );
        const tooltip1 = (
            <Tooltip id="tooltip">
              <strong>Aquí puedes conocer todos los problemas que se encuentran disponibles,
                      si deseas conocer más sobre cada uno, puedes presionar el icono a la derecha  
                      del mismo o bien presionar su título.      
              </strong>
            </Tooltip>
          );
        if(this.state.ready === false ){
            return (
                <Col md={12} xs={12} smOffset={4}>
                <ReactLoading type={"spin"} color={"#428cf3"} height={500} width={300} />
                </Col>
            );

        }
        else{

            if(this.state.problems.length === 0){

            return(

                <div>

                <Col md={12} xs={12}>
                        <h1  className="center"><Label id="title">No hay problemas disponibles:</Label></h1>
                        </Col>

               </div>     


            )
             }

            else{
                return(
                    <div id="problems" className = "problems">
                    
                    <br/>
                    <Grid>
                        <Row >

                        <Col md={1} sm={6} smOffset={10}>
                        <OverlayTrigger placement="left" overlay={tooltip1}>
                        <Icon icon={buttonQuestion} size={25}  style={{color:'#2f2f37'}}  />
                        </OverlayTrigger>
                        </Col>       
            
                        <Col md={12} xs={12}>                       
                        <h1  className="center"><Label id="title">Problemas a realizar:</Label></h1>
                        </Col>
                        </Row>
                        <br/>
                        <br/>
                        <br/>
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
                                                    <Panel.Title toggle componentClass="h3">{problem.name}</Panel.Title>
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
    }

    


}

export default ShowProblems;