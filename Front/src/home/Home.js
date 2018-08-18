import React, {Component} from 'react'
import { Grid, Col, Button } from 'react-bootstrap';
import Login from '../login/login'
import Register from '../register/register'
import imagen from '../images/homeImage.png';

class Home extends Component{

    constructor(props){
        
        super(props);
        this.state ={
            loginComponent: true
        };
        this.login = React.createRef();
        this.register = React.createRef();
        this.changeComponentStatus = this.changeComponentStatus.bind(this);
    }
    changeComponentStatus(event){
        
        if (this.state.loginComponent){
            this.setState({loginComponent:false});
        } else {
            this.setState({loginComponent:true});
        }
    }
   

    render(){
        let component = null;
        let buttonText = "";        
        if (this.state.loginComponent){
            buttonText = "Registrarse";
            component = <Login ref = {this.login}/> ;
        } else {
            buttonText = "Ingresar";
            component = <Register ref = {this.register}/> ; 
        }
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
                <Button             
                  type="button" bsStyle="info" onClick = {this.changeComponentStatus}>
                  {buttonText}
                </Button>
                    {component}
                    
                </Col>
            
        </Grid>
    );

    }


}

export default Home;