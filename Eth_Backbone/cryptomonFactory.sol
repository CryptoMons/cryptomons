pragma solidity ^0.4.0;


contract cryptomonFactory{
    address owner;
    modifier onlyBy(address _account)
    {
        require(msg.sender == _account);
        // Do not forget the "_;"! It will
        // be replaced by the actual function
        // body when the modifier is used.
        _;
    }

 mapping(int => uint) monsType;
 mapping(bytes32 => address) availableMons; //Is this Mining?

 function cryptomonFactory(address _createdby) internal{
     owner = _createdby;
 }
 
 function getNextMons(int locX, int locY, address walletAddress, bytes32 hash) external{
    bytes32 compHash = sha256(locX,locY,walletAddress);
    require(hash == compHash); //We can verify that walletAddres is at location X/Y
    //But how do we prevent people from spamming this function all the time?
    //Some type of time dependant hashing needs to be done to determine when things happen and only allow this function to run then
    
    //Assign token based on hash, use a mapping - TODO - Pull from queue/reserved cryptos
    require(availableMons[hash] != 0);
    if (!walletAddress.call(bytes4(keccak256("addCryptomon(address)")), availableMons[hash])){
        revert();
    }
    
 }
 
 function isContract(address addr) private view returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
 }
    

}
