import React, {Component} from 'react';
import {ListGroup,ListGroupItem,Grid,Row,Col,Label,Button} from 'react-bootstrap';
import axios from 'axios';
import ReactLoading from "react-loading";
import './students.css'


class Students extends Component
{

    constructor(props)
    {
        super(props);

        this.state= {
            role:"student", 
            students:[],
            ready:false,
        }
    }

    componentDidMount  = () => {
        let user = {
          role:"student"
        };
        axios.post(`http://35.226.163.50:8080/Backend/users/getByRoles`,user)
            .then(res => {
                const students=res.data;
                this.setState({ students });
                this.setState({ready:true});
            }).catch(error => {
                console.log(error.response)
            });
    };

    handleAlumnos()
    {
        if(!this.state.ready)
        {
            return(
                <section id="carga">
                    <ReactLoading type={"spin"} color={"#000"} height={667} width={375}/>
                </section>
            );
        }
        else
        {
            return(
                this.state.students.map((student) => {
                    return (
                  <Row className="grid-show">
                      <Col sm ={6} md={12}>
                        <ListGroup>
                              
                        <ListGroupItem style={{background:'#66B3DD'}} href={`/users/${student.id}`}> {student.name}</ListGroupItem>
                        </ListGroup>
                      </Col>
                  </Row>

                 );})
            );
        }
    }


    render()
    {
        return(
            <div id="students" className = " students"  >
                <br/>
                <br/>
                <br/>
                <Grid>
                    <Row > 
                        <Col md={12} xs={12}>
                            <h1  className="center"><Label id="title">Lista Alumnos:</Label></h1>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    {this.handleAlumnos()}
                </Grid>  
            </div>          
        );
    }

}

export default Students;