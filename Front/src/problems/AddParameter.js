import ScrollArea from 'react-scrollbar';
import React, { Component } from 'react';
import {Button, Form,Grid, Row, Col, Label ,FormControl,FormGroup,InputGroup,DropdownButton,MenuItem, ControlLabel} from 'react-bootstrap';
import axios from 'axios';
import './addproblem.css';

class AddParameter extends Component{


    constructor(props){

        super(props);
        this.state = {

            parameters:[{
                name: '',
                type: 'string'
            }]
        };
        this.handleRemoveinput = this.handleRemoveinput.bind(this);
        this.handleinput = this.handleinput.bind(this);
        this.handleAddInput = this.handleAddInput.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);    
        this.show = this.show.bind(this);
    }

    //Handlers
        
    //Encargado de mostrar los inputs que existen
    handleinput = (idx) => (event) => {
        const newinput = this.state.parameters.map((parameters, sidx) => {
            if (idx !== sidx) return parameters;
            return { ...parameters, name: event.target.value };
            });

     this.setState({ parameters:newinput });
    }

    handleType = (idx) => (event) => {
        const newinput = this.state.parameters.map((parameters, sidx) => {
            if (idx !== sidx) return parameters;
            return { ...parameters, type: event.target.value };
            });

     this.setState({ parameters:newinput });
    }

    //Para agregar inputs de parametros
    handleAddInput = () => {
        this.setState({ parameters: this.state.parameters.concat([{ name: '' , type: 'string'}]) });
    }
    //Para remover inputs de parametros
    handleRemoveinput = (idx) => () => {
        this.setState({ parameters: this.state.parameters.filter((s, sidx) => idx !== sidx) });
      }


    show(event){
        //Se hace algo con cada uno de los valores.
        //(En este caso se haría la petición post.)
        this.state.parameters.map(  (el_input, i) => (
            //Hacer post por cada input.
            console.log(el_input.name)
        )   );
        console.log(this.state.parameters);
    }



    handleSubmit = (id) => {
        
        alert(this.state.parameters);
        const url = `http://35.226.163.50:8080/Backend/parameters/`+id+`/createParameters`;
        console.log("URL => ");
        console.log(url);
        alert(url);
        axios.post(url,this.state.parameters)
        .then(res => {
            console.log(res);
            console.log(res.data);
            alert(res.data);
            return res;
        }).catch(error => {
            alert("Error");
            console.log(error.response);
            alert(error.response);
        });

    }

    

    render(){
        return(
            
            <Form horizontal >
                <FormGroup>
                    <Col md={11}>
                        <ControlLabel> Parámetros: </ControlLabel>
                    </Col>
                    <Col md={1}>
                        <Button id = "mas" type="button" onClick={this.handleAddInput}>+</Button>
                    </Col>
                </FormGroup>
                    <ScrollArea
                        speed={0.8}
                        className="area"
                        contentClassName="content"
                        horizontal={false}
                        >
                            {this.state.parameters.map((parameters, idx) => (
                                
                                    <FormGroup>
                                        <Col md={3}>
                                            <FormControl componentClass="select" value = {this.state.type} onChange = {this.handleType(idx)} > 
                                                <option value = "string"> String </option>
                                                <option value="int"> Int </option>
                                            </FormControl>

                                        </Col>
                                        <Col md={9}>
                                            <InputGroup>
                                                <FormControl 
                                                    type="text"
                                                    value={parameters.name}
                                                    placeholder={`Entrada ${idx + 1}`} 
                                                    onChange={this.handleinput(idx)}/> 
                                                    <InputGroup.Button>
                                                        <Button onClick={this.handleRemoveinput(idx)} className="scroll">-</Button>
                                                    </InputGroup.Button>
                                            </InputGroup>
                                        </Col>

                                    </FormGroup>
                            ))}                             
                    </ScrollArea>
            </Form>
        );
    }


    
    
    
    
}
export default AddParameter;





