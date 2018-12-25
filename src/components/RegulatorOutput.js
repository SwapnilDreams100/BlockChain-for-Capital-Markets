import React from 'react';

class RegulatorOutput extends React.Component {
  submit(e) {
    e.preventDefault();
    const state = this.props.state;
    const instance = state.instance;

    const setDocRequest = async () => {
      const result = instance.setCompliance({ from: state.web3.eth.accounts[0]}).then((result) => {
        this.props.initModal(0);
        return result
      });
      return result
    }

    const getDocRequest = async () => {
      this.props.initModal(1);
      const result = await setDocRequest();
      console.log(result);
      this.props.gReg(result);
    }

    getDocRequest();
  }

  render() {
    return (
      <form className="Supplier-form" onSubmit={(e) => this.submit(e)}>
        <button type="submit" value="Submit" className="button-submit js-button-submit">Get Data</button>
      </form>
    )
  }
}

export default RegulatorOutput;
