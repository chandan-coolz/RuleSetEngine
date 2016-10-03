import React from 'react';
import {render} from 'react-dom';
import Trigger from './Trigger.jsx';
import NestedCondition from './NestedCondition.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';
import DynamicCampaignConfig from '../stores/dynamicCampaignConfig.jsx';

export default class Condition extends React.Component {

constructor(){
super();

this.state = {

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


   }   ,
  dyn__conditionOperator : DynamicCampaignConfig.getConditionOperator(),
  conditionOperatorOption : ""

} //states

}//constructor end here

componentWillMount() {
  
    let conditionOperatorkey = Object.keys(this.state.dyn__conditionOperator);
    let conditionOperatorOption = conditionOperatorkey.map((v,i) => 
     <option key={i} value={v}>{this.state.dyn__conditionOperator[v]} </option>  
     );
   this.setState({conditionOperatorOption:conditionOperatorOption});
  
}//component will mount



//generatecondition id
generateConditionId(){

return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

} //generateConditionId
//generate Trigger ID
generateTriggerId(){

return ("TRI-R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

}//generate trigger id

addConditionClicked(){
  
  let temp = JSON.parse(JSON.stringify(this.state.newCondition));
  temp["id"] = this.generateConditionId();
  RuleAction.addCondition(this.props.condition,temp);
}//addConditionClicked end here



addTrigger(){

let temp =  JSON.parse(JSON.stringify(this.state.newTrigger));
temp["id"] = this.generateTriggerId();
RuleAction.addTrigger(this.props.condition,temp);

}//add trigger



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


if(this.props.condition.hasOwnProperty('conditions')){
/*nestedcondition styling */
var nestedConditions = this.props.condition.conditions.map( (conditionObject,i) => 

    
	
	<NestedCondition key={i} condition={conditionObject} parentCondition={this.props.condition}
   advertiserId={this.props.advertiserId} addId={this.props.addId}
   dyn__conditionOperator={this.state.dyn__conditionOperator}
   conditionOperatorOption={this.state.conditionOperatorOption}
    />

        


	 

	);  
}



return(

  <li>
     <table className="condition">
        <thead>
        <tr>
            
            <th>

             <label>
               <select className="condition-operator" ref="conditionOperator"
               value={this.props.condition.operator}
               onChange={this.changeConditionOperator.bind(this)}
               >

                {this.state.conditionOperatorOption}
               </select>
             </label>
            
            <label>
              <button onClick={this.addConditionClicked.bind(this)}  ><i className="fa fa-adjust" aria-hidden="true" ></i>Add Condition </button>

            </label>

            <label>
              <button onClick={this.addTrigger.bind(this)}><i className="fa fa-bolt" aria-hidden="true"></i>Add Trigger </button>

            </label>

            </th>
        </tr>
        </thead>
    </table>
  
          <ul>

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