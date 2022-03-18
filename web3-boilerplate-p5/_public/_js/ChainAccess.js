import { ethers } from "/_js/ethers-5.2.esm.min.js";
import { accounts, smartContractAddress, abi } from "/_js/network_config.js";

class ChainAccess{

  constructor(){
    this.account = accounts[0];
    console.log('0');
    this.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    this.contract = new ethers.Contract(smartContractAddress[0], abi[0], this.provider);
    // The provider allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...
    this.signer = this.provider.getSigner();
    this.ethers = ethers;
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

  // set contract from index value. Boolean:_write to handle read/write needs for contract interaction
  setContract(_index, _write) {
    if (smartContractAddress.length < _index ) {
        throw 'Outside availible contract index';
    } else if (_write){
      // Read-Write; By connecting to a Signer, allows:
      // - Everything from Read-Only (except as Signer, not anonymous)
      // - Sending transactions for non-constant functions
      this.contract = new ethers.Contract(smartContractAddress[_index], abi[_index], this.signer);
    } else {
      // Read-Only; By connecting to a Provider, allows:
      // - Any constant function
      // - Querying Filters
      // - Populating Unsigned Transactions for non-constant methods
      // - Estimating Gas for non-constant (as an anonymous sender)
      // - Static Calling non-constant methods (as anonymous sender)
      this.contract = new ethers.Contract(smartContractAddress[_index], abi[_index], this.provider);
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

// TODO: Transcation()

}
export { ChainAccess };
