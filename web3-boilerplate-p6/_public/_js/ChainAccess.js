import { ethers } from "/_js/ethers-5.2.esm.min.js";
import { accounts, smartContractAddress, abi } from "/_js/network_config.js";

class ChainAccess{

  constructor(){
    ethereum.request({ method: 'eth_requestAccounts' });
    this.account = ethereum.selectedAddress;
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any"); //https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents
    this.contract = new ethers.Contract(smartContractAddress[0], abi[0], this.provider);
    // The provider allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...
    this.signer = this.provider.getSigner();
    this.ethers = ethers;
    console.log('ChainAccess contructor completed initialization');

  }

  async gasEstimate(){
    return await this.provider.getGasPrice() // gasPrice
  }

  setAccount(account) {
    account = account.trim();
    if (account === '') {
        throw 'The acount cannot be empty';
    }
    this.account = account;
  }

  async getBlock(){
    // Look up the current block number
    // 14135476
    return await this.provider.getBlockNumber();
  }
  async getBalance(){
    let balance = await this.provider.getBalance(this.account);
    return await balance.toString();
  }

  async getTransaction(hash){
    let tx = await this.provider.getTransaction(hash);
    return await tx;
  }

  async getData(nounce){
    let data = await this.provider.getStorageAt(this.account, nounce);
    return await data;
  }

  async sell(value){
    let sell = await this.contract.sell(value);
    return await sell.toString();
  }


  // set contract from index value. Boolean:_write to handle read/write needs for contract interaction
  setContract(_index, _write) {
    if (smartContractAddress.length < _index ) {
        throw 'Outside availible contract index';
    } else if (_write){
      // Read-Write; By connecting to a Signer, allows:
      // - Everything from Read-Only (except as Signer, not anonymous)
      // - Sending transactions for non-constant functions
      this.contract = new ethers.Contract(smartContractAddress[_index], abi[_index], this.signer);
      console.log("Contract mode: read/write");
    } else {
      // Read-Only; By connecting to a Provider, allows:
      // - Any constant function
      // - Querying Filters
      // - Populating Unsigned Transactions for non-constant methods
      // - Estimating Gas for non-constant (as an anonymous sender)
      // - Static Calling non-constant methods (as anonymous sender)
      this.contract = new ethers.Contract(smartContractAddress[_index], abi[_index], this.provider);
      console.log("Contract mode: read-only");
    }
  }

  convertToEth(wei){
    // Often you need to format the output to something more user-friendly,
    // such as in ether (instead of wei)
    return ethers.utils.formatEther(wei)
    // '0.082826475815887608'
  }

  convertToWei(eth){
    // If a user enters a string in an input field, you may need
    // to convert it from ether (as a string) to wei (as a BigNumber)
    return ethers.utils.parseEther(eth).toString()
    // { BigNumber: "1000000000000000000" }
  }

  utf8ToHex(data) {
    return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data));
  }

  hexToUtf8(data) {
    return ethers.utils.toUtf8String(data)
  }

  reduceHash(_hash){
    return _hash.slice(0,5) + "..." + _hash.slice(60);
  }

  reduceAddress(_address){
    return _address.slice(0,5) + "..." + _address.slice(36);
  }

// TODO: Transcation()

}
export { ChainAccess };
