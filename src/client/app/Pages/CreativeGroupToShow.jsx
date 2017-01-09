import React from 'react';
import {render} from 'react-dom';
import {updateCreativeGroupToShow}  from '../actions/RuleAction.jsx';
import tempDataStore from '../stores/tempDataStore.jsx';

export default class CreativeGroupToShow extends React.Component {

constructor(){
super();
this.state = {
  isToShowOptions : false,
  selectText : "-- Select Groups --",
  creativeGroups:[]
};
this.isZindexChanged = false;
this.isFirstTimeCalled = false;
this.deletedCreativeAssetGroup = [];
this.assestsList = [];
}

buttonToggleClicked(){
 if(this.assestsList.length > 0){


  if(!this.isZindexChanged && !this.isFirstTimeCalled){
     this.isZindexChanged = true;  
     this.isFirstTimeCalled = true;
     this.state.isToShowOptions = true;
     this.props.changeZIndex();
     
   }else if(this.isFirstTimeCalled && this.isZindexChanged){
     this.isZindexChanged = false;  
     this.isFirstTimeCalled = false;
     this.state.isToShowOptions = false;
     this.props.changeZIndex();
     
   }
}


}//buttonToggleClicked


componentWillMount() {

  
 if(this.props.creativeGroups == undefined) {

      let tempCreativeGroup = [];
     if(this.props.creativeGroup !=undefined){ tempCreativeGroup.push(this.props.creativeGroup);}
        this.setState({creativeGroups:tempCreativeGroup})
        updateCreativeGroupToShow(this.props.secName,this.props.rulePosition,tempCreativeGroup);
  }else{


    this.setState({creativeGroups:this.props.creativeGroups})
  }

//

}//componentWillMount


componentWillReceiveProps(newProps) { 
 
 if(this.state.isToShowOptions && !newProp.isToShowCreativeGroup){
   this.state.isToShowOptions = false;
  }

 if(newProps.creativeGroups == undefined) {

      let tempCreativeGroup = [];
      if(newProps.creativeGroup !=undefined){tempCreativeGroup.push(newProps.creativeGroup);}
      this.setState({creativeGroups:tempCreativeGroup})
  }else{

    this.setState({creativeGroups:newProps.creativeGroups})
  }

}//componentWillReceiveProps





componentDidMount(){

 if(this.refs.selectText.value == '-- No Asset Groups --'){
  this.refs.selectText.style.color = '#ddd';
 }

let keys = Object.keys(this.refs);
for(let i=0;i<keys.length;i++){
this.refs[keys[i]].checked = false;
}

for(let i=0;i<this.state.creativeGroups.length;i++){  

  this.refs[this.state.creativeGroups[i]].checked = true; 
 
}

  let tempSelectText = "changed";
  this.setState({selectText:tempSelectText})  ;

 
}//componentDidMount()

componentDidUpdate(prevProps, prevState){

this.state.isToShowOptions

if(this.refs.selectText.value == '-- No Asset Groups --'){
  this.refs.selectText.style.color = '#ddd';
 }else{
  this.refs.selectText.style.color = '#373D3F';
 }

let keys = Object.keys(this.refs);
for(let i=0;i<keys.length;i++){
this.refs[keys[i]].checked = false;
}

 for(let i=0;i<this.state.creativeGroups.length;i++){

     this.refs[this.state.creativeGroups[i]].checked = true; 

}



 if(this.state.isToShowOptions){
  this.refs.creativeGroupToShow.focus();
 }


}




checkBoxChanged(isChecked,groupName){

let tmpCreativeGroup = JSON.parse(JSON.stringify(this.state.creativeGroups));

    if(isChecked){
       tmpCreativeGroup.push(groupName);
       this.refs[groupName].checked = true;
    }else{
      var index = tmpCreativeGroup.indexOf(groupName);
      tmpCreativeGroup.splice(index,1);
      this.refs[groupName].checked = false;
    }

 this.state.creativeGroups = tmpCreativeGroup;
 updateCreativeGroupToShow(this.props.secName,this.props.rulePosition,tmpCreativeGroup);
}

checkedAll(){

  let keys = Object.keys(this.refs);
  keys.splice(keys.indexOf("selectText"),1);
  keys.splice(keys.indexOf("creativeGroupToShow"),1);
  let tmpCreativeGroup = []; 
  for(let i=0;i<keys.length;i++){
     
       this.refs[keys[i]].checked = true;
       tmpCreativeGroup.push( keys[i] );
     
     }

  updateCreativeGroupToShow(this.props.secName,this.props.rulePosition,tmpCreativeGroup);

}//CheckedAll

unCheckedAll(){

  let keys = Object.keys(this.refs);
  keys.splice(keys.indexOf("selectText"),1);
  keys.splice(keys.indexOf("creativeGroupToShow"),1);
  let tmpCreativeGroup = []; 
  for(let i=0;i<keys.length;i++){
     
       this.refs[keys[i]].checked = false;
     }

 updateCreativeGroupToShow(this.props.secName,this.props.rulePosition,tmpCreativeGroup);
  
}//unCheckedAll

hideCreativeGroupToShow(e){

  if(this.isFirstTimeCalled && this.isZindexChanged){
     this.isZindexChanged = false;  
     this.isFirstTimeCalled = false;
     this.state.isToShowOptions=false;
     this.props.changeZIndex();
   }


}

closeCreativeGroupOption(){
  //this.props.changeZIndex();
  this.setState({isToShowOptions:false});
}



render(){

/**************************check for assetGroup delete **************************************/
this.deletedCreativeAssetGroup = tempDataStore.getDeletedCreativeAssetGroup(""+this.props.secName+this.props.rulePosition);
let tempForDeletedAssetGroup = this.state.creativeGroups.filter( (groupName)=>{

    for(let i=0;i< dyn_assetGroups.length ;i++){

            if(groupName ==  dyn_assetGroups[i].groupName){
              return false;
            }
       }

 return true;
});

for(let i=0;i<tempForDeletedAssetGroup.length;i++){
  if( this.deletedCreativeAssetGroup.indexOf(tempForDeletedAssetGroup[i]) == -1){
     this.deletedCreativeAssetGroup.push(tempForDeletedAssetGroup[i]);
   }

}

/********check for restore********************************************************/

let tempForRestoreAssetGroup = this.deletedCreativeAssetGroup.filter( (groupName)=>{

    for(let i=0;i< dyn_assetGroups.length ;i++){

            if(groupName ==  dyn_assetGroups[i].groupName){
              return true;
            }
       }

 return false;
});

for(let i=0;i<tempForRestoreAssetGroup.length;i++){

   let index = this.deletedCreativeAssetGroup.indexOf(tempForRestoreAssetGroup[i]);
   this.deletedCreativeAssetGroup.splice(index,1);

}

tempDataStore.setDeletedCreativeAssetGroup(""+this.props.secName+this.props.rulePosition,this.deletedCreativeAssetGroup);

/****************************************************************************************/
  let selectText = "";
  if(this.state.creativeGroups.length==0){
       selectText = "-- Select Groups --";
  }else if(this.state.creativeGroups.length==1){
    selectText = this.state.creativeGroups[0];
  }else{
       selectText = this.state.creativeGroups.length+" of "+ dyn_assetGroups.length + " Groups Selected";
  }
  
var  optionClass= this.state.isToShowOptions == true?"options" : "hide";
this.assestsList = [];
this.assestsList = dyn_assetGroups.map( (obj,i) => 

    
    <li key={i}>
     <div className="checkbox" >
         <span className="checkbox-border"></span>
         <label >  
          <input type="checkbox" 
          ref={obj.groupName} onChange={(e) => {this.checkBoxChanged(e.target.checked,obj.groupName)} }/>
          <span onMouseOver={(e)=> { getOverflowContent($(e.target), '', $(e.target) ) ;  } }>{obj.groupName}</span>
        </label>
     </div>
     
    </li>         
                 
);

for(let i=0;i<this.deletedCreativeAssetGroup.length;i++){

  this.assestsList.push(
     <li key={this.deletedCreativeAssetGroup+i}>
     <div className="checkbox" >
         <span className="checkbox-border"></span>
         <label >  
          <input type="checkbox" onChange={(e) => this.checkBoxChanged(e.target.checked,this.deletedCreativeAssetGroup[i])}
           ref={this.deletedCreativeAssetGroup[i]}
           />
          <span onMouseOver={(e)=> { getOverflowContent($(e.target), '', $(e.target) ) ;  } }>{this.deletedCreativeAssetGroup[i]} </span>
         </label> 
          <span className="recordDeleted" >
           <a  className="error">
            <i className="fa fa-exclamation" aria-hidden="true"></i>
           </a> 
         </span> 

        
     </div>
     
    </li>     

    );

}

/**check weather asset list is empty or not******************/
if(this.assestsList.length<1){

selectText="-- No Asset Groups --";
}



return(

 <div className="creative-group-to-show">

  <input type="text" ref="selectText" readOnly value={selectText}></input>

  <span onClick={this.buttonToggleClicked.bind(this)}
   onMouseOver={ (e)=>{ if(this.state.creativeGroups.length > 0) {showMessageToolTip($(e.target),  "<ol><li>" + this.state.creativeGroups.join("</li><li>") + "</li></ol>", "groupSelectionQtipLeft");} } } 
   onMouseLeave={(e)=>{ $('.media-plan-tooltip').hide();}}
   >
   
  <span className="arrow-down"></span></span>

  <div className={optionClass}  tabIndex="0" onBlur={this.hideCreativeGroupToShow.bind(this)}
   ref="creativeGroupToShow">
     <p><span onClick={this.checkedAll.bind(this)}>
      <i className="fa fa-check" aria-hidden="true"></i>
      <span>Check all</span>
     </span>
     <span onClick={this.unCheckedAll.bind(this)}>
      <i className="fa fa-times" aria-hidden="true"></i>
      <span>Uncheck all</span>
     </span>
     <span className="close-icon">
       
       <i className="ui-icon ui-icon-circle-close" aria-hidden="true" onClick={this.closeCreativeGroupOption.bind(this)}></i>
     </span>
     
    </p> 
  <ul>

   {this.assestsList}

  </ul>
  </div>


 </div>
);
}//render

}//end of class 