import { ChainAccess } from "/_js/ChainAccess.js";
import { Database } from "/_js/Database.js";
import { tag } from "/_js/html.js"
import { accounts } from "/_js/network_config.js";


let celoSDK = new ChainAccess();
let database = new Database();

// console.log(database.isExisting());

let addresses = [];
let transactions = [];

// check online/offline
if(!navigator.onLine){
  console.log('===>  getBalance: OFFLINE  <===');
  // Open up a transaction as usual
  let objectStore = db.transaction(['data'], "readwrite").objectStore('data');
  // Get the to-do list object that has this title as it's title
  let objectStoreRequest = objectStore.get("getBalance");
  // onSuccess
  objectStoreRequest.onsuccess = function() {
    // Grab the data object returned as the result
    let data = objectStoreRequest.result;
    addresses = data.addresses;
    transactions = data.transactions;
    console.log("Get balances offline data: ",data);
    updateDisplay();
  };
} else {
  // get data
  addresses[0] = {address:celoSDK.account,balance:celoSDK.convertToEth(await celoSDK.getBalance())};
  celoSDK.setAccount(accounts[1]);
  addresses[1] = {address:celoSDK.account,balance:celoSDK.convertToEth(await celoSDK.getBalance())};
  transactions[0] = {hash:"0x86aafade1200cf7ce3412073ba84171a06a6e8667dcfd1f6b31c63a4f374a7d7"};
  let tx = await celoSDK.getTransaction(transactions[0].hash);
  transactions[0].dataHex = tx.data;
  transactions[0].dataUTF8 = celoSDK.hexToUtf8(tx.data);
  console.log(addresses);
  console.log(transactions);
  // data object to indexDb
  let getBalanceData = {addresses,transactions};
  database.setKV("getBalance",getBalanceData);
  updateDisplay();
}

function updateDisplay(){
  // Account 1
  // console.log('Celo account: ',celoSDK)
  const s0h0 = tag('h2', 'Account Data')
  const s0h2 = tag('h4', 'Account 1')
  const s0l0 = tag('li', 'Loading..')
  const s0l1 = tag('li', '')
  document.body.appendChild(s0h0);
  document.body.appendChild(s0h2);
  document.body.appendChild(s0l0);
  document.body.appendChild(s0l1);

  s0l0.textContent = celoSDK.reduceAddress(addresses[0].address);
  s0l1.textContent = 'Celo Balance: '+ addresses[0].balance;

  // Account 2
  const s1h0 = tag('h4', 'Account 2')
  const s1l0 = tag('li', '')
  const s1l1 = tag('li', '')
  const s1h1 = tag('h4', 'TX Hash Lookup')
  const s1l2 = tag('li', '')
  const s1l3 = tag('li', '')
  const s1l4 = tag('li', '')

  document.body.appendChild(s1h0);
  document.body.appendChild(s1l0);
  document.body.appendChild(s1l1);
  document.body.appendChild(s1h1);
  document.body.appendChild(s1l2);
  document.body.appendChild(s1l3);
  document.body.appendChild(s1l4);

  s1l0.textContent = celoSDK.reduceAddress(addresses[1].address);
  s1l1.textContent = 'Celo Balance: '+ addresses[1].balance;

  // Transaction data
  s1l2.textContent = "Hash: " + celoSDK.reduceHash(transactions[0].hash);
  s1l3.textContent = "Hex: " + transactions[0].dataHex;
  s1l4.textContent = "UTF8: " + transactions[0].dataUTF8;
}
