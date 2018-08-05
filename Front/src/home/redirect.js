import React, {Component} from 'react'
class Redirect extends Component{

redirigir(){

    window.location.href = "problems/show";
}

render(){

    return(
        <div>

         Redirigiendo...
         {this.redirigir()}
        </div>
    );


}




} 

export default Redirect;
