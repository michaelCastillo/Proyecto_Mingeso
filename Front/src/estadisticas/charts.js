import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Grid ,Row, Col,Form, Well, FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import ChartLine from './chartsLine';
import { TreeSelect } from 'antd';
import TimeChart from './time';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'





class Chart extends Component {

    constructor (props) {
        super(props);
        this.state ={
            careers:[],
            coordinations:[],
        };


    }

    componentDidMount =() =>{
        const local = `http://localhost:1313`;
        axios.get(local+`/stats/getSelect`)
        .then(response=>{
            console.log(response);
        })
        .catch(error =>{
            console.log(error);
        });
    }
    

    render() { 
        const TreeNode = TreeSelect.TreeNode;

        return (
            
            <TreeSelect
                    showSearch
                    style={{ width: 300 }}
                    value={this.state.value}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={this.onChange}
                >
                    <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                        <TreeNode value="leaf1" title="my leaf" key="random" />
                        <TreeNode value="leaf2" title="your leaf" key="random1" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                        <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
                    </TreeNode>
                    </TreeNode>
                </TreeSelect>  
    );
    
    }
}
export default Chart;
