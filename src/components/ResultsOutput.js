import React from 'react';

class ResultsOutput extends React.Component {
  submit(e) {
    e.preventDefault();
    const id1 = this.id1.value;
    const id2 = this.id2.value;
    
    const state = this.props.state;
    const instance = state.instance;

    const setDocRequest = async () => {
      const result = instance.getResult(id1,id2 ,{ from: state.web3.eth.accounts[0]}).then((result) => {
        this.props.initModal(0);
        return result
      });
      return result
    }

    const getDocRequest = async () => {
      this.props.initModal(1);
      const result = await setDocRequest();
      console.log(result);
      this.props.gR(result);
    }

    getDocRequest();
  }

  render() {
    return (
      <form className="Supplier-form" onSubmit={(e) => this.submit(e)}>
        <input ref={(input) => this.id1 = input} type="number" className="number-input" placeholder="user_id text" /><br />
        <input ref={(input) => this.id2 = input} type="number" className="number-input" placeholder="accessor_id text" /><br />
        
        <button type="submit" value="Submit" className="button-submit js-button-submit">Submit</button>
      </form>
    )
  }
}

export default ResultsOutput;
