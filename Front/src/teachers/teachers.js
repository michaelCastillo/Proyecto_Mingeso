import React, {Component} from 'react';
import {ListGroup,ListGroupItem,Grid,Row,Col,Label,Button} from 'react-bootstrap';
import axios from 'axios';


class Teachers extends Component{

  constructor(props){
    super(props);

    this.state= {
        role:"teacher",
        teachers:[]
    }

  }

  componentDidMount  = () => {
    let user = {
      role:"teacher"
    };
    axios.post(`http://46.101.81.136:8181/Backend/users/getByRoles`,user)
        .then(res => {
            const teachers=res.data;
            this.setState({ teachers });
        }).catch(error => {
            console.log(error.response)
        });
  };

render(){
    return(
      <div id="teachers" className = "teachers">
                <br/>
                <br/>
                <br/>
                <Grid>
                    <Row > 
                        <Col md={12} xs={12}>
                        <h1  className="center"><Label id="title">Lista profesores:</Label></h1>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    { 
                      this.state.teachers.map((teacher) => {
                        return (
                      <Row className="grid-show">
                          <Col sm ={6} md={12}>  
                            <ListGroup>
                                  
                            <ListGroupItem style={{background:'#66B3DD'}} href={`/Profesores/${teacher.id}`}  >{teacher.name}</ListGroupItem>
                            </ListGroup>
                          </Col>
                      </Row>

                     );})
                  }
                </Grid>  
        </div>                  

                  
    );



}

}

export default Teachers;