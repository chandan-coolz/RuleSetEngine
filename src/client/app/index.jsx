import React from 'react';
import "babel-polyfill";
import {render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';



import Layout from './Pages/Layout.jsx';
import DynamicCampaign from './pages/DynamicCampaign.jsx';





/* setTimeout( ()=> {

 this.setState({name:"pool"});
 this.setState({title:"welcome Pool!"});
 },2000);*/






render(

   <Router history={hashHistory}>
    <Route path="reactJs/src/client/" >

      <Route path="/" component={Layout} >
       
        <Route path="/dynamicCampaign" component={DynamicCampaign}></Route>
    
      </Route>
    </Route>
  </Router>                              
   	, document.getElementById('app')); 

