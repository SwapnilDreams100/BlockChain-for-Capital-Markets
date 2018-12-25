pragma solidity ^0.4.18;

contract Wallet {

    uint public t1; 
    uint public t2; 
        
    struct user{
        uint u_id;
        uint syn;
        uint pan;
        uint ipfs_hash;
        bool verified;
        uint[] req_list;
        string[] results;
    }

    mapping (uint => user) u1;
    uint[] to_be_verified; 
    uint[3][] total_docs;
    uint[] verified;
        
    function setDocument(uint _u_id,uint _syn,uint _pan,uint _ipfs_hash) public {
        u1[_u_id].syn = _syn;
        u1[_u_id].ipfs_hash = _ipfs_hash;
        u1[_u_id].pan = _pan;
        u1[_u_id].verified = false;
        setComplianceData(_u_id);
        t1++;
    }

    function setResults(uint _u_id,string _ipfs_hash) public {
        u1[_u_id].results.push(_ipfs_hash);
        t2++;
    }

    function setComplianceData(uint _u_id) public {
        to_be_verified.push(_u_id);
    }
    
    function setCompliance() public view returns(uint[],uint[3][]) { 
        
        for (uint i = 0;i < to_be_verified.length;i++){
            total_docs.push([u1[to_be_verified[i]].syn,u1[to_be_verified[i]].pan,u1[to_be_verified[i]].ipfs_hash]);
        }
        return (to_be_verified,total_docs);
    }
    
    function setVerification() public{
        u1[to_be_verified[to_be_verified.length-1]].verified = true;
        verified.push(to_be_verified[to_be_verified.length-1]);
        delete to_be_verified[to_be_verified.length-1];  
    }

    function getDocument(uint _u_id,uint _p_id) public view returns(uint, uint,uint) {
        if (_p_id==1)
            return (u1[_u_id].syn,u1[_u_id].pan,u1[_u_id].ipfs_hash);
    }

    function getResult(uint _u_id,uint _p_id) public view returns(string) {
        if (_p_id==1)  
            return (u1[_u_id].results[t2]);
    }

    function getVerificationStatus(uint _u_id) public view returns(bool) {
        bool val = false;
        for(uint i = 0; i < verified.length;i++){
            if (_u_id==verified[i]){
                val = true;
            }
        }
        return val;
    }

    function getDocumentNo() public view returns(uint256) {
        return (t1);
    }
    function getResultNo() public view returns(uint256) {
        return (t2);
    }
}
