import React from 'react';
import {render} from 'react-dom';

export default class CreativeGroupToShow extends React.Component {

constructor(){
super();
this.state = {
	isToShowOptions : false,
	selectText : "-- Select Groups --"
}

}

buttonToggleClicked(){
this.props.changeZIndex();
let temp =!this.state.isToShowOptions
this.setState({isToShowOptions:temp});

}//buttonToggleClicked



checkBoxChanged(isChecked,groupName){



    if(isChecked){
    	this.props.creativeGroups.push(groupName);
    }else{
      var index = this.props.creativeGroups.indexOf(groupName);
      this.props.creativeGroups.splice(index,1);
    }
 let tempSelectText = this.props.creativeGroups.length+" of "+ dyn_assetGroups.length + " Groups Selected";
 this.setState({selectText:tempSelectText})

}

checkedAll(){

  let keys = Object.keys(this.refs);
  this.props.creativeGroups.splice(0,keys.length);  
  for(let i=0;i<keys.length;i++){
     
       this.refs[keys[i]].checked = true;
       this.props.creativeGroups.push( dyn_assetGroups[i].groupName );
     
     }
 let tempSelectText = this.props.creativeGroups.length+" of "+ dyn_assetGroups.length + " Groups Selected";
 this.setState({selectText:tempSelectText})  
	
}//CheckedAll

unCheckedAll(){

  let keys = Object.keys(this.refs);
  this.props.creativeGroups.splice(0,keys.length);
  for(let i=0;i<keys.length;i++){
     
       this.refs[keys[i]].checked = false;
     }
  let tempSelectText = "-- Select Groups --";
  this.setState({selectText:tempSelectText}) ;

	
}//unCheckedAll


render(){

var  optionClass= this.state.isToShowOptions == true?"options" : "hide";
var assestsList = dyn_assetGroups.map( (obj,i) => 

    <li key={i}><div className="checkbox" ><input type="checkbox" id={obj.groupName}
          ref={"group"+i} onChange={(e) => this.checkBoxChanged(e.target.checked,obj.groupName)} />
    <label htmlFor={obj.groupName}></label>
    </div>
     {obj.groupName}
    </li>         
                 
);




return(

 <div className="creative-group-to-show">

  <input type="text" readOnly value={this.state.selectText}></input>

  <button onClick={this.buttonToggleClicked.bind(this)}><span className="arrow-down"></span></button>


  <div className={optionClass}>
     <p><span onClick={this.checkedAll.bind(this)}>
      <i className="fa fa-check" aria-hidden="true"></i>
      Check all
     </span>
     <span onClick={this.unCheckedAll.bind(this)}>
      <i className="fa fa-times" aria-hidden="true"></i>
      Uncheck all
     </span>
     <i className="fa fa-times-circle-o" aria-hidden="true" onClick={this.buttonToggleClicked.bind(this)}></i>
    </p> 
  <ul>
   
   {/* <li><div className="checkbox" ><input type="checkbox" id="checkbox1" />
    <label htmlFor="checkbox1"></label>
    </div>
     Default options
    </li>   */}
   {assestsList}

  </ul>
  </div>
 </div>
);
}//render

}//end of class	