import React,{Component } from "react";

import {Row, Col} from 'react-bootstrap';

import 'brace/mode/c_cpp';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/theme/github';
import 'brace/theme/monokai';
import AceEditor from 'react-ace';
import ReactLoading from "react-loading";

class Editor extends Component{

    constructor(props){
        super(props);
        this.state ={
            code:this.props.code,
            charge: false,
            ide:"",
        };
        //this.handleCode = props.handleCode;
        this.handleCode = this.handleCode.bind(this);
    }

    


    handleCode(newValue){
        console.log("Valor! => " + newValue);
        this.state.code = newValue;
        this.props.handleCode(newValue);
        if(this.props.ide == "c")
        {
            this.state.ide = "c_cpp";
        }
        else
        {
            this.state.ide = this.props.ide;
        }
        
    }

    isCharging(value){
        this.setState({charge:value});
    }

    


    render(){
        if(this.state.charge){

            return(
                <ReactLoading type={"cylon"} color="#42b6f4" height={500} width={300} />
            );
        }else{
            console.log(this.props);
            return(
                <div>
                    <Row>
                        <Col md = {12}>
                        <AceEditor
                            mode={this.props.ide}
                            theme="monokai"
                            name="blah2"
                            onLoad={this.onLoad}
                            onChange={this.handleCode}
                            fontSize={14}
                            showPrintMargin={true}
                            showGutter={true}
                            highlightActiveLine={true}
                            value={this.state.code}
                            setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                            }} disabled/>
                        </Col>
                    </Row>
                </div>
            );
        }
    }


}


export default Editor;