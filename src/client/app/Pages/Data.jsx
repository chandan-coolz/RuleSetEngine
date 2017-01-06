import React from 'react';
import {render} from 'react-dom';
import Rule from './Rule.jsx';
import RuleStore from '../stores/RuleStore.jsx';
import AddRule from './AddRule.jsx';
import tempDataStore from '../stores/tempDataStore.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';



export default class Data extends React.Component {

constructor(){

super();
this.state={
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
  }//state

this.sectionChangeListener = this.sectionChangeListener.bind(this);

this.data=[];
}//constructor


/********sectionChangeListener*******************************/

sectionChangeListener(){
tempDataStore.reSetDeletedCreativeAssetGroup();  
this.data = RuleStore.getDataForSection(this.props.secName);
this.forceUpdate();
}






componentWillMount() {
RuleStore.on("section"+this.props.secName, this.sectionChangeListener) ;    
this.data = RuleStore.getDataForSection(this.props.secName);

}


componentWillUnmount() {
  
RuleStore.removeListener("section"+this.props.secName, this.sectionChangeListener);
 
}

componentWillReceiveProps(newProps) {
 
this.data = RuleStore.getDataForSection(newProps.secName);

}





  /*********************method releated to adding  rules ***************************************/
  generateRuleId(){

  return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());
  } //generate Ruleid

  generateRuleName(){
  let ruleNumber = this.props.data.data.length;
  return("Rule "+(++ruleNumber) );

  } //generateRuleName

  generateRootConditionId(){

  return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());

  } //generateRootConditionId




copyRuleFunction(secName,currentPos,RuleActionObject,copyCreated){
let ruleId = this.generateRuleId();

RuleActionObject.copyRule(secName,currentPos,ruleId,copyCreated);

} //copy rulefunction




render() {


var rules =this.data.map( (rule,i) => <Rule key={i}  rulePosition={i} secName={this.props.secName}
	copyRuleFunction={this.copyRuleFunction.bind(this)} advertiserId={this.props.advertiserId}
 addId={this.props.addId} 
	/>

); //map


return( 



     <ul>

          {rules}

           

      </ul>  





  );  



} //render

} //Data