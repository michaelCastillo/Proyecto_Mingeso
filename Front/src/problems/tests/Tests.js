import React, { Component } from 'react';
import { ControlLabel,Grid, Row, Col, Label,Button, FormGroup,FormControl,MenuItem,DropdownButton,Form } from 'react-bootstrap';
import Tuple from './Tuple';
class Tests extends Component{


    constructor(props){
        super(props);
        this.numTuples = 1;
        this.onAddTuple = this.onAddTuple.bind(this);
        this.onDeleteTuple = this.onDeleteTuple.bind(this);
        this.state ={tuples:[React.createRef()]};
    }

    

    onAddTuple = () => {
        
            var tuples = this.state.tuples;
            var ref = React.createRef();
            tuples.push(ref);
            this.setState({tuples:tuples});
            this.numTuples += 1;
        
    }

    onDeleteTuple = (id) =>{
        if(this.numTuples == 1){
            alert("Debe existir almenos 1 prueba!");
        }else{
            console.log("tuplas: "+this.state.tuples[0].current.state.id)
            console.log("presione desde el hijo: "+id);
            var tuples = this.state.tuples;
            tuples.pop(id);
            this.setState({tuples:tuples});
            this.numTuples -=1;
        }
    }

    render(){
        return(
            <Grid>
                <Row>
                    <Col md={8}> 
                        <ControlLabel>Pruebas</ControlLabel>
                    </Col>
                    <Col md={4}> 
                        <Button bsStyle="primary" onClick={this.onAddTuple}>Agregar</Button>  
                    </Col>
                </Row>
                <Row>
                    {this.state.tuples.map((tuple,index) => {return(
                        <Tuple ref = {tuple} id={index} onDelete = {this.onDeleteTuple}/>
                    );})}
                


{/*                    <Col md={11} xs ={11}>
                        <Tuple/>
                    </Col>
                    <Col md={1} xs={1}>
                        <Button tybsStyle="primary">-</Button>
                    </Col>
        */}
                </Row>
            </Grid>
        );
    }

}

export default Tests;