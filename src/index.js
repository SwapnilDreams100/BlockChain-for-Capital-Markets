import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter,Route} from 'react-router-dom'
import App from './App'
import Home from './Home'
import Dap from './Dap'

ReactDOM.render(
  <BrowserRouter>
  <div>
    <Route path="/" component={Home}/>
    <Route path="/App" component={App}/>
    <Route path="/Dap" component={Dap}/>
  </div>
  </BrowserRouter>,
  document.getElementById('root')
);