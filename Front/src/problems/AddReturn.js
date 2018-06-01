
import ScrollArea from 'react-scrollbar';
import React, { Component } from 'react';
import {Button, Form,Grid, Row, Col, Label ,FormControl,FormGroup,InputGroup,DropdownButton,MenuItem, ControlLabel} from 'react-bootstrap';
import axios from 'axios';

class AddReturn extends Component {

    constructor(props){
        
        super(props);
        this.state = {
            returns:[{
                name:'', type:'string'
            }]
        }

        this.handleoutput = this.handleoutput.bind(this);
        this.handleAddOutput = this.handleAddOutput.bind(this);
        this.handleRemoveOutput = this.handleRemoveOutput.bind(this);
        this.show = this.show.bind(this);
        this.handlereturns = this.handlereturns.bind(this);
    }

    show(event){
        //Se hace algo con cada uno de los valores.
        //(En este caso se haría la petición post.)
        this.state.returns.map(  (el_input, i) => (
            //Hacer post por cada input.
            console.log(el_input.name)
        )   );
        console.log(this.state.returns);
    }

    //Se hace la petición Post
    post_returnsCreate = (id_problem) =>{

        const url = `http://46.101.81.136:8181/Backend/returns/`+id_problem+`/saveReturns`;
        axios.post(url,this.state.returns)
        .then(res => {
            console.log(res.data);
            return res.data;
        }).catch(error => {
            console.log("Error");
            alert("Error returns");
        });
    }


    handleoutput = (idx) => (event) => {
        const newoutput = this.state.returns.map((returns, sidx) => {
            if (idx !== sidx) return returns;
            return { ...returns, name: event.target.value };
            });

     this.setState({ returns:newoutput });
    }

    handlereturns = (idx) => (event) => {
        const newoutput = this.state.returns.map((returns, sidx) => {
            if (idx !== sidx) return returns;
            return { ...returns, type: event.target.value };
            });

     this.setState({ returns:newoutput });
    }
    
    handleAddOutput = () => {
        this.setState({ returns: this.state.returns.concat([{ name: '', type:'string' }]) });
      }
    handleRemoveOutput = (idx) => () => {
        this.setState({ returns: this.state.returns.filter((s, sidx) => idx !== sidx) });
      }
      


    render(){
        return(
            <Form horizontal  onSubmit={this.handleSubmito}>
            <FormGroup>
                <Col md={11}>
                    <ControlLabel> Retornos: </ControlLabel>
                </Col>
                <Col md={1}>
                    <Button id = "mas" type="button" onClick={this.handleAddOutput} className="scroll">+</Button>
                </Col>
            </FormGroup>
                <ScrollArea
                    speed={0.8}
                    className="area"
                    contentClassName="content"
                    horizontal={false}
                    >
                        {this.state.returns.map((returns, idx) => (
                                <FormGroup>
                                    <Col md={3}>
                                        <FormControl componentClass="select"value = {this.state.type} id="tipo" onChange = {this.handlereturns(idx)} > 
                                            <option value = "string"> String </option>
                                            <option value="int"> Int </option>
                                        </FormControl>

                                    </Col>
                                    <Col md={9}>
                                        <InputGroup>
                                            <FormControl 
                                                type="text"
                                                placeholder={`Entrada ${idx + 1}`} 
                                                value={returns.nameo}
                                                onChange={this.handleoutput(idx)}/> 
                                                <InputGroup.Button>
                                                    <Button  id="menos" type="button" onClick={this.handleRemoveOutput(idx)} className="scroll">-</Button>
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


export default AddReturn;
