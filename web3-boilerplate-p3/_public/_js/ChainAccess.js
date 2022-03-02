import { ethers } from "/_js/ethers-5.2.esm.min.js";
let provider,signer;


class ChainAccess {

  constructor(account, network){
    this.account = account;
    this.network = network;
    provider = new ethers.providers.WebSocketProvider(network);
    // The provider allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, we need the account signer...
    signer = provider.getSigner()
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
    return await provider.getBlockNumber();
  }
  async getBalance(){
    // Get the balance of an account (by address or ENS name, if supported by network)
    // balance = await provider.getBalance("ethers.eth")
    let balance = await provider.getBalance(this.account);
    return await balance.toString();
  }

  async getTransaction(hash){
    let tx = await provider.getTransaction(hash);
    return await tx;
  }

  async getData(nounce){
    let data = await provider.getStorageAt(this.account, nounce);
    return await data;
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
