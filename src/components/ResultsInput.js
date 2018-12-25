import React from 'react';

class ResultsInput extends React.Component {
  
  submit(e) {
    e.preventDefault();
    const id1 = this.id1.value;

    const state = this.props.state;
    const instance = state.instance;
    
    const setDocRequest = async () => {
      const result =instance.setResults(id1, ""+this.props.state.temp, { from: state.web3.eth.accounts[0]}).then((result) => {
        this.props.initModal(0);
        console.log("2"+this.props.state.temp);
        return instance.getResultNo();
      });
      return result
    }

    const getDocRequest = async () => {
      this.props.initModal(1);
      const result = await setDocRequest();
      console.log(result);
      this.props.sR(""+result);
    }

    getDocRequest();
  }
  

  render() {
    return (
      <form className="Supplier-form" onSubmit={(e) => this.submit(e)}>
        <input ref={(input) => this.id1 = input} type="number" className="number-input" placeholder="user_id text" /><br />
        <input type='file' onChange={this.props.captureFile} />
        <button type="submit" value="Submit" className="button-submit js-button-submit">Submit</button>
      </form>
    )
  }
}

export default ResultsInput;