import React from 'react';
import {render} from 'react-dom';
import Rule from './Rule.jsx';
import AddRule from './AddRule.jsx';
import * as RuleAction from '../actions/RuleAction.jsx';



export default class Data extends React.Component {



generateRuleId(){

return ("R-"+this.props.advertiserId+"-"+this.props.addId+"-"+Date.now());
} //generate Ruleid






copyRuleFunction(currentPos,RuleActionObject,copyCreated){
let ruleId = this.generateRuleId();

RuleActionObject.copyRule(currentPos,ruleId,copyCreated);

} //copy rulefunction




render() {


var rules =this.props.data.data.map( (rule,i) => <Rule key={i} rule={rule} rulePosition={i} 
	copyRuleFunction={this.copyRuleFunction.bind(this)} advertiserId={this.props.advertiserId}
	hideRulePos={this.props.hideRulePos} addId={this.props.addId} 
	/>

); //map

var rulesForSelectBoxOption =this.props.data.data.map( (rule,i) => 
     <option key={i} value={++i}>{rule.ruleName}</option>
); //map



//update rule count
var ruleCount = this.props.data.data.length;


var addRuleAtEndClass =  this.props.data.data.length ==0?"hide":"add-rule-at-end";


return( 
<div className="rule" >
   
    <div className="rule-tree">

    <div className="add-rule-at-start">
    <AddRule options={rulesForSelectBoxOption} ruleCount={ruleCount} addId={this.props.addId}
     advertiserId={this.props.advertiserId}
    />
    </div>
     <ul>
          
          {rules}

           

      </ul>  

    <div className={addRuleAtEndClass}>
    <AddRule options={rulesForSelectBoxOption} ruleCount={ruleCount} addId={this.props.addId}
     advertiserId={this.props.advertiserId}/>
    </div>

   </div>
 


</div>   


  );  
} //render

} //Data