pragma solidity ^0.4.0;

contract cryptomonWallet{
    address owner;
    address FACTORY_ADDRESS = 0x123455678;
    
    struct cryptomon{
        address cAddress;
    //    address owner;
    }
    cryptomon[] dex;
    cryptomon activeMon;
    modifier onlyBy(address _account)
    {
        require(msg.sender == _account);
        // Do not forget the "_;"! It will
        // be replaced by the actual function
        // body when the modifier is used.
        _;
    }

 function cryptomonWallet(address _createdby) public{
     owner = _createdby;
 }
 
 
 //Must prevent the owner from creating invalid CryptoMons
 function addCryptoMon(address monAddress) public onlyBy(owner){
     //Conditions required for this function to complete successfully:
     //1) Cryptomon must exist
     //2) Call to this function must come from the Cryptomon Factory. "The cryptomon must WANT to join this user."
     //3) Cryptomon must have been generated with a valid game at a valid time according to the seed.
     require (isContract(monAddress)); //Check for #1
     require (msg.sender == FACTORY_ADDRESS); //Check for #2
     //TODO: #3
     
     cryptomon memory newMon = cryptomon(monAddress);
     dex.push(newMon);
 }
 
 function setActiveMon(address monAddress) public onlyBy(owner){
     activeMon.cAddress = monAddress;
 }
 
 function getActiveMon() public view returns (address){
     return activeMon.cAddress; 
 }
 
 function getMons() public view returns (cryptomon[]){
     return dex;
 }
 
 function isContract(address addr) private view returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
 }

 // @dev A mapping from owner address to count of tokens that address owns.
 //  Used internally inside balanceOf() to resolve ownership count.
 mapping (address => uint256) ownershipTokenCount;

 /// @notice Returns the number of Mons owned by a specific address.
 /// @param _owner The owner address to check.
 /// @dev Required for ERC-721 compliance
 function balanceOf(address _owner) public view returns (uint256 count) {
 return ownershipTokenCount[_owner];
 }

}
