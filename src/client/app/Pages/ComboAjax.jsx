import React from 'react';
import {render} from 'react-dom';
import {updateValue}  from '../actions/RuleAction.jsx';

export default class ComboAjax extends React.Component {

constructor(){

super();
this.state = {
	ulClass:"combo-ajax"
}

}//constructor


componentWillReceiveProps(newProps) {  


 if(newProps.isOptionChanged){

   if(this.state.ulClass=="hide"){
 	 this.setState({ulClass:"combo-ajax"});
 	 
     }
 	
 }


}










changeValue(newValue){

    
	updateValue(this.props.triggerObject,newValue);
    this.setState({ulClass:"hide"});
}

render(){

if(this.props.options){

var options = this.props.options.map( (obj,i) => <li key={i} 
	onClick={this.changeValue.bind(this,obj.value)}>{obj.displayValue}</li>);
} else {

	var options = [];
}



return(

    <ul className={this.state.ulClass} >

      {options}

    </ul>


	);

}//render




}//comboajax end hers	


