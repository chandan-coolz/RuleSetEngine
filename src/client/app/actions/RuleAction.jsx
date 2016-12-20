import dispatcher from '../dispatcher.jsx';

export function initializeData(data){

  dispatcher.dispatch({
    type:"INITIALIZE_DATA",
    data

  });
}


export function addRuleToEnd(rule){

	dispatcher.dispatch({
    type:"ADD_RULE_END",
    rule

	});
}

export  function addRuleToBegining(rule){
  dispatcher.dispatch({
    type:"ADD_RULE_BEGINING",
    rule

  });


}

export function addRuleAfterSomeRuleFunction(rule,indexToInsert){
  dispatcher.dispatch({
    type:"ADD_RULE_AFTER_SOME_RULE",
    rule,
    indexToInsert

  });


}

export function addRuleBeforeSomeRuleFunction(rule,indexToInsert){
  dispatcher.dispatch({
    type:"ADD_RULE_BEOFRE_SOME_RULE",
    rule,
    indexToInsert

  });


}

export function moveRuleAfterSomeRule(secName,currentPos,newSecName,newPos){

  dispatcher.dispatch({
    type:"MOVE_RULE_AFTER_SOME_RULE",
    secName,
    currentPos,
    newSecName,
    newPos

    

  });


}

export function moveRuleBeforeSomeRule(secName,currentPos,newSecName,newPos){

  dispatcher.dispatch({
    type:"MOVE_RULE_BEFORE_SOME_RULE",
    secName,
    currentPos,
    newSecName,
    newPos
    

  });


}




export function moveRuleUp(secName,currentPos){

   dispatcher.dispatch({
     type:"MOVE_RULE_UP",
     secName,
     currentPos
   });

}



export function moveRuleDown(secName,currentPos){

     dispatcher.dispatch({
     type:"MOVE_RULE_DOWN",
     secName,
     currentPos

    });

}

export function dragRule(secName,currentPos,newSecName,newPos){

     dispatcher.dispatch({
     type:"DRAG_RULE",
     secName,
     currentPos,
     newSecName,
     newPos

    });

}

export function deleteRule(secName,currentPos){
    dispatcher.dispatch({
      type:"DELETE_RULE",
      secName,
      currentPos

    });;

}

export function changeRuleName(secName,currentPos,newName){
    dispatcher.dispatch({
      type:"CHANGE_RULE_NAME",
      secName,
      currentPos,
      newName

    });;

}


export function copyRule(secName,currentPos,ruleId,copyCreated){
    dispatcher.dispatch({
      type:"COPY_RULE",
      secName,
      currentPos,
      ruleId,
      copyCreated

    });;

}



export function updateCreativeGroupToShow(secName,currentPos,newCreativeGroup){

   dispatcher.dispatch({
     type:"UPDATE_CREATIVE_GROUP",
     secName,
     currentPos,
     newCreativeGroup
   });

}
export function updateIncludeAssetSources(secName,currentPos,newAssetSources){

   dispatcher.dispatch({
     type:"UPDATE_ASSET_SOURCE",
     secName,
     currentPos,
     newAssetSources
   });

}


export function addCondition(secName,currentPos,currentConditionObj,newCondition){

	dispatcher.dispatch({
      type:"ADD_CONDITION",
      secName,
      currentPos,
      currentConditionObj,
      newCondition


	});
}

/*export function hideView(secName,currentPos){

	dispatcher.dispatch({
     type:"HIDE_VIEW",
     secName,
     currentPos
     

	});
}*/

export function updateConditionOperator(secName,currentPos,currentConditionObj,newOperator){

  dispatcher.dispatch({
      type:"UPDATE_CONDITION_OPERATOR",
      secName,
      currentPos,
      currentConditionObj,
      newOperator


  });
}

export function deleteCondition(secName,currentPos,conditionParentObject,id){

	 dispatcher.dispatch({
     type:"DELETE_CONDITION",
     secName,
     currentPos,
     conditionParentObject,
     id

	});
}


export function  updateTriggerServiceName(secName,currentPos,triggerObject,newcomparator,newkey,defaultComboOption,pxIdx){

  dispatcher.dispatch({
   type:"UPDATE_TRIGGER_SERVICE",
   secName,
   currentPos,
   triggerObject,
   newcomparator,
   newkey,
   defaultComboOption,
   pxIdx
  });

}

export function updateOperator(secName,currentPos,triggerObject,newOperator){

  dispatcher.dispatch({ 
   type:"UPDATE_OPERATOR",
   secName,
   currentPos,
   triggerObject,
   newOperator

  });
}

export function updateValue(secName,currentPos,triggerObject,newValue){

dispatcher.dispatch({
 type:"UPDATE_VALUE",
 secName,
 currentPos,
 triggerObject,
 newValue



});



}



export function addTrigger(secName,currentPos,currentConditionObj,triggerObj,defaultComboOption){

 dispatcher.dispatch({
  type:"ADD_TRIGGER",
  secName,
  currentPos,
  currentConditionObj,
  triggerObj,
  defaultComboOption



 });


}

export function addMultipleTrigger(secName,currentPos,currentConditionObj,triggerObjs){

  dispatcher.dispatch({
  type:"ADD_MULTIPLE_TRIGGER",
  secName,
  currentPos,
  currentConditionObj,
  triggerObjs



 });


}

export function deleteTrigger(secName,currentPos,conditionParentObject,id ){

 dispatcher.dispatch({
  type:"DELETE_TRIGGER",
  secName,
  currentPos,
  conditionParentObject,
  id


 });

}

export function deleteMultipleTrigger(secName,currentPos,conditionParentObject,ids ){

 dispatcher.dispatch({
  type:"DELETE_MULTIPLE_TRIGGER",
  secName,
  currentPos,
  conditionParentObject,
  ids


 });

}
