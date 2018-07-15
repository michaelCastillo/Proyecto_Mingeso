import React, { Component } from 'react';
import {Button, Form,Grid, Row, Col, Label ,FormControl,FormGroup,InputGroup,DropdownButton,MenuItem, ControlLabel} from 'react-bootstrap';



class Tuple extends Component{


    constructor(props){
        super(props);
        this.state ={id:0,in:"",out:""}
        this.handleDelete = this.handleDelete.bind(this);
        this.handleIn = this.handleIn.bind(this);
        this.handleOut = this.handleOut.bind(this);
    }

    componentDidMount(){
        this.setState({id:this.props.id});
    }

    handleIn(e){
        this.setState({in:e.target.value});
    }
    handleOut(e){
        this.setState({out:e.target.value});
    }
    handleDelete(){
        this.props.onDelete(this.state.id)
    }


    render() {return(
        <Form>
        <FormGroup> 
            <Col md={5}> 
                <FormGroup>
                    <ControlLabel>entrada {this.state.id}</ControlLabel>
                    <FormControl type="text" placeholder="Ingrese la entrada" value={this.state.in} 
                        onChange={this.handleIn} />
                </FormGroup>
            </Col>
        
            <Col md={5}> 
            <FormGroup>
                <ControlLabel>salida {this.state.id}</ControlLabel>
                <FormControl type="text" placeholder="Ingrese la salida" value={this.state.out} 
                    onChange={this.handleOut} />
            </FormGroup>
            </Col>
            <Col md={2}> <Button bsStyle="primary" onClick={this.handleDelete}>-</Button></Col>
            
        </FormGroup>
        </Form>
    );}

}


export default Tuple;