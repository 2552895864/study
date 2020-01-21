import React from "react";
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import EditCN from '@/components/EditCN'
import EditSE from '@/components/EditSE'
import 'element-theme-default'

render((
  <HashRouter>
    <Route path="/editcn" component={EditCN}/>
    <Route path="/editse" component={EditSE}/>
  </HashRouter>
), document.getElementById('app'))