import React from 'react';
import {render} from 'react-dom';
import {updateValue}  from '../actions/RuleAction.jsx';



export default class DateTimePicker extends React.Component {

componentDidMount() {
    
    $('.'+this.props.triggerObject.id).datetimepicker({
              dateFormat: "d MM, yy",
              timeFormat: "hh:mm TT"
            });

    $('.'+this.props.triggerObject.id).change(function(e){
      //fire your ajax call  

      let newDateTime =  dateFormat(e.target.value, "mm-dd-yyyy HH:MM:ss");
      
      updateValue(this.props.triggerObject,newDateTime);

   }.bind(this));
}

  componentWillUnmount() {
    
    $('.'+this.props.triggerObject.id).datetimepicker('destroy');
  }


render() {
    const props = this.props;
    return <input type="text" className={this.props.triggerObject.id} readOnly='true'/>
  }



}//DateTimePicker