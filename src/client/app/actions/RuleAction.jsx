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

export function moveRuleAfterSomeRule(afterMoveIndex,currentIndex){

  dispatcher.dispatch({
    type:"MOVE_RULE_AFTER_SOME_RULE",
    afterMoveIndex,
    currentIndex
    

  });


}

export function moveRuleBeforeSomeRule(beforeMoveIndex,currentIndex){

  dispatcher.dispatch({
    type:"MOVE_RULE_BEFORE_SOME_RULE",
    beforeMoveIndex,
    currentIndex
    

  });


}




export function moveRuleUp(currentPos){

   dispatcher.dispatch({
     type:"MOVE_RULE_UP",
     currentPos
   });

}


export function moveRuleDown(currentPos){

     dispatcher.dispatch({
     type:"MOVE_RULE_DOWN",
     currentPos

    });

}

export function dragRule(currentPos,newPos){

     dispatcher.dispatch({
     type:"DRAG_RULE",
     currentPos,
     newPos

    });

}

export function deleteRule(currentPos){
    dispatcher.dispatch({
      type:"DELETE_RULE",
      currentPos

    });;

}

export function changeRuleName(currentPos,newName){
    dispatcher.dispatch({
      type:"CHANGE_RULE_NAME",
      currentPos,
      newName

    });;

}


export function copyRule(currentPos,ruleId,copyCreated){
    dispatcher.dispatch({
      type:"COPY_RULE",
      currentPos,
      ruleId,
      copyCreated

    });;

}

export function copyRule(currentPos,ruleId,copyCreated){
    dispatcher.dispatch({
      type:"COPY_RULE",
      currentPos,
      ruleId,
      copyCreated

    });;

}

export function addCondition(currentConditionObj,newCondition){

	dispatcher.dispatch({
      type:"ADD_CONDITION",
      currentConditionObj,
      newCondition


	});
}

export function hideView(i){

	dispatcher.dispatch({
     type:"HIDE_VIEW",
     i

	});
}

export function updateConditionOperator(currentConditionObj,newOperator){

  dispatcher.dispatch({
      type:"UPDATE_CONDITION_OPERATOR",
      currentConditionObj,
      newOperator


  });
}

export function deleteCondition(conditionParentObject,id){

	 dispatcher.dispatch({
     type:"DELETE_CONDITION",
     conditionParentObject,
     id

	});
}


export function  updateTriggerServiceName(triggerObject,newcomparator,newkey){

  dispatcher.dispatch({
   type:"UPDATE_TRIGGER_SERVICE",
   triggerObject,
   newcomparator,
   newkey
  });

}

export function updateOperator(triggerObject,newOperator){

  dispatcher.dispatch({ 
   type:"UPDATE_OPERATOR",
   triggerObject,
   newOperator

  });
}

export function updateValue(triggerObject,newValue){

dispatcher.dispatch({
 type:"UPDATE_VALUE",
 triggerObject,
 newValue



});



}



export function addTrigger(currentConditionObj,triggerObj){

 dispatcher.dispatch({
  type:"ADD_TRIGGER",
  currentConditionObj,
  triggerObj



 });


}


export function deleteTrigger(conditionParentObject,id ){

 dispatcher.dispatch({
  type:"DELETE_TRIGGER",
  conditionParentObject,
  id


 });

}
