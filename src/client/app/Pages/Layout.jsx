import React from 'react';
import { Link } from "react-router";


import DynamicCampaign from'./DynamicCampaign.jsx';


export default class Layout extends React.Component {




render(){

    

return(
    <div className="mainContainer">

    
    <div className="content-wrapper">
      


      <DynamicCampaign />



    </div>

    </div>
  );

}//render
} 
