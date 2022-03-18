import { ChainAccess } from "/_js/ChainAccess.js";
import { Database } from "/_js/Database.js";
import { tag } from "/_js/html.js";
import {smartContractAddress} from "/_js/network_config.js"

let celoSDK = new ChainAccess();
let database = new Database();

let contracts = [];
let tokenName, tokenAddress, tokenSymbol, tokenSupply, tokenBalance;

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
    console.log("Contracts offline data: ",data);

    tokenName = contracts[0].name.toString();
    tokenAddress = contracts[0].address.toString();
    tokenSymbol = contracts[0].symbol.toString();
    tokenSupply =contracts[0].supply.toString();
    tokenBalance = contracts[0].balance.toString();

    updateDisplay();
  };
} else {
  // get data
  let balance = await celoSDK.contract.balanceOf(celoSDK.account);
  let name = await celoSDK.contract.name();
  let symbol= await celoSDK.contract.symbol();
  let supply= await celoSDK.contract.totalSupply();

  contracts[0] = {
    address:smartContractAddress,
    name:name,
    symbol:symbol,
    balance:balance,
    supply:supply
  };
  console.log(contracts[0]);

  // data object to indexDb
  let callContractData = {contracts};
  database.setKV("contractCall",callContractData);

  tokenName = contracts[0].name.toString();
  tokenAddress = contracts[0].address.toString();
  tokenSymbol = contracts[0].symbol.toString();
  tokenSupply =contracts[0].supply.toString();
  tokenBalance = contracts[0].balance.toString();

  console.log('Token Name: ',contracts[0].name.toString());
  console.log('Celo token Address: ',contracts[0].address.toString());
  console.log('Token Symbol: ',contracts[0].symbol.toString());
  console.log('Token Supply: ',contracts[0].supply.toString());
  console.log('Token Balance: ',contracts[0].balance.toString());

  updateDisplay();
}

function updateDisplay(){
  const h0 = tag('h2', 'Contract')
  const h1 = tag('h4', 'Loading..')
  const h1List1 = tag('li', '')
  const h1List2 = tag('li', '')
  const h1List3 = tag('li', '')

  document.body.appendChild(h0);
  document.body.appendChild(h1);
  document.body.appendChild(h1List1);
  document.body.appendChild(h1List2);
  document.body.appendChild(h1List3);

  h1.textContent = celoSDK.reduceAddress(smartContractAddress.toString());
  h1List1.textContent = 'Token Name: '+ tokenName;
  h1List2.textContent = 'Token Symbol: '+ tokenSymbol;
  h1List3.textContent = 'Token Supply: '+ tokenSupply;
  h1List3.textContent = 'Token Balance: '+ tokenBalance;

  const btn1 = tag('Button', 'toDevs Swap','btn1',()=>{tokenSwap('toDevs')});
  document.body.appendChild(btn1);

  const btn2 = tag('Button', 'toCelo Swap','btn2',()=>{tokenSwap('toCelo')});
  document.body.appendChild(btn2);

  // swapping 1:1 with static value at 1 token per transaction
  async function tokenSwap(_conversion){
      if(_conversion === "toDevs"){
        console.log("Converting token from Celo to Devs");
        let params = [
          {
            from: celoSDK.account,
            to: '0x3f7a8AE47d66df8eDBeC15f3dC75D929466bc66d',
            gasLimit: '0x100000',
            value: '0x0de0b6b3a7640000',
          },
        ];
        console.log(params[0]);

        await ethereum
          .request({
            method: 'eth_sendTransaction',
            params,
          }).then((result) => {
            // The result varies by RPC method.
          }).catch((error) => {
            // If the request fails, the Promise will reject with an error.
          });
      };
    if(_conversion === "toCelo"){
      console.log("Converting token from Devs to Celo");
      // await celoSDK.contract('10');
      let params = [
        {
          from: celoSDK.account,
          to: '0x3f7a8AE47d66df8eDBeC15f3dC75D929466bc66d',
          gasLimit: '0x100000',
          data: '0xe4849b320000000000000000000000000000000000000000000000000de0b6b3a7640000'
        },
      ];
      console.log(params[0]);

      await ethereum
        .request({
          method: 'eth_sendTransaction',
          params,
        }).then((result) => {
          // The result varies by RPC method.
          location.reload();
        }).catch((error) => {
          // If the request fails, the Promise will reject with an error.
        });
    };
  }
}
