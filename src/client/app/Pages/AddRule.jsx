	import React from 'react';
	import {render} from 'react-dom';
	import * as RuleAction from '../actions/RuleAction.jsx';


	export default class AddRule extends React.Component {

   constructor(){
  
   super();
   this.methodToCall="";
   this.indexToInsert=-1;
   this.state = {
     
     isAfterRuleRadioButtonSelected:false,
	 rule:{
      "id": "",
      "ruleName": "Default",
      "reportConfig": {
        "includeAssetSources": []
      },
      "creative_groups": [
        
      ],
      "conditions": [
        {
          "id": "",
          "operator": "and",
          "selectors": [

          ],
          "conditions": [

            ]

        }
      ]
    }//rule
  } //state

 } //constructor

/*********************method releated to adding  rules ***************************************/
generateRuleId(){

return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());
} //generate Ruleid

generateRuleName(){
let ruleNumber = this.props.ruleCount;
return("Rule "+(++ruleNumber) );

} //generateRuleName

generateRootConditionId(){

return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

} //generateRootConditionId

addRuleToEndFunction(){
this.state.rule.id = this.generateRuleId();
this.state.rule.ruleName = this.generateRuleName();
this.state.rule.conditions[0].id = this.generateRootConditionId();
let newRule = JSON.parse(JSON.stringify(this.state.rule));
RuleAction.addRuleToEnd(newRule);

} //addRuleToEndFunction

addRuleToBeginingFunction(){
this.state.rule.id = this.generateRuleId();
this.state.rule.ruleName = this.generateRuleName();
this.state.rule.conditions[0].id = this.generateRootConditionId();
let newRule = JSON.parse(JSON.stringify(this.state.rule));
RuleAction.addRuleToBegining(newRule);

} //addRuleToBeginingFunction

addRuleAfterSomeRuleFunction(indexToInsert){
this.state.rule.id = this.generateRuleId();
this.state.rule.ruleName = this.generateRuleName();
this.state.rule.conditions[0].id = this.generateRootConditionId();
let newRule = JSON.parse(JSON.stringify(this.state.rule));
RuleAction.addRuleAfterSomeRuleFunction(newRule,indexToInsert);

} //addRuleToBeginingFunction
/********event releated method*****************************************************************/
    insertAfterSelectCalled(e){
     if(e.target.value){

       this.indexToInsert = e.target.value;
      }  else {
       this.indexToInsert = -1;
      }
   
     
    }


  handleOptionChange(e){
  
  
  if(e.target.value=="after"){
  	this.setState({isAfterRuleRadioButtonSelected:true});
  }else{

  	 if(this.state.isAfterRuleRadioButtonSelected === true){
  	 	this.setState({isAfterRuleRadioButtonSelected:false});
  	 } 
  }
  
  this.methodToCall = e.target.value; 

   
  }//handleOptinChange

  insertRule(){

   switch(this.methodToCall){
   
   case "end" :
   this.addRuleToEndFunction();
   break;
   case "Begining":
   this.addRuleToBeginingFunction();
   break;
   case "after":
   
   if(this.indexToInsert >=0){
     
     this.addRuleAfterSomeRuleFunction(this.indexToInsert);
    }
   break;


   }//switch


  }
/**********************************************render*****************************************************/

		render(){
       

			return(

				<div className="add-rule">


				<span>Add Rule </span>


				<label>
				<input type="radio" name="option"  value="end" 
				  onChange={this.handleOptionChange.bind(this)} />
				At The End
				</label>


				<label>
				<input type="radio"  name="option" value="Begining" 
				  onChange={this.handleOptionChange.bind(this)}/>
				At The Begining
				</label>

				<label>
				<input type="radio" name="option"  value="after" 
				  onChange={this.handleOptionChange.bind(this)}/>
				After
        
				

				</label>
       <label> 
        <select  onChange={this.insertAfterSelectCalled.bind(this)} 
                 disabled={!this.state.isAfterRuleRadioButtonSelected}
                 defaultValue=""

        >

         <option value="">Select</option>
                 {this.props.options}
        </select>
       </label>


				<label>
				<button onClick={this.insertRule.bind(this)} >Go </button>


				</label>

				</div>

				);

	}//endof render method


	}//endof Add Rule class