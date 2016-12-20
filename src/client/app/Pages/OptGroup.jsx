import React from 'react';
import {render} from 'react-dom';

export default class OptGroup extends React.Component {

render(){


  return(

        <optgroup key={this.props.groupName} label={this.props.groupName} >
          {this.props.children}
        </optgroup>
       
   );
 }//render
}//OptGroupClass
