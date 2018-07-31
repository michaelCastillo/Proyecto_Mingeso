import React, { Component } from 'react';
import ReactSvgPieChart from "react-svg-piechart";




class ResultChart extends Component{

/*
const data = [
            {title: "Data 2", value: 1, color: "#ff0000"},
            {title: "Data 3", value: 1, color: "#00ff00"},
          ]
           */
    constructor(props){
        super(props);
        console.log("as => "+this.props.nsucc);
        this.state ={
            data:[{title: "Data 2", value: this.props.nfails, color: "#ff0000"},{title: "Data 3", value: this.props.nsucc, color: "#00ff00"}]
        }
    }


    render(){return(
        
        <ReactSvgPieChart
        data={this.state.data}
        // If you need expand on hover (or touch) effect
        expandOnHover
        // If you need custom behavior when sector is hovered (or touched)
        
    />
                            
    )}

}
export default ResultChart;