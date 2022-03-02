import { ethers } from "/_js/ethers-5.2.esm.min.js";

const network = "wss://alfajores-forno.celo-testnet.org/ws";
// If you don't specify a //url//, Ethers connects to the default
// (i.e. ``http:/\/localhost:8545``)
const provider = new ethers.providers.WebSocketProvider(network);

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
const signer = provider.getSigner()



class ChainAccess {

  constructor(account){
    this.account = account;
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

// TODO: Transcation()

}

let chain = new ChainAccess("0x1B1dC2A87150D1f4FEe277060bf27a2aCaaFE4aB");
console.log('Current account configured to interact with blockchain: ',chain); // 0x1B1dC2A87150D1f4FEe277060bf27a2aCaaFE4aB
console.log('Current blockchain block height: ',await chain.getBlock()); // 0x1B1dC2A87150D1f4FEe277060bf27a2aCaaFE4aB
console.log('Convert 1250000000000000000: ',chain.convertToEth("1250000000000000000")); // 1.25
console.log('Convert 1.25: ',chain.convertToWei("1.25")); // 1250000000000000000
console.log('Get account balance: ',chain.account,' -> ',chain.convertToEth(await chain.getBalance())
); // 1250000000000000000
chain.setAccount("0xd6821fAA243cf1aFaf04Dd855E5cC59eDFCDC734");
console.log('Get account balance: ',chain.account,' -> ',chain.convertToEth(await chain.getBalance())); // 1250000000000000000

export { provider, signer, ChainAccess };
