import { ChainAccess } from "/_js/ChainAccess.js";
import { tag } from "/_js/html.js";
import {smartContractAddress} from "/_js/network_config.js"

let celoSDK = new ChainAccess();

let contracts = [];

// check online/offline
if(!navigator.onLine){
  console.log('===>  callContract: OFFLINE  <===');
  // Open up a transaction as usual
  let objectStore = db.transaction(['data'], "readwrite").objectStore('data');
  // Get the to-do list object that has this title as it's title
  let objectStoreRequest = objectStore.get("contractCall");
  // onSuccess
  objectStoreRequest.onsuccess = function() {
    // Grab the data object returned as the result
    let data = objectStoreRequest.result;
    contracts = data.contracts;
    console.log("Offline data: ",data);
    updateDisplay();
  };
} else {
  // get data
  let balance = await celoSDK.contract.balanceOf(celoSDK.account);
  let name = await celoSDK.contract.name();
  // let celoTokenAddress = smartContractAddress;
  let tokenSymbol= await celoSDK.contract.symbol();
  let totalSupply= await celoSDK.contract.totalSupply();

  contracts[0] = {
    address:smartContractAddress,
    balance:balance,
    name:name,
    symbol:tokenSymbol,
    supply:totalSupply
  };
  console.log(contracts[0]);

  // data object to indexDb
  let callContractData = {contracts};
  database.setKV("contractCall",callContractData);

  console.log('Token Name: ',contracts[0].name.toString());
  console.log('Celo token Address: ',contracts[0].address.toString());
  console.log('Token Symbol: ',contracts[0].symbol.toString());
  console.log('Token Supply: ',contracts[0].supply.toString());
  console.log('Token Balance: ',contracts[0].balance.toString());

  updateDisplay();
}

function updateDisplay(){
  const h0 = tag('h1', 'Contract')
  const h1 = tag('h2', 'Loading..')
  const h1List1 = tag('li', '')
  const h1List2 = tag('li', '')
  const h1List3 = tag('li', '')

  document.body.appendChild(h0);
  document.body.appendChild(h1);
  document.body.appendChild(h1List1);
  document.body.appendChild(h1List2);
  document.body.appendChild(h1List3);

  h1.textContent = celoTokenAddress.toString();
  h1List1.textContent = 'Token Name: '+ name.toString();
  h1List2.textContent = 'Token Symbol: '+ tokenSymbol.toString();
  h1List3.textContent = 'Token Supply: '+ totalSupply.toString();
  h1List3.textContent = 'Token Balance: '+ balance.toString();

  const btn1 = tag('Button', 'toDevs Swap','btn1',()=>{tokenSwap('toDevs')});
  document.body.appendChild(btn1);

  const btn2 = tag('Button', 'toCelo Swap','btn2',()=>{tokenSwap('toCelo')});
  document.body.appendChild(btn2);

  function tokenSwap(_conversion){
    if(_conversion === "toDevs"){
      console.log("Converting token from Celo to Devs");
      const tx = {
        from: celoSDK.account,
        to: smartContractAddress,
        value: celoSDK.ethers.utils.parseEther("1"),
        nonce: celoSDK.provider.getTransactionCount(celoSDK.account, "latest"),
        gasLimit: celoSDK.ethers.utils.hexlify(0x100000), // 100000
        gasPrice: celoSDK.gasEstimate,
      }
      // await celoSDK.contract.toDevs();
      console.log(tx);
    };
    if(_conversion === "toCelo"){console.log("Converting token from Devs to Celo")};
  }
}
