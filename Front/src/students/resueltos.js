import React, {Component} from 'react';
import { Grid,Row,Col,Panel,Collapse,Well, Label} from 'react-bootstrap';
import axios from 'axios';


class ShowResueltos extends Component{

    constructor(props){
        super(props);
    
    
        this.state={
            problems:[],
            opened:[],
        }
      
    }

    componentDidMount() {
        const id = localStorage.getItem('userId');
        let global = "http://35.226.163.50:8080/Backend/users/student/" + id + "/getSolvedProblems";
        axios.get(global)
            .then(res => {
                const problems = res.data;
                //Se asigna falso para opened, para el collapse
               // problems.map( (problem) => {problem.opened = false});
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
    render(){
        return(
            <div id="problems" className = "problems">
                <br/>
                <br/>
                <br/>
                <Grid>
                    <Row > 
                        <Col md={12} xs={12}>
                        <h1  className="center"><Label id="title">Mis problemas resueltos:</Label></h1>
                        </Col>
                        <br/>
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

export default ShowResueltos;    