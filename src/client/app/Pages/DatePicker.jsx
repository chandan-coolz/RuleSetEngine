import React from 'react';
import {render} from 'react-dom';
import {updateValue}  from '../actions/RuleAction.jsx';

export default class DatePicker extends  React.Component {

  componentDidMount() {
    
    $('.'+this.props.triggerObject.id).datepicker({
       dateFormat: "d MM, yy"
      });

    $('.'+this.props.triggerObject.id).change(function(e){
      //fire your ajax call  
    
      let newDate = dateFormat(e.target.value, "mm-dd-yyyy HH:MM:ss") ;

    
      updateValue(this.props.triggerObject,newDate);


   }.bind(this));
}

  componentWillUnmount() {
    
    $('.'+this.props.triggerObject.id).datepicker('destroy');
  }


render() {
    const props = this.props;
    return <input type="text" className={this.props.triggerObject.id} readOnly='true'/>
  }



}//DatePicker