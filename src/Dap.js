import React, { Component } from 'react'
import WalletContract from '../build/contracts/Wallet.json'
import getWeb3 from './utils/getWeb3'
import walletBytecode from './utils/wallet'  // eslint-disable-line
import ipfs from './ipfs'


import RegulatorOutput from './components/RegulatorOutput'
import RegulatorInput from './components/RegulatorInput'

import {Tabs} from './components/Tabs';
import {Tab} from './components/Tab';

import Modal from './components/Modal';

import './css/roboto.css';
import './css/rubik.css';
import './css/milligram.min.css';
import './App.css';


class Dap extends Component {
  constructor(props) {
    super(props)
    this.gReg = this.gReg.bind(this);
    this.sReg= this.sReg.bind(this);
    this.captureFile=this.captureFile.bind(this);
    this.initModal = this.initModal.bind(this);

    this.state = {
      temp:"",
      to_be_v_list:[],
      yolo:[[]],
      t2:false,

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

    }).then((result) => {console.log(result[0]);
      return this.setState({ to_be_v_list:result[0],
        yolo:result[1],
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
        t2:result
    })
    })
  }

  gReg(message) {
    console.log(message);
    var message1=message[0];
    var message2=message[1]
    var text_count1 = message1.length;
    var text_count2 = message2.length;
    
    var yolol=[];
    var yololol=[];
    for (let index = 0; index < text_count1; index++) {
        yolol.push(message1[index].c[0]);}
    yololol.push(message2);
    console.log(yololol);
    console.log(yolol);
    this.setState({
        to_be_v_list:yolol,
        yolo:yololol,
    })
    console.log(this.state.yolo);
  }

  sReg(message) {
    this.setState({ 
      t2: message
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
                
                  <p className="message">The number of pending orders is: <strong className="hello-world">{this.state.to_be_v_list.length}</strong></p>

                  < RegulatorOutput state={this.state} gReg={this.gReg} initModal={this.initModal} />             
                  
              </Tab>
              <Tab iconClassName={'fa fa-headphones'} linkClassName={'custom-link'}>
                
                  <RegulatorInput state={this.state} sReg={this.sReg} initModal={this.initModal} />
                  
              </Tab>


          </Tabs>
          
        <Modal modal={this.state.modal} />
      </div>
    );
  }
}

export default Dap