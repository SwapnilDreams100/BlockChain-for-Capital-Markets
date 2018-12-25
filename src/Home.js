import React, { Component } from 'react'

import './css/roboto.css';
import './css/rubik.css';
import './css/milligram.min.css';
import './App.css';
import LinkButton from './components/LinkButton';


class Home extends Component {

    render() {
    return (
      <div className="App">
        <div className="top-bar">
          <a href="#" className="title-link">Hackathon</a>
          <div className="notice-box">Working</div>
        </div>
        <main className="container">
          <h1>Digital Data Sharing</h1>
          <h2>Compliance BlockChain</h2>
          
          <LinkButton to='/App'>Upload KYC Documents</LinkButton>
          <LinkButton to='/Dap'>Regulatory Compliance</LinkButton>


        </main>
      </div>
    );
  }
}

export default Home