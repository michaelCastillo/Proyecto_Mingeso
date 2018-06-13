import React, {Component} from 'react'
import { Grid, Row, Col, Label } from 'react-bootstrap';
import Login from '../login/login'
import imagen from '../images/homeImage.png';
class Home extends Component{

    constructor(props){
        
        super(props);
        this.login = React.createRef();
    }

    render(){
        return(
            
        <Grid class="pt-2">
                <Col md={9}>
                    <h1> Bienvenido a ....</h1>
                    <a  href="/home"><img border="10" src={imagen} alt=""/></a>
                    <h3> Si eres alumno podrás: </h3>
                    <h4>    
                    <dl>
                        <dt><span class="glyphicon glyphicon-ok"></span>  Practicar</dt>
                        <dd>- Resuelve problemas escritos por los mismos profesores
                        que imparten el ramo, ejercicios de primera mano! </dd>
                        <dt> <span class="glyphicon glyphicon-ok"></span>  Revisar </dt>
                        <dd>- Obten retroalimentación de parte de los profesores y
                            consejos sobre tu código, programar nunca fue tán dinámico! </dd>
                    </dl>
                    </h4>
                    <h3> Si eres profesor podrás: </h3>
                    <h4>    
                    <dl>
                        <dt><span class="glyphicon glyphicon-ok"></span>  Practicar</dt>
                        <dd>- Resuelve problemas escritos por los mismos profesores
                        que imparten el ramo, ejercicios de primera mano! </dd>
                        <dt> <span class="glyphicon glyphicon-ok"></span>  Revisar </dt>
                        <dd>- Obten retroalimentación de parte de los profesores y
                            consejos sobre tu código, programar nunca fue tán dinámico! </dd>
                    </dl>
                    </h4>
                
                </Col>
                <Col md={3}>
                    <h1> Ingresar </h1>
                    <Login ref = {this.login}/> 
                  
                </Col>
            
        </Grid>
    );

    }


}

export default Home;