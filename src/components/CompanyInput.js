import React from 'react';

class CompanyInput extends React.Component {
  
  submit(e) {
    e.preventDefault();
    const id1 = this.id1.value;
    const syn1 = this.syn1.value;
    const pan1 = this.pan1.value;
    const state = this.props.state;
    const instance = state.instance;
    
    const setDocRequest = async () => {
      const result =instance.setDocument(id1,syn1,pan1,this.props.state.temp, { from: state.web3.eth.accounts[0]}).then((result) => {
        this.props.initModal(0);
        console.log("2"+this.props.state.temp)
        return instance.getDocumentNo()
      });
      return result
    }

    const getDocRequest = async () => {
      this.props.initModal(1);
      const result = await setDocRequest();
      console.log(result)
      
      this.props.sDoc(""+result);
    }

    getDocRequest();
  }
  

  render() {
    return (
      <form className="Supplier-form" onSubmit={(e) => this.submit(e)}>
        <input ref={(input) => this.id1 = input} type="number" className="number-input" placeholder="user_id text" /><br />
        <input ref={(input) => this.syn1 = input} type="number" className="number-input" placeholder="syn text" /><br />
        <input ref={(input) => this.pan1 = input} type="number" className="number-input" placeholder="pan text" /><br />        
        <input type='file' onChange={this.props.captureFile} webkitdirectory directory multiple />
        <button type="submit" value="Submit" className="button-submit js-button-submit">Submit</button>
      </form>
    )
  }
}

export default CompanyInput;