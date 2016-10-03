import React from 'react';
import {render} from 'react-dom';
import Trigger from './Trigger.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';

export default class NestedCondition extends React.Component {

constructor(){
super();

this.state = {
  isToShowConditionContent : true,
  contentClass : "visuallyShow",
   newCondition: {
          "id": "",
          "operator": "and",
          "selectors": [

           ],
           "conditions": [

            ]

          },
  newTrigger: {
     "id":"",
     "comparator": "equals",
     "geo:geo.city": ""


   },
    deleteConfirmationBoxContainerClass:"hide",
    deleteConfirmationBoxClass:"confirmationBoxInitialPosition"

} //state

} //constructor







showConditionalContent(){
	this.setState({isToShowConditionContent : true,contentClass:"showAll"});
  setTimeout(function(){

  this.setState({contentClass:"visuallyShow"});
  

}.bind(this),500);
} //showConditionalContent

hideConditionalContent() {

	this.setState({isToShowConditionContent : false,contentClass:"visuallyhidden"});
  setTimeout(function(){

  this.setState({contentClass:"hide"});
  

}.bind(this),500);
} //hideConditionalCOntent

//generatecondition id
generateConditionId(){

return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

} //generateConditionId

//generate Trigger ID
generateTriggerId(){

return ("TRI-R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

}//generate trigger id

addNestedCondition(){
    
  let temp = JSON.parse(JSON.stringify(this.state.newCondition));
  temp["id"] = this.generateConditionId();
  RuleAction.addCondition(this.props.condition,temp);

}//add nestedcondition


addTrigger(){

let temp = JSON.parse(JSON.stringify(this.state.newTrigger));
temp["id"] = this.generateTriggerId();
RuleAction.addTrigger(this.props.condition,temp);

}//add trigger


openDeleteRuleDialog(){

this.setState({deleteConfirmationBoxContainerClass:"confirmationBoxContainer"});

setTimeout(function(){

this.setState({deleteConfirmationBoxClass:"confirmationBoxFinalPosition"});

}.bind(this),20);

} //showDeleteConditionCOnfirmationBox

cancelDelete(){

this.setState({deleteConfirmationBoxContainerClass:"hide",deleteConfirmationBoxClass:"confirmationBoxInitialPosition"});
} //cancel delete ruledialog


deleteCondition(){

   RuleAction.deleteCondition(this.props.parentCondition,this.props.condition.id);
   this.cancelDelete();
} //delete COndition


changeConditionOperator(){

let newOperator = this.refs.conditionOperator.value;
RuleAction.updateConditionOperator(this.props.condition, newOperator);

}//changeConditionOperator




render(){




var triggers = this.props.condition.selectors.map( (trigger,i) => <Trigger key={i} trigger={trigger} 
   parentCondition={this.props.condition}
  />

	);

var isToShowTrigger = triggers.length>0?"":"hide";

const showUpArrow = this.state.isToShowConditionContent ? "show" : "hide";
const showDownArrow = this.state.isToShowConditionContent ? "hide" : "show";
 /*const contentClass = this.state.isToShowConditionContent? "show" : "hide" ; */

if(this.props.condition.hasOwnProperty('conditions')){
/*nestedcondition styling */
var nestedConditions = this.props.condition.conditions.map( (conditionObject,i) => 

    
	
	<NestedCondition key={i} condition={conditionObject} parentCondition={this.props.condition}
   advertiserId={this.props.advertiserId} addId={this.props.addId} 
   dyn__conditionOperator={this.props.dyn__conditionOperator}
   conditionOperatorOption={this.props.conditionOperatorOption}
   />

        


	 

	); 
}
 



return (

  <li>

       <div className={this.state.deleteConfirmationBoxContainerClass}>

         <div className={this.state.deleteConfirmationBoxClass}>
              <span className="title">Remove Condition</span>  
              <div className="content">
                <i className="fa fa-exclamation-triangle fa-4x" aria-hidden="true"></i>
                <span>Are you sure you want to remove this conditional block?
                </span>
              </div>
              <div className="action">
               <span className="delete" onClick={this.deleteCondition.bind(this)}>Ok</span>
              <span className="cancel" onClick={this.cancelDelete.bind(this)}>Cancel</span>
             
              </div>

              
        </div>
      </div>







        <table className="condition">
        <thead>
        <tr>
            <th>
               
               <span  className={showUpArrow}><i className="fa fa-angle-up" aria-hidden="true" 
                onClick={this.hideConditionalContent.bind(this)}></i>
             </span>
             <span  className={showDownArrow}>
              <i className="fa fa-angle-down" aria-hidden="true" 
                  onClick={this.showConditionalContent.bind(this)}></i>
             </span>
               
            </th>
            <th>

             <label>
               <select className="condition-operator" ref="conditionOperator"
               value={this.props.condition.operator}
               onChange={this.changeConditionOperator.bind(this)}
               >

                {this.props.conditionOperatorOption}
               </select>
             </label>
            
            <label>
              <button onClick={this.addNestedCondition.bind(this)}><i className="fa fa-adjust" aria-hidden="true" ></i>Add Condition </button>

            </label>

            <label>
              <button onClick={this.addTrigger.bind(this)}><i className="fa fa-bolt" aria-hidden="true"></i>Add Trigger </button>

            </label>

            </th>
            <th>
  
             <i className="fa fa-trash" aria-hidden="true" onClick={this.openDeleteRuleDialog.bind(this)}></i>

            

            </th>
        </tr>
        </thead>
    </table>


          <ul className={this.state.contentClass}>
             
            <li className={isToShowTrigger}><div className="trigger"> 
           <table>
            <thead>
             <tr>
              <th>Service</th>
              <th>Properties</th>
              <th>Operator</th>
              <th>Value</th>
              <th></th>
              </tr>
           </thead>
           <tbody>
              {triggers}
           </tbody>
          </table>
          </div>
        </li>     

              {nestedConditions}
             

          </ul>
  </li>    

);


}

} //ruleclass