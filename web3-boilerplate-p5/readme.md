https://blog.logrocket.com/how-to-build-a-progressive-web-app-pwa-with-node-js/

https://web.dev/maskable-icon-audit/?utm_source=lighthouse&utm_medium=devtools

https://web.dev/learn/pwa/assets-and-data/

https://hacks.mozilla.org/2012/02/storing-images-and-files-in-indexeddb/

https://javascript.info/indexeddb

Deployed contract to testnet: 0x3f7a8AE47d66df8eDBeC15f3dC75D929466bc66d
https://alfajores-blockscout.celo-testnet.org/address/0x3f7a8AE47d66df8eDBeC15f3dC75D929466bc66d/transactions

import { ChainAccess } from "/_js/ChainAccess.js";

// Configure chain
let chain = new ChainAccess();

// Prompt user for account connections
// await window.ethereum.request({method: 'eth_requestAccounts'});
await chain.provider.send("eth_requestAccounts", []);
// get active account
console.log("Active Wallet Account: ",await window.ethereum.request({method: 'eth_requestAccounts'}));
// Get the balance of an account (by address or ENS name, if supported by network)

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
