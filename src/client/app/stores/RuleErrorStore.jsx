import { EventEmitter }  from  'events';
import dispatcher from '../dispatcher.jsx';
import RuleStore from './RuleStore.jsx';
EventEmitter.prototype._maxListeners = 0;

class RuleErrorStore extends EventEmitter {

constructor(){
super();
this.initializeData(); 

} //constructor

initializeData(){
this.RulesWithError = [];
this.ConditionsWithError = [];
this.TriggersWithError = [];
this.TriggerWithErrorIds = [];
this.EvaluateError = false;

}

isEvaluateError(){
	return this.EvaluateError;
}


validateRule(){

/**************make a ajax call to get data from the server***********************************/
$("#info-modal").find(".message").html("Validating Rules. Please wait..." ).end().show("blind", {direction: "up"}, 400);
RuleStore.hideOpenedRule();
/****to get timeOffsetZone*****/
var d = new Date()
var timeoffsetZone = d.getTimezoneOffset();

var xhttp = new XMLHttpRequest();

var dataToBeValidated =JSON.stringify(dyn_dataToPost);
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        
         var errorData = JSON.parse(xhttp.responseText) ;
         this.RulesWithError = [];
         this.ConditionsWithError = [];
         this.TriggersWithError = [];
         this.TriggerWithErrorIds = [];
         /*******after getting data process the data**************/

         let keys = Object.keys(errorData);	
         if(keys[0]=="error"){
         	keys=[];
         }

         if(keys.length>0){
         	this.EvaluateError=true;
            for(let i=0;i<keys.length;i++){
               this.checkForErrorIds(errorData,keys[i],keys[i]);
               this.RulesWithError.push(keys[i]);
            }
   
        }

     //   this.emit("ruleErrorCheck");
        $("#info-modal").hide("blind", {direction: "down"}, 400);
    }
  }.bind(this);

xhttp.open("POST", "/studio/api/dynamicDataServices.php", false);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("service=validateRules"+"&dynamicConfig="+dataToBeValidated+"&adId="+$("#adId").val()+"&tz="+timeoffsetZone);




/********************************************************************************************/




}//validateRule


checkForErrorIds(obj,key,ruleID){

if( key.indexOf("TRI-") == -1){
	if(key!=ruleID){
      this.ConditionsWithError.push(key);
    }
      let keys = Object.keys(obj[key]);
       if(keys.length>0){
         
         for(let i=0;i<keys.length;i++){
           this.checkForErrorIds(obj[key],keys[i],ruleID);        
         }
     
      }else{
      	return;
     }

 }else{

  let triggerValueObject = obj[key][Object.keys(obj[key])[0]];

 	//add it to trigger list
	let temp = {};
	this.TriggerWithErrorIds.push(key);
 	temp["id"] = key; 

  
  if(  triggerValueObject.errorData instanceof Array ){
 
     temp["msg"]= triggerValue.join(",")+" is wrong"; 


  this.TriggersWithError.push(temp);*/
 	return;
 }  


}//chekForErrorIds


chekIfThereIsErrorForIds(id,type){
	switch(type){
    case "Rule":
         if( this.RulesWithError.indexOf(id) != -1){
           return true;
         }else{
         	return false;
         }
      break;
    case "Condition":
         if( this.ConditionsWithError.indexOf(id) != -1){
           return true;
         }else{
         	return false;
         }
      break;   
    case "Trigger":
           let index = this.TriggerWithErrorIds.indexOf(id);
          if( index != -1){
            return this.TriggersWithError[index];
         }else{
         	return "";
         }  

	}//switch
}//chekIfThereIsErrorForIds



}//ruleErrorStore

const ruleErrorStore = new RuleErrorStore;
export default ruleErrorStore;	