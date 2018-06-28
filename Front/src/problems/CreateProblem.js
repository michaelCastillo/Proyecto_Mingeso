
import React, { Component } from 'react';
import { ControlLabel,Grid, Row, Col, Label, FormGroup,FormControl,MenuItem,DropdownButton,Form } from 'react-bootstrap';
import axios from 'axios';
import AddReturn from './AddReturn';
import AddParameter from './AddParameter';

class CreateProblem extends Component{


    constructor(props){
        super(props);
        this.parameters = React.createRef();
        this.returns = React.createRef();

        this.state = {

            statement : '',
            difficulty: 0,
            language: 'python',
            name:'',
            parameters:[],
            returns:[],
        };
        this.handleDifficulty = this.handleDifficulty.bind(this);
        this.handlerStatement = this.handlerStatement.bind(this);
        this.handleLanguage = this.handleLanguage.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
    }

    post_create(event) {

        //Se toman los parametros y retornos desde los componentes
        this.setState({parameters : this.parameters.current.state.parameters,
                        returns: this.returns.current.state.returns
        });
        
        event.preventDefault();
        const problem = {
            statement : this.state.statement,
            difficulty : this.state.difficulty,
            language: this.state.language, 
            name: this.state.name,
            parameters: this.parameters.current.state.parameters,
            returns: this.returns.current.state.returns,
        };
        console.log(problem);
        //1const url = `http://46.101.81.136:8181/Backend/problems/1/createProblem`;
        const url = `http://35.226.163.50:8080/Backend/problems/create/2`;

        axios.post(url,problem)
        .then(res => {
            //Se toma la id del problema.
            var id_problem = res.data.id;
            alert("Se ha agregado el problema junto con sus parametros y retornos.");
        }).catch(error => {
            alert("Error");
            console.log(error.response);
            alert(error.response);
            return -1;
        });
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

        return(

        <Form onSubmit = {this.post_create.bind(this)}> 

            <FormGroup controlId="name"  bsSize="large">
                 <ControlLabel>Titulo</ControlLabel>
                 <FormControl
                            type="text"
                            value={this.state.name}
                            placeholder="Titulo del problema"
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
                <ControlLabel>Dificultad</ControlLabel>
                <FormControl
                    type="number"
                    min={0} max={10}
                    value={this.state.difficulty}
                    placeholder="Enter text"
                    onChange={this.handleDifficulty}
                />


            <FormGroup>
                <ControlLabel>Enunciado</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Ingrese el enunciado" value={this.state.statement} 
                   onChange={this.handlerStatement} />
            </FormGroup>
            
            
                
                    <AddParameter ref = {this.parameters}/>
                
                
                
                    <AddReturn ref = {this.returns}/>           
                
            
         
          <button type="submit"> Agregar</button> 
        </Form>
        );
    }
}

export default CreateProblem;