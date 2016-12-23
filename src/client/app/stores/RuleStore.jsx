import { EventEmitter }  from  'events';
import dispatcher from '../dispatcher.jsx';
EventEmitter.prototype._maxListeners = 0;
class RuleStore extends EventEmitter {

constructor(){
super();
this.initializeData(); 

} //constructor


/*********initialize data*******************************************/
initializeData(){
 this.hidePos = -1;
 this.data = {
 
 "data": []

 } // this.jsondata
 

 this.data.data=dyn_dataToPost.data;

this.ruleSections = [];

//create rule section
this.createRuleSection();
//new rule adding info
this.addedRuleSec=-1;
this.addedRulePos=-1;


}




/*************method to create ruleSection**************************************/

createRuleSection(){


this.ruleSections = [];
let noOfRuleSet = Math.floor( this.data.data.length /50 );

if( (this.data.data.length % 50) >0){noOfRuleSet=noOfRuleSet + 1;}

for(let i=0;i<noOfRuleSet;i++){
  
    let start=i*50;
    let end=(i+1)*50;
    let rules=[];
    if( i == (noOfRuleSet-1) ){
      for(let j=start;j<this.data.data.length;j++){

           rules.push( this.data.data[j] );
         }
     this.ruleSections[i] = rules;

     }else{
      
      for(let j=start;j<end;j++){

           rules.push( this.data.data[j] );
         }
      this.ruleSections[i] = rules;   

     }
 
  
     

}//for

 



}//createRuleSection



getDataForSection(secName){

return this.ruleSections[secName];

}//getDataForFunction



getDataForRule(secName,currentPos){

let actualPos = secName*50 + currentPos;

return this.data.data[actualPos];
}//getDataForRule

getAddedRuleSection(){
return this.addedRuleSec;
}
getAddedRulePos(){
return this.addedRulePos;
}

resetTheAddedRulePos(){
 this.addedRuleSec=-1;
 this.addedRulePos=-1; 
}












getRuleData(){


 
  return this.data;
} //getRuleData

getHideRulsPos(){

  return this.hidePos;
} //getHideViewPos

addRuleToEnd(rule){

this.data.data.push(rule);
let prevRuleSectionLength = this.ruleSections.length;
this.createRuleSection();
this.addedRuleSec=this.ruleSections.length -1;
this.addedRulePos=this.ruleSections[this.addedRuleSec].length - 1;

if(prevRuleSectionLength==this.ruleSections.length){
  let secToUpdate = this.ruleSections.length -1;
  
  if(this.ruleSections.length==1){

   this.emit("change") 
   this.emit("ruleChange");
  }else{

  this.emit("section"+secToUpdate);
  this.emit("ruleChange");
  }
}else{
this.emit("change");
this.emit("ruleChange");
}

} //addRule

addRuleToBegining(rule){
this.emit("HideIfOpen");  
this.data.data.unshift(rule);
this.createRuleSection();
this.addedRuleSec=0;
this.addedRulePos=0;
this.emit("change");
this.emit("ruleChange");
}//addRuleToBegining

addRuleAfterSomeRuleFunction(rule,indexToInsert){
this.emit("HideIfOpen");
let secName = Math.floor( indexToInsert /50 );   
let temp=indexToInsert+1;

this.data.data.splice(temp,0,rule);

this.createRuleSection();
 this.addedRuleSec=secName;
 this.addedRulePos=(indexToInsert - 50*secName +1);
 if(secName == 0){
  this.emit("change");
}else{
  for(let i=secName;i<this.ruleSections.length;i++){

       this.emit("section"+i);
   }
}   

this.emit("ruleChange");
}

addRuleBeforeSomeRuleFunction(rule,indexToInsert){
this.emit("HideIfOpen");
let secName = Math.floor( indexToInsert /50 );
this.data.data.splice(indexToInsert,0,rule);
this.createRuleSection();
this.addedRuleSec=secName;
this.addedRulePos=(indexToInsert - 50*secName);
if(secName == 0){
  this.emit("change");
}else{
  for(let i=secName;i<this.ruleSections.length;i++){

       this.emit("section"+i);
   }
}   
this.emit("ruleChange");

}  

hideMoveUpView(secName,currentPos){

//emit the event
if(currentPos==0){ 
let prevSecName = secName - 1;  
this.emit("Hide"+prevSecName+"Rule"+ 49);
}else{
let prevPos = currentPos -1;
this.emit("Hide"+secName+"Rule"+prevPos);
}




}

hideMoveDownView(secName,currentPos){

//emit the event
if(currentPos==49){ 
let nextSecName = secName + 1;  
this.emit("Hide"+nextSecName+"Rule"+ 0);
}else{
let nextPos = currentPos +1;
this.emit("Hide"+secName+"Rule"+nextPos);
}




}

hideOpenedRule(){   
this.emit("HideIfOpen");      
}   


moveRuleUp(secName,currentPos){

let actualPos = secName*50 + currentPos;
let temp = this.data.data[actualPos];

this.data.data[actualPos] = this.data.data[actualPos-1];
this.data.data[actualPos-1] = temp;

//emit the event
if(currentPos==0){ 
let prevSecName = secName - 1;  
this.emit("Section"+prevSecName+"Rule"+ 49);
this.emit("Section"+secName+"Rule"+currentPos);
}else{

let prevPos = currentPos - 1 ;
  this.emit("Section"+secName+"Rule"+ prevPos);
  this.emit("Section"+secName+"Rule"+currentPos);
}

this.emit("ruleChange");
} //move rule up


moveRuleDown(secName,currentPos){
let actualPos = secName*50 + currentPos;
let temp = this.data.data[actualPos];
this.data.data[actualPos] = this.data.data[actualPos+1];
this.data.data[actualPos+1] = temp;
//emit the event
if(currentPos==49){ 
let nextSecName = secName + 1;  
this.emit("Section"+nextSecName+"Rule"+ 0);
this.emit("Section"+secName+"Rule"+currentPos);
}else{

let nextPos = currentPos + 1 ;
  this.emit("Section"+secName+"Rule"+ currentPos);
  this.emit("Section"+secName+"Rule"+ nextPos);
}

this.emit("ruleChange");
}

dragRule(secName,currentPos,newSecName,newPos){
 
let actualPos = secName*50 + currentPos;
let swapActualPos = newSecName*50 + newPos;

let temp =this.data.data[actualPos];
this.data.data[actualPos] = this.data.data[swapActualPos];
this.data.data[swapActualPos] = temp;
this.emit("Hide"+secName+"Rule"+currentPos);
this.emit("Hide"+secName+"Rule"+newPos);

this.emit("Section"+secName+"Rule"+ currentPos);
this.emit("Section"+newSecName+"Rule"+ newPos);

this.emit("ruleChange");
}

moveRuleAfterSomeRule(secName,currentPos,newSecName,newPos){



this.emit("HideIfOpen");  
let actualPos = secName*50 + currentPos;
let swapActualPos = newSecName*50 + newPos;
if(swapActualPos<actualPos){
  let temp = this.data.data[swapActualPos];
  this.data.data.splice(swapActualPos,1);
  this.data.data.splice(actualPos,0,temp);
}else{
  let temp = this.data.data[swapActualPos];
  this.data.data.splice(swapActualPos,1);
  this.data.data.splice(actualPos+1,0,temp);
}



this.createRuleSection();
let minSecName = secName<newSecName ?secName:newSecName;

  for(let i=minSecName;i<this.ruleSections.length;i++){

       this.emit("section"+i);
     }

 this.emit("ruleChange");    

}

moveRuleBeforeSomeRule(secName,currentPos,newSecName,newPos){

this.emit("HideIfOpen");  
let beforeMoveIndex  = secName*50 + currentPos;
let currentIndex = newSecName*50 + newPos;

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

this.createRuleSection();
let minSecName = secName<newSecName ?secName:newSecName;

  for(let i=minSecName;i<this.ruleSections.length;i++){

       this.emit("section"+i);
     }

this.emit("ruleChange");

}

deleteRule(secName,currentPos){
this.emit("HideIfOpen");  
let actualPos = secName*50 + currentPos;
this.data.data.splice(actualPos,1);
this.createRuleSection();

if( currentPos == 0 && (secName == this.ruleSections.length) ){

    this.emit("change");
}else if(this.ruleSections.length==1){
 this.emit("change") ;
}else{
  
   for(let i=secName;i<this.ruleSections.length;i++){

       this.emit("section"+i);
      }
}


this.emit("ruleChange");
}

changeRuleName(secName,currentPos,newName){

let actualRulePos = secName*50 + currentPos;
//update main data
this.data.data[actualRulePos]["ruleName"] = newName;
//update section data
//this.ruleSections[secName][currentPos]["ruleName"] = newName;  


this.emit("Section"+secName+"Rule"+currentPos);
this.emit("ruleChange");
} //end of  change RUleName

copyRule(secName,currentPos,ruleId,copyCreated){
let actualRulePos = secName*50 + currentPos;

let temp = JSON.parse(JSON.stringify(this.data.data[actualRulePos]));
this.data.data.push(temp);
this.data.data[this.data.data.length - 1]["id"] = ruleId;
this.data.data[this.data.data.length - 1]["ruleName"] = this.data.data[actualRulePos]["ruleName"] + " Clone "+copyCreated;

let prevRuleSectionLength = this.ruleSections.length;
this.createRuleSection();
this.addedRuleSec=this.ruleSections.length -1;
this.addedRulePos=this.ruleSections[this.addedRuleSec].length - 1;
if(prevRuleSectionLength==this.ruleSections.length){
  let secToUpdate = this.ruleSections.length -1;

  if(secToUpdate == 0){
    this.emit("change");
  }else{
   this.emit("section"+secToUpdate);
  }

}else{
this.emit("change");
}


this.emit("ruleChange");
} //end of copy rule

updateCreativeGroupToShow(secName,currentPos,newCreativeGroup){

let actualPos = secName*50 + currentPos;

 if(this.data.data[actualPos].creative_groups != undefined){
   this.data.data[actualPos].creative_groups = newCreativeGroup;
   }else{
      delete this.data.data[actualPos]["creative_group"];
      this.data.data[actualPos]["creative_groups"] = newCreativeGroup;
   }

this.emit("Section"+secName+"Rule"+currentPos);

}

updateIncludeAssetSources(secName,currentPos,newAssetSources){
let actualPos = secName*50 + currentPos; 
if(this.data.data[actualPos].reportConfig == undefined){
this.data.data[actualPos]["reportConfig"]={"includeAssetSources": newAssetSources};
}else if(this.data.data[actualPos].reportConfig.includeAssetSources == undefined){
this.data.data[actualPos]["reportConfig"]["includeAssetSources"] = newAssetSources;
}else{
this.data.data[actualPos].reportConfig.includeAssetSources = newAssetSources; 
}


this.emit("Section"+secName+"Rule"+currentPos);


}

addCondition(secName,currentPos,currentConditionObj,newCondition){


if(currentConditionObj.conditions){

currentConditionObj.conditions.push(newCondition);
} else {
  currentConditionObj["conditions"] = [newCondition];
  
}

this.emit("Section"+secName+"Rule"+currentPos);

} //end of add condition

updateConditionOperator(secName,currentPos,currentConditionObj,newOperator){
currentConditionObj["operator"]=newOperator;
this.emit("Section"+secName+"Rule"+currentPos);

}//endof update condition operator

deleteCondition(secName,currentPos,conditionParentObject,id)
{


conditionParentObject.conditions = conditionParentObject.conditions.filter( obj => obj.id!=id  );

this.emit("Section"+secName+"Rule"+currentPos);

} //delete Condition


updateTriggerService(secName,currentPos,triggerObject,newcomparator,newkey,defaultComboOption,pxIdx){

   if(triggerObject.pxIdx){
    delete triggerObject["pxIdx"];
   }

   var keys= Object.keys(triggerObject).filter((key)=>{
    if(key=="id" || key=="comparator" || key=="pxIdx" ){return false;}
    return true;
   });

   delete triggerObject[keys[0]];

   triggerObject["comparator"] = newcomparator;
   if(defaultComboOption!=""){
     triggerObject[newkey]=defaultComboOption;
     }else if(pxIdx!=""){

     triggerObject[newkey]="";
     triggerObject["pxIdx"] = pxIdx;
    }else{
     triggerObject[newkey]="";

    }
this.emit("Section"+secName+"Rule"+currentPos);
}


addTrigger(secName,currentPos,currentConditionObj,triggerObj,defaultComboOption){


currentConditionObj.selectors.push(triggerObj);

this.emit("Section"+secName+"Rule"+currentPos);
 

} //add trigger
addMultipleTrigger(secName,currentPos,currentConditionObj,triggerObjs){
if(triggerObjs.length>0){
 for(let i=0;i<triggerObjs.length;i++){

  currentConditionObj.selectors.push(triggerObjs[i]);
 }
 
this.emit("Section"+secName+"Rule"+currentPos);
 }
}

deletePxID(triggerObject){
delete triggerObject["pxIdx"];
}

deleteTrigger(secName,currentPos,conditionParentObject,id){

conditionParentObject.selectors =conditionParentObject.selectors.filter((obj) => obj.id!=id);
this.emit("Section"+secName+"Rule"+currentPos);
}

deleteMultipleTrigger(secName,currentPos,conditionParentObject,ids){
if(ids.length>0){  
conditionParentObject.selectors = conditionParentObject.selectors.filter((obj) => {
  
  if( ids.indexOf(obj.id)!=-1 ){
      return false;
    }else{
      return true;
    }


});
this.emit("Section"+secName+"Rule"+currentPos);
}

}


updateOperator(secName,currentPos,triggerObject,newOperator){

triggerObject["comparator"]=newOperator;
this.emit("Section"+secName+"Rule"+currentPos);
}//updateOperator

updateValue(secName,currentPos,triggerObject,newValue){

var keys= Object.keys(triggerObject).filter((key)=>{
    if(key=="id" || key=="comparator" || key=="pxIdx" ){return false;}
    return true;
   });

triggerObject[keys[0]] = newValue;

this.emit("Section"+secName+"Rule"+currentPos);

} //updateValue

//update value without emit
updateValueWithoutEmit(secName,currentPos,triggerObject,newValue){

var keys= Object.keys(triggerObject).filter((key)=>{
    if(key=="id" || key=="comparator" || key=="pxIdx" ){return false;}
    return true;
   });

triggerObject[keys[0]] = newValue;



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
  case "ADD_RULE_BEOFRE_SOME_RULE":
        this.addRuleBeforeSomeRuleFunction(action.rule,action.indexToInsert);
        break;        
  case "MOVE_RULE_AFTER_SOME_RULE" :
        this.moveRuleAfterSomeRule(action.secName,action.currentPos,action.newSecName,action.newPos);
        break;   
  case "MOVE_RULE_BEFORE_SOME_RULE" :
        this.moveRuleBeforeSomeRule(action.secName,action.currentPos,action.newSecName,action.newPos);
        break;         
  case "MOVE_RULE_UP" :
        this.moveRuleUp(action.secName,action.currentPos);  
        break;
  case "MOVE_RULE_DOWN" :
        this.moveRuleDown(action.secName,action.currentPos);
        break;
  case "DRAG_RULE" :
        this.dragRule(action.secName,action.currentPos,action.newSecName,action.newPos);
        break;      
  case "DELETE_RULE" :
        this.deleteRule(action.secName,action.currentPos); 
        break;
  case "CHANGE_RULE_NAME" :
         this.changeRuleName(action.secName,action.currentPos,action.newName);
         break;   
  case "COPY_RULE" :
         this.copyRule(action.secName,action.currentPos,action.ruleId,action.copyCreated);                 
          break;
  case "UPDATE_CREATIVE_GROUP" :
          this.updateCreativeGroupToShow(action.secName,action.currentPos,action.newCreativeGroup);
          break;  
  case "UPDATE_ASSET_SOURCE" :
          this.updateIncludeAssetSources(action.secName,action.currentPos,action.newAssetSources);
          break;
  case "ADD_CONDITION" :
          this.addCondition(action.secName,action.currentPos,action.currentConditionObj,action.newCondition);
          break;  
  case "HIDE_VIEW":
         //this.hideView(action.secName,action.currentPos);
         break;  
  case "UPDATE_CONDITION_OPERATOR":
         this.updateConditionOperator(action.secName,action.currentPos,action.currentConditionObj,action.newOperator);
         break;        
  case "DELETE_CONDITION":
         this.deleteCondition(action.secName,action.currentPos,action.conditionParentObject,action.id);
         break;  
  case "UPDATE_TRIGGER_SERVICE":
         this.updateTriggerService(action.secName,action.currentPos,action.triggerObject,action.newcomparator,action.newkey,action.defaultComboOption,action.pxIdx);
         break;
  case "UPDATE_OPERATOR":
        this.updateOperator(action.secName,action.currentPos,action.triggerObject,action.newOperator);
        break; 
  case "UPDATE_VALUE":
         this.updateValue(action.secName,action.currentPos,action.triggerObject,action.newValue);
         break;           
  case  "ADD_TRIGGER":
         this.addTrigger(action.secName,action.currentPos,action.currentConditionObj,action.triggerObj,action.defaultComboOption);  
         break; 
  case  "ADD_MULTIPLE_TRIGGER":
          this.addMultipleTrigger(action.secName,action.currentPos,action.currentConditionObj,action.triggerObjs);
          break;       
   case "DELETE_TRIGGER":
         this.deleteTrigger(action.secName,action.currentPos,action.conditionParentObject,action.id);    
         break;
   case "DELETE_MULTIPLE_TRIGGER":
         this.deleteMultipleTrigger(action.secName,action.currentPos,action.conditionParentObject,action.ids);   
         break;       
 }//switch

}//handleActions



} //RuleStore 


const ruleStore = new RuleStore;
dispatcher.register(ruleStore.handleActions.bind(ruleStore));


export default ruleStore; 