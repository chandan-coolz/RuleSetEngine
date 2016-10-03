import { EventEmitter }from  'events';
import dispatcher from '../dispatcher.jsx';

class RuleStore extends EventEmitter {

constructor(){
super();
  this.hidePos = -1;
  
  this.data = {
 
 "data": []

 } // this.jsondata

 this.data.data=dyn_dataToPost.data;
 
} //constructor


initializeData(data){

//console.log(data);
}

getRuleData(){


 
	return this.data;
} //getRuleData

getHideRulsPos(){

  return this.hidePos;
} //getHideViewPos

addRuleToEnd(rule){

this.data.data.push(rule);
this.emit("change");

} //addRule

addRuleToBegining(rule){
this.data.data.unshift(rule);
this.emit("change");
}//addRuleToBegining

addRuleAfterSomeRuleFunction(rule,indexToInsert){
 
this.data.data.splice(indexToInsert,0,rule);
this.emit("change");

}


moveRuleUp(currentPos){
let temp = this.data.data[currentPos];
this.data.data[currentPos] = this.data.data[currentPos-1];
this.data.data[currentPos-1] = temp;
this.emit("change"); 
/* this.data.data.splice(currentPos,1);
this.data.data.splice((currentPos -1),0,temp);
this.emit("change"); */
} //move rule up


moveRuleDown(currentPos){

let temp = this.data.data[currentPos];
this.data.data[currentPos] = this.data.data[currentPos+1];
this.data.data[currentPos+1] = temp;
this.emit("change");

}

dragRule(currentPos,newPos){

let temp =this.data.data[currentPos];
this.data.data[currentPos] = this.data.data[newPos];
this.data.data[newPos] = temp;
this.emit("change");

}

moveRuleAfterSomeRule(afterMoveIndex,currentIndex){

let temp = this.data.data[currentIndex];
this.data.data.splice(currentIndex,1);
this.data.data.splice(afterMoveIndex,0,temp);
this.emit("change");

}

moveRuleBeforeSomeRule(beforeMoveIndex,currentIndex){
 if(beforeMoveIndex===0){
     let temp = this.data.data[currentIndex];
     this.data.data.splice(currentIndex,1);
     this.data.data.unshift(temp);
   }else if(currentIndex < beforeMoveIndex){
     let temp = this.data.data[currentIndex];
     this.data.data.splice(currentIndex,1);
     this.data.data.splice(beforeMoveIndex-1,0,temp);

   }else {
     
     let temp = this.data.data[currentIndex];
     this.data.data.splice(currentIndex,1);
     this.data.data.splice(beforeMoveIndex,0,temp);
   }
this.emit("change");
}

deleteRule(currentPos){

this.data.data.splice(currentPos,1);
this.emit("change");
}

changeRuleName(currentPos,newName){

this.data.data[currentPos]["ruleName"] = newName;

this.emit("change");
} //end of  change RUleName

copyRule(currentPos,ruleId,copyCreated){

let temp = JSON.parse(JSON.stringify(this.data.data[currentPos]));
this.data.data.push(temp);
this.data.data[this.data.data.length - 1]["id"] = ruleId;
this.data.data[this.data.data.length - 1]["ruleName"] = this.data.data[currentPos]["ruleName"] + " Clone "+copyCreated;



this.emit("change");

} //end of copy rule


addCondition(currentConditionObj,newCondition){


if(currentConditionObj.conditions){

currentConditionObj.conditions.push(newCondition);
} else {
	currentConditionObj["conditions"] = [newCondition];
	
}
this.emit("change");
} //end of add condition

updateConditionOperator(currentConditionObj,newOperator){
currentConditionObj["operator"]=newOperator;
this.emit("change");
}//endof update condition operator

deleteCondition(conditionParentObject,id)
{


conditionParentObject.conditions = conditionParentObject.conditions.filter( obj => obj.id!=id  );

this.emit("change");

} //delete Condition


updateTriggerService(triggerObject,newcomparator,newkey){

   

   triggerObject["comparator"] = newcomparator;
   delete triggerObject[Object.keys(triggerObject)[2]];
   triggerObject[newkey]="";
   this.emit("change");
}


addTrigger(currentConditionObj,triggerObj){


currentConditionObj.selectors.push(triggerObj);

this.emit("change");
 

} //add trigger


deleteTrigger(conditionParentObject,id){

conditionParentObject.selectors =conditionParentObject.selectors.filter((obj) => obj.id!=id);
this.emit("change");
}

updateOperator(triggerObject,newOperator){

triggerObject["comparator"]=newOperator;
this.emit("change");

}//updateOperator

updateValue(triggerObject,newValue){

let key = Object.keys(triggerObject);
triggerObject[key[2]] = newValue;
this.emit("change");

} //updateValue



handleActions(action){
 switch(action.type){

  case "ADD_RULE_END" :
        this.addRuleToEnd(action.rule);
        break;
  case  "INITIALIZE_DATA" :
         this.initializeData(action.data);
        break;      
  case "ADD_RULE_BEGINING" :
        this.addRuleToBegining(action.rule);
        break;
  case "ADD_RULE_AFTER_SOME_RULE" :
        this.addRuleAfterSomeRuleFunction(action.rule,action.indexToInsert);
        break;
  case "MOVE_RULE_AFTER_SOME_RULE" :
        this.moveRuleAfterSomeRule(action.afterMoveIndex,action.currentIndex);
        break;   
  case "MOVE_RULE_BEFORE_SOME_RULE" :
        this.moveRuleBeforeSomeRule(action.beforeMoveIndex,action.currentIndex);
        break;         
  case "MOVE_RULE_UP" :
        this.moveRuleUp(action.currentPos);  
        break;
  case "MOVE_RULE_DOWN" :
        this.moveRuleDown(action.currentPos);
        break;
  case "DRAG_RULE" :
        this.dragRule(action.currentPos,action.newPos);
        break;      
  case "DELETE_RULE" :
        this.deleteRule(action.currentPos); 
        break;
  case "CHANGE_RULE_NAME" :
         this.changeRuleName(action.currentPos,action.newName);
         break;   
  case "COPY_RULE" :
         this.copyRule(action.currentPos,action.ruleId,action.copyCreated);                 
          break;
  case "ADD_CONDITION" :
          this.addCondition(action.currentConditionObj,action.newCondition);
          break;  
  case "HIDE_VIEW":
         this.hidePos = action.i;
         this.emit("change");
         break;  
  case "UPDATE_CONDITION_OPERATOR":
         this.updateConditionOperator(action.currentConditionObj,action.newOperator);
         break;        
  case "DELETE_CONDITION":
         this.deleteCondition(action.conditionParentObject,action.id);
         break;  
  case "UPDATE_TRIGGER_SERVICE":
         this.updateTriggerService(action.triggerObject,action.newcomparator,action.newkey);
         break;
  case "UPDATE_OPERATOR":
        this.updateOperator(action.triggerObject,action.newOperator);
        break; 
  case "UPDATE_VALUE":
         this.updateValue(action.triggerObject,action.newValue);
         break;           
  case  "ADD_TRIGGER":
         this.addTrigger(action.currentConditionObj,action.triggerObj);  
         break; 
   case "DELETE_TRIGGER":
         this.deleteTrigger(action.conditionParentObject,action.id);           
 }//switch

}//handleActions



} //RuleStore	


const ruleStore = new RuleStore;
dispatcher.register(ruleStore.handleActions.bind(ruleStore));


export default ruleStore;	