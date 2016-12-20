class TempDataStore{

constructor(){

this.initializeData();

}

initializeData(){

this.deletedIncludeAssetSource ={};	
this.deletedCreativeAssetGroup = [];
this.rulesHaveingIncludedAssetSourceChecked = [];	
this.draggedRuleInfo = {};
}



setDeletedIncludeAssetSource(key,value){

this.deletedIncludeAssetSource[key] = value;

}

getDeletedIncludeAssetSource(key){

  if(this.deletedIncludeAssetSource[key]){
    return this.deletedIncludeAssetSource[key];
  }else{
    return [];
  }

}

setDeletedCreativeAssetGroup(value){
this.deletedCreativeAssetGroup = value;	
}

getDeletedCreativeAssetGroup(){
return this.deletedCreativeAssetGroup;
}


setRulesHaveingIncludedAssetSourceChecked(value,isItOnPageLoad){
	let previousLength = this.rulesHaveingIncludedAssetSourceChecked.length;
     if(this.rulesHaveingIncludedAssetSourceChecked.indexOf(value) == -1){
	    this.rulesHaveingIncludedAssetSourceChecked.push(value);
	  }
	if(!isItOnPageLoad){
		$("#reportingKeyFormat").data("selectBox-selectBoxIt").selectOption("ruleDefined");
		$(".jvx-message.campaign-warning-message").html("Note : Reporting Key Format is changed to Rule Defined.");
    $(".jvx-message.campaign-warning-message").css('display' , 'block');
    
	}
}

removeRulesHaveingIncludedAssetSourceChecked(value,isItOnPageLoad){
	let index = this.rulesHaveingIncludedAssetSourceChecked.indexOf(value);
  if(index != -1){
  	this.rulesHaveingIncludedAssetSourceChecked.splice(index,1);
   }
   if(this.rulesHaveingIncludedAssetSourceChecked.length==0){
   	$("#reportingKeyFormat").data("selectBox-selectBoxIt").selectOption("all");
   	$(".jvx-message.campaign-warning-message").html("Note : Reporting Key Format is changed to All.");
    if(!isItOnPageLoad){
     $(".jvx-message.campaign-warning-message").css('display' , 'block');
    }
   }
}

/*doAnyIncludeAssetSourceChecked(){
  if(this.rulesHaveingIncludedAssetSourceChecked.length>0){
    if($("#reportingKeyFormat").val() != "ruleDefined"){
       $("#reportingKeyFormat").data("selectBox-selectBoxIt").selectOption("ruleDefined");
       $(".jvx-message.campaign-warning-message").html("Note : Reporting Key Format is changed to Rule Defined.");
       $(".jvx-message.campaign-warning-message").css('display' , 'block');
     }
   }
}*/

/*********drag rule related info *************************/
setDraggedRuleInfo(ruleName,secName,rulePosition){
  this.draggedRuleInfo={};
  this.draggedRuleInfo["ruleName"] = ruleName;
  this.draggedRuleInfo["secName"] = secName;
  this.draggedRuleInfo["rulePosition"] = rulePosition;
}

getDraggedRuleInfo(){
  return this.draggedRuleInfo;
}

}//Rule

const tempDataStore = new  TempDataStore;

export default  tempDataStore;