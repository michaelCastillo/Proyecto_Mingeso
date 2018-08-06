import React, { Component } from 'react';
import { ControlLabel,Grid, Row, Col, Label,Button, FormGroup,FormControl,MenuItem,DropdownButton,Form } from 'react-bootstrap';
class Parameters extends Component{



    render(){
        return(
            <Grid>
                <Row>
                    <Col md={6}> 
                        <ControlLabel>Parámetros</ControlLabel>
                    </Col>
                    <Col md={6}> 
                        <Button bsStyle="primary">Agregar</Button>  
                    </Col>
                </Row>
            </Grid>
        );
    }

}

export default Parameters;