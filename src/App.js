import React, { Component } from 'react'
import WalletContract from '../build/contracts/Wallet.json'
import getWeb3 from './utils/getWeb3'
import walletBytecode from './utils/wallet'  // eslint-disable-line
import ipfs from './ipfs'


import CompanyOutput from './components/CompanyOutput'
import CompanyInput from './components/CompanyInput'

import ResultsOutput from './components/ResultsOutput'
import ResultsInput from './components/ResultsInput'



import CompanyVerification from './components/CompanyVerification'


import {Tabs} from './components/Tabs';
import {Tab} from './components/Tab';

import Modal from './components/Modal';

import './css/roboto.css';
import './css/rubik.css';
import './css/milligram.min.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.gDoc = this.gDoc.bind(this);
    this.sDoc= this.sDoc.bind(this);
    this.gR = this.gR.bind(this);
    this.sR= this.sR.bind(this);
    
    this.gV= this.gV.bind(this);
    
    this.captureFile=this.captureFile.bind(this);
    this.initModal = this.initModal.bind(this);

    this.state = {
      temp:"",
      id:123,
      syn:123,
      pan:123,
      status:false,
      ipfs_hash:"",
      t1:"",
      t2:"",

      contractAddress: "none",
      modal: 0,
      buffer:null,
      instance: null,
      web3: null
    }
  }

  componentWillMount() {

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateGetDoc()
      this.instantiateSetDoc()
      this.instantiateGetResult()
      this.instantiateSetResult()
      
      this.instantiateSetV()

    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

//Doc Area

  instantiateGetDoc() {
    
    const contract = require('truffle-contract')
    const docChain = contract(WalletContract)
    let docChainInstance
    docChain.setProvider(this.state.web3.currentProvider)

    docChain.deployed().then((instance) => {
      docChainInstance = instance
      this.setState({ instance: docChainInstance })

      this.setState({ contractAddress: docChainInstance.address })

    }).then((result) => {console.log(result[1]);
      return this.setState({ syn:result[0],
        pan:result[1],
        ipfs_hash:result[2],
      })
    })
  }

  instantiateSetDoc() {
    
    const contract = require('truffle-contract')
    const docChain = contract(WalletContract)
    let docChainInstance
    docChain.setProvider(this.state.web3.currentProvider)

    docChain.deployed().then((instance) => {
      docChainInstance = instance
      this.setState({ instance: docChainInstance })
      this.setState({ contractAddress: docChainInstance.address })

    }).then((result) => {
      return this.setState({ 
        t1:result,
    })
    })
  }
  instantiateGetResult() {
    
    const contract = require('truffle-contract')
    const docChain = contract(WalletContract)
    let docChainInstance
    docChain.setProvider(this.state.web3.currentProvider)

    docChain.deployed().then((instance) => {
      docChainInstance = instance
      this.setState({ instance: docChainInstance })

      this.setState({ contractAddress: docChainInstance.address })

    }).then((result) => {console.log(result[0]);
      return this.setState({ 
        ipfs_hash:result[0],
      })
    })
  }

  instantiateSetResult() {
    
    const contract = require('truffle-contract')
    const docChain = contract(WalletContract)
    let docChainInstance
    docChain.setProvider(this.state.web3.currentProvider)

    docChain.deployed().then((instance) => {
      docChainInstance = instance
      this.setState({ instance: docChainInstance })
      this.setState({ contractAddress: docChainInstance.address })

    }).then((result) => {
      return this.setState({ 
        t2:result,
    })
    })
  }

  instantiateSetV() {
    
    const contract = require('truffle-contract')
    const docChain = contract(WalletContract)
    let docChainInstance
    docChain.setProvider(this.state.web3.currentProvider)

    docChain.deployed().then((instance) => {
      docChainInstance = instance
      this.setState({ instance: docChainInstance })
      this.setState({ contractAddress: docChainInstance.address })

    }).then((result) => {
      return this.setState({ 
        status:result
    })
    })
  }

  gDoc(message) {
    this.setState({syn:message[0],
      pan:message[1],
      ipfs_hash:message[2],
    })
  }

  sDoc(message) {
    this.setState({ 
      t1: message,
    })
  }
  gR(message) {
    this.setState({
      ipfs_hash:message,
    })
  }

  sR(message) {
    this.setState({ 
      t2: message,
    })
  }


  gV(message) {
    this.setState({ 
      status: message,
    })
  }

//Modal
  initModal(value) {
    this.setState({
      modal: value
    })
  }
  captureFile(event) {
    event.preventDefault()
    console.log("in capture"+event.target.files[0]);
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
      await ipfs.files.add(this.state.buffer, (err, result) => {
        if(err)
        {
        console.log('yolo'+err);}
        this.setState({temp:result[0].hash});
        console.log(this.state.temp);
        
      });
    }
    
  }
  render() {
    return (
      <div className="App">
          <div className="contract-status">
            <p>Contract address: <span className="contract-address">{this.state.contractAddress}</span></p>
          </div>
          <Tabs>

              <Tab iconClassName={'fa fa-headphones'} linkClassName={'custom-link'}>
              
                  <p className="message">The no. of docs is: <strong className="hello-world">{this.state.t1}</strong></p>

                  <CompanyInput state={this.state} captureFile={this.captureFile} sDoc={this.sDoc} initModal={this.initModal} />

              </Tab>

              <Tab iconClassName={'fa fa-headphones'} linkClassName={'custom-link'}>

                  <p className="message">The pan name from your contract is: <strong className="hello-world">{""+this.state.pan}</strong></p>

                  < CompanyOutput state={this.state} gDoc={this.gDoc} initModal={this.initModal} />             

              </Tab>
              
              <Tab iconClassName={'fa fa-headphones'} linkClassName={'custom-link'}>

                  <p className="message">The status of KYC: <strong className="hello-world">{""+this.state.status}</strong></p>

                  < CompanyVerification state={this.state} gV={this.gV} initModal={this.initModal} />             

              </Tab>
          
          </Tabs>
          
        <Modal modal={this.state.modal} />
      </div>
    );
  }
}

export default App