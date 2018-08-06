
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import ShowUser from './ShowUser'
import EditUser from './EditUser'
import { Grid, Row, FormControl, Col, Label, Panel, DropdownButton, MenuItem, Table, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            idUser: this.props.match.params.id,
            componentState: true,
            name: '',
            email: '',
            password: '',
        };
        this.showUser = React.createRef();
        this.editUser = React.createRef();
        this.handleComponentChange = this.handleComponentChange.bind(this);
        this.handleComponent = this.handleComponent.bind(this);
    }
    componentDidMount() {
        let id_user = this.state.idUser;
        //Por ahora es la id 6, cuando este el login bien se cambia por aquel que
        //esté logueado.
        let global_url = `http://35.226.163.50:8080/Backend`;
        let user = axios.get(global_url + `/users/` + id_user)
            .then(res => {
                const user = res.data;
                this.setState({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                });
            }).catch(error => {
                console.log(error.response);
            });
    }
    handleComponent() {
        let item;
        if (this.state.componentState) {
            item = <ShowUser ref={this.showUser} id={this.state.idUser} />;

        } else {

            item = <EditUser ref={this.editUser}
                id={this.state.idUser} />;

        }
        return item;
    }
    handleComponentChange() {
        if (this.state.componentState) {
            this.setState({ componentState: false });
        } else {
            this.setState({ componentState: true });
        }
    }
    handleEditButton() {
        let item;
        if (this.state.componentState) {
            item = <Button bsSize="large" onClick={this.handleComponentChange} bsStyle="warning" class="btn btn-primary">
                Editar</Button>;
        } else {
            item =
                <Button bsSize="large" onClick={this.handleComponentChange} bsStyle="warning" class="btn btn-primary">
                    Finalizar</Button>;
        }
        return item;
    }

    render() {
        return (
            <Grid>
                <Row>
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12">
                                <div class="well well-sm">
                                    <Row>
                                        <Col md={3} sm={3}>
                                            <img src={"https://api.adorable.io/avatars/300/" + this.state.name + "@adorable.png"} alt="" class="img-rounded img-responsive" />
                                        </Col>
                                        <Col md={9} sm={9}>

                                            {this.handleComponent()}
                                            <br />
                                            <div class="btn-group">
                                                {this.handleEditButton()}
                                            </div>

                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>

            </Grid>
        );
    }




}
export default UserProfile;                