import React from 'react';
import {render} from 'react-dom';
import {updateValue}  from '../actions/RuleAction.jsx';

export default class Segment extends  React.Component {

constructor() {
	super();
	this.checkForChange="";
	this.segmentInputPreviousLength = -1; 
	this.state = {
		segmentEditClass:""
	}
}


componentDidMount() {
	this.segmentInputPreviousLength = this.refs.segmentInput.value.length;
	this.checkForChange = setInterval(function(){ 
     if( (this.segmentInputPreviousLength != this.refs.segmentInput.value.length) 
          && (this.state.segmentEditClass=="")
     	){
     	updateValue(this.props.secName,this.props.rulePosition,this.props.triggerObject,this.refs.segmentInput.value);
        this.segmentInputPreviousLength = this.refs.segmentInput.value.length; 

     }
  
    }.bind(this), 1000);	
}

componentWillUnmount() {
	
clearInterval(this.checkForChange);
}

showSegment(){
	
 showSegmentModalWindow(this.refs.segmentInput,this.props.service);

}

showSegmentInformation(){
showSegmentInfo(this.refs.segmentInput,this.props.service);
}


editSegmentClicked(){
      this.refs.bar.style.opacity = 0;
      this.refs.segmentInput.readOnly = false;
      this.refs.segmentInput.focus();
    	
}

doneSegmentEdit(){

this.refs.segmentInput.readOnly = true;
this.refs.bar.style.opacity = 1;
getUnmatchSegmentId(this.refs.segmentInput, this.props.service, '');

} //donerule name  edit

changeSegmentInput(){
var patt = /^[0-9,]*$/;
if(patt.test(this.refs.segmentInput.value)){
  updateValue(this.props.secName,this.props.rulePosition,this.props.triggerObject,this.refs.segmentInput.value);	
}

} //change Rule Name
render(){


 return(

   <div className="turbine">
     <input type="text"   ref="segmentInput" value={this.props.servicePropertyValue} 
     onClick={this.showSegment.bind(this)}
     className={this.state.segmentEditClass}
     onChange={this.changeSegmentInput.bind(this)}
     onBlur={this.doneSegmentEdit.bind(this)}
     />     
     <div className="bar-info-logo">
       <span className="bars" ref="bar" onClick={this.showSegment.bind(this)}><i className="fa fa-bars" aria-hidden="true"></i></span>
       <span className="info" onClick={this.showSegmentInformation.bind(this)}><i className="fa fa-info-circle fa-lg" aria-hidden="true"></i></span>
       <span className="edit" onClick={this.editSegmentClicked.bind(this)}><i className="fa fa-pencil" aria-hidden="true"></i></span>
     </div>
   </div>  
    );
 }

}//turbine class
