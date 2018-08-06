import React, { Component } from 'react';
import {Button, Form,Grid, Checkbox, Row, Col, Label ,FormControl,FormGroup,InputGroup,DropdownButton,MenuItem, ControlLabel} from 'react-bootstrap';



class Tuple extends Component{


    constructor(props){
        super(props);
        this.state ={id:0,in:"",out:"",hidden:false}
        this.handleDelete = this.handleDelete.bind(this);
        this.handleIn = this.handleIn.bind(this);
        this.handleOut = this.handleOut.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
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
    handleHidden(){
        if(this.state.hidden){
            this.setState({hidden:false});
        }else{
            this.setState({hidden:true});
        }
    }


    render() {return(
        <Form inline>
        <Grid>
            <Col md={1}> 
                <Checkbox onChange={this.handleHidden} inline >oculto</Checkbox>
            </Col>
            <Col md={5}  > 
                <FormGroup >
                    <InputGroup >
                    <InputGroup.Addon>Entrada</InputGroup.Addon>
                    <FormControl    type="text"  placeholder="Ingrese la entrada" value={this.state.in} onChange={this.handleIn} />
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col md={5}> 
                <FormGroup>
                    <InputGroup>
                    <InputGroup.Addon>Salida</InputGroup.Addon>
                    <FormControl type="text"  placeholder="Ingrese la salida" value={this.state.out} onChange={this.handleOut} />
                    </InputGroup>
                </FormGroup>
            </Col>
            <Col md={1}> 
                <Button bsStyle="primary" onClick={this.handleDelete}>-</Button>
            </Col>
            </Grid>
        </Form>
    );}

}


export default Tuple;