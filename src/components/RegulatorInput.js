import React from 'react';

class RegulatorInput extends React.Component {
  
  submit(e) {
    e.preventDefault();
    const syn1 = this.syn1.value;
    const id1 = this.props.state.to_be_v_list;
    const pan1 = this.pan1.value;
    const state = this.props.state;
    const instance = state.instance;
    
    const setDocRequest = async () => {
      console.log(typeof id1[0])
      const result =instance.setVerification(syn1,pan1,{ from: state.web3.eth.accounts[0]}).then((result,err) => {
        if (err){console.log(err)}
        this.props.initModal(0);
        console.log(""+id1);
        return result
      });
      return result
    }

    const getDocRequest = async () => {
      this.props.initModal(1);
      const result = await setDocRequest();
      console.log(result)
      this.props.sReg(""+result);
    }

    getDocRequest();
  }
  

  render() {
    return (
      <form className="Supplier-form" onSubmit={(e) => this.submit(e)}>
        <p><b>User_id:{""+this.props.state.to_be_v_list[0]}</b></p>
        <p><b>Syn Number:{""+this.props.state.yolo[0][0][0]}</b></p>
        <input ref={(input) => this.syn1 = input} type="number" className="number-input" placeholder="syn text" /><br />
        <p><b>Pan Number{""+this.props.state.yolo[0][0][1]}</b></p>
        <input ref={(input) => this.pan1 = input} type="number" className="number-input" placeholder="pan text" /><br />        
        <button type="submit" value="Submit" className="button-submit js-button-submit">Submit</button>
      </form>
    )
  }
}

export default RegulatorInput;