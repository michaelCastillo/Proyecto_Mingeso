
import React, { Component } from 'react';
import { ControlLabel,Button, FormGroup,FormControl,Form,Col,Tooltip,OverlayTrigger,Label } from 'react-bootstrap';
import axios from 'axios';
//import AddReturn from './AddReturn';
//import AddParameter from './AddParameter';
import Tests from './tests/Tests';
import {arrowLeftLight} from 'react-icons-kit/metrize/arrowLeftLight'
import Icon from 'react-icons-kit';
import {buttonQuestion} from 'react-icons-kit/metrize/buttonQuestion'
import ReactLoading from "react-loading";



class CreateProblem extends Component{


    constructor(props){
        super(props);
        this.tests = React.createRef();
        

        this.state = {

            statement : '',
            difficulty: 0,
            language: 'python',
            name:'',
            parameters:[],
            returns:[],
            ready:true

        };
        this.handleDifficulty = this.handleDifficulty.bind(this);
        this.handlerStatement = this.handlerStatement.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
    }

    post_create(event) {
        if(this.state.statement == '' || this.state.name == ''){
            alert("Ingrese título y/o descripción de la Encuesta");
        }
        else{
        var res = window.confirm("¿Desea publicar el problema?");    
        if(res===true){
        //Se toman las tuplas de las pruebas
        this.setState({ready:false});
        var tuples =this.tests.current.state.tuples;
        var parameters =[];
        var returns =[];
        tuples.map((tuple) =>{
            parameters.push({name:tuple.current.state.in, hidden:tuple.current.state.hidden});
            returns.push({name:tuple.current.state.out,hidden:tuple.current.state.hidden});
        });
        
        event.preventDefault();
        const problem = {
            statement : this.state.statement,
            difficulty : this.state.difficulty,
            language: this.state.language, 
            name: this.state.name,
            parameters: parameters,
            returns: returns,
        };
        console.log(this.state.ready);
        //1const url = `http://46.101.81.136:8181/Backend/problems/1/createProblem`;

        const gc = `http://35.226.163.50:8080/Backend`;
        const local = `http://localhost:1313`
        const url = gc+`/problems/create/`+localStorage.getItem('userId');
        console.log(url);
        axios.post(url,problem)
        .then(res => {
            //Se toma la id del problema.
            this.state.ready=true;
            var id_problem = res.data.id;
            alert("Se ha agregado el problema junto con sus parametros y retornos.");

            window.location.href="/problems/show";
           
        }).catch(error => {
            alert("Error");
            console.log(error.response);
            alert(error.response);
            return -1;
        });
        }
    }
        
    }

    handleDifficulty(event){

        this.setState({difficulty: event.target.value});
    }

    handlerStatement(event){

        this.setState({statement: event.target.value});
    }

    handleLanguage(event){
        this.setState({language: event.target.value});
    }
    handleTitle(event){
        this.setState({name: event.target.value});
    }




    render(){

        const tooltip = (
            <Tooltip id="tooltip">
              <strong>
              0:baja
              1:media
              2:alta       
              </strong> 
            </Tooltip>
        );

        const tooltip1 = (
            <Tooltip id="tooltip1">
              <strong>
              Aquí puedes publicar un problema nuevo rellenando el formulario
              ,incluyendo sus parámetro(s) de entrada y salida.    
              </strong> 
            </Tooltip>
        );
       

        if(this.state.ready === false){
          

            return(

                <div>    
                <Col md={1} sm={2} smOffset = {4}>
                <h3>
                <Label> Publicando...</Label>
                </h3>  
                </Col>
                <br/>
                <br/>
                <br/>
                <br/>
                <Col md={1} sm={4} smOffset = {4}>   
                <ReactLoading type={"spin"} color={"#2876e1"} height={100} width={200} />
                </Col>
                </div>    
            )


        }
        return(
        <div> 


        <Col md={1} sm={4} >
            <a href={`/problems/show`}> <Icon icon={arrowLeftLight} size={25}  style={{color:'#415171'}} /></a>                                
        </Col>

         <Col md={1} sm={4} smOffset = {9}>   
         <OverlayTrigger placement="left" overlay={tooltip1}>
            <Icon icon={buttonQuestion} size={25}  style={{color:'#2f2f37'}}  />
         </OverlayTrigger>
         </Col>

        <br/>
        <br/>
        <br/>
        <Form onSubmit = {this.post_create.bind(this)}> 

            <FormGroup controlId="name"  bsSize="large">
                 <ControlLabel>Título</ControlLabel>
                 <FormControl
                            type="text"
                            value={this.state.name}
                            placeholder="Título del problema"
                            onChange={this.handleTitle}
                        />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Lenguaje </ControlLabel>
                <FormControl
                    onChange={this.handleLanguage}
                    componentClass="select"
                    value={this.state.language}
                >
                    <option value="python"> python </option>
                    <option value="c"> C </option>
                    <option value="java"> java </option>
                    
                </FormControl>  
            </FormGroup>
                <OverlayTrigger placement="right" overlay={tooltip}>
                <ControlLabel>Dificultad</ControlLabel>
                </OverlayTrigger>
                <FormControl
                    type="number"
                    min={0} max={10}
                    value={this.state.difficulty}
                    placeholder="Ingrese dificultad"
                    onChange={this.handleDifficulty}
                />


            <FormGroup>
                <ControlLabel>Enunciado</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Ingrese el enunciado" value={this.state.statement} 
                   onChange={this.handlerStatement} />
            </FormGroup>
            <br/>
            <Tests ref ={this.tests}/>
            <br/>
            <br/>
            <br/>
            <Col md={12} xs={12} smOffset={5}>
            <Button bsStyle="info" onClick={this.post_create.bind(this)}>Publicar</Button>
            </Col>
            <br/>
            <br/>
            <br/>
        </Form>
        </div>
        );
    }
}

export default CreateProblem;
/*
    <AddParameter ref = {this.parameters}/>



    <AddReturn ref = {this.returns}/>           */