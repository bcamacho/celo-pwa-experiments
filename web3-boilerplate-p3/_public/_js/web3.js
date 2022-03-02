import { ChainAccess } from "/_js/ChainAccess.js";

// Set RPC network web secure socket (wss)
const network = "wss://alfajores-forno.celo-testnet.org/ws";
// If you don't specify a //wss//, Ethers connects to the default
// (i.e. ``http:/\/localhost:8545``)

// Set account for use with chain interaction
let chain = new ChainAccess("0x1B1dC2A87150D1f4FEe277060bf27a2aCaaFE4aB", network);
console.log('Current account configured to interact with blockchain: ',chain); // 0x1B1dC2A87150D1f4FEe277060bf27a2aCaaFE4aB

// Get Block Height
console.log('Current blockchain block height: ',await chain.getBlock()); // 0x1B1dC2A87150D1f4FEe277060bf27a2aCaaFE4aB

// Convert to Eth
console.log('Convert 1250000000000000000: ',chain.convertToEth("1250000000000000000")); // 1.25

// Convert to Wei
console.log('Convert 1.25: ',chain.convertToWei("1.25")); // 1250000000000000000

// Get account balance
console.log('Get account balance: ',chain.account,' -> ',chain.convertToEth(await chain.getBalance())); // 1250000000000000000

// Set a new account address for existing chain
chain.setAccount("0xd6821fAA243cf1aFaf04Dd855E5cC59eDFCDC734");

// Get account balance with new account address
console.log('Get account balance: ',chain.account,' -> ',chain.convertToEth(await chain.getBalance())); // 1250000000000000000

export {};
