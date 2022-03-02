import { ChainAccess } from "/_js/ChainAccess.js";
import { tag } from "/_js/html.js"

// Configure chain
const network = "wss://alfajores-forno.celo-testnet.org/ws";
let accounts = ["0x1B1dC2A87150D1f4FEe277060bf27a2aCaaFE4aB","0xd6821fAA243cf1aFaf04Dd855E5cC59eDFCDC734"];

let celoSDK = new ChainAccess(accounts[0], network);
console.log('Celo account: ',celoSDK); // 0x1B1dC2A87150D1f4FEe277060bf27a2aCaaFE4aB


const h0 = tag('h1', 'Accounts')
const h1 = tag('h2', 'Loading..')
const h1List1 = tag('li', '')
document.body.appendChild(h0);
document.body.appendChild(h1);
document.body.appendChild(h1List1);
h1.textContent = celoSDK.account;
h1List1.textContent = 'Balance: '+ celoSDK.convertToEth(await celoSDK.getBalance());

const h1a = tag('h2', '')
const h2aList1 = tag('li', '')
const h3a = tag('h3', 'TX Hash')
const h3aList1 = tag('li', '')
const h3aList2 = tag('li', '')


document.body.appendChild(h1a);
document.body.appendChild(h2aList1);
document.body.appendChild(h3a);
document.body.appendChild(h3aList1);
document.body.appendChild(h3aList2);


celoSDK.setAccount(accounts[1]);
h1a.textContent = celoSDK.account;
h2aList1.textContent = 'Balance: '+ celoSDK.convertToEth(await celoSDK.getBalance());
let tx = await celoSDK.getTransaction("0x86aafade1200cf7ce3412073ba84171a06a6e8667dcfd1f6b31c63a4f374a7d7")
h3a.textContent = "TX Hash: 0x86aafade1200cf7ce3412073ba84171a06a6e8667dcfd1f6b31c63a4f374a7d7";
h3aList1.textContent = 'Hex: ' + tx.data;
h3aList2.textContent = 'UTF8: ' + celoSDK.hexToUtf8(tx.data);
