
//const IERC20 = require('./../../artifacts/contracts/interfaces/IERC20.sol/IERC20.json');
const ethApyElement = document.getElementById('eth-apy');
const ethSupplyInput = document.getElementById('eth-supply');
const ethSupplyButton = document.getElementById('eth-supply-button');
const ethRedeemInput = document.getElementById('eth-redeem');
const ethRedeemButton = document.getElementById('eth-redeem-button');
const daiApyElement = document.getElementById('dai-apy');
const daiSupplyInput = document.getElementById('dai-supply');
const daiSupplyButton = document.getElementById('dai-supply-button');
const daiRedeemInput = document.getElementById('dai-redeem');
const daiRedeemButton = document.getElementById('dai-redeem-button');
const enableEthereumButton = document.getElementById('enable-button');
const fetchBalanceButton = document.getElementById('balance-button');
let accounts;

enableEthereumButton.onclick = async () => {
  console.log('test');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  console.log(accounts);
  console.log(window.ethereum.selectedAddress);
  console.log(accounts[0]);

  const erc20Contract = new ethers.Contract('0xdAC17F958D2ee523a2206206994597C13D831ec7', erc20Abi, provider);
  let bal = await erc20Contract.balanceOf(accounts[0])
  console.log(ethers.utils.formatUnits(bal, 6));


  // fetch("./../../../artifacts/contracts/interfaces/IERC20.sol/IERC20.json")
  //     .then(response => {
  //       console.log(response.abi);
  //       return response.json();
  //     })
  //     .then(jsondata => console.log(jsondata.abi));


// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...

  const signer = await provider.getSigner();
  let address = await signer.getAddress()
  console.log(address);

  //console.log(IERC20.abi);

  //accounts = await ethereum.request({ method: 'eth_requestAccounts' });
};
//
// fetchBalanceButton.onclick = async () => {
//
//   let accountAddress = ethereum.selectedAddress;
//   web3.eth.getBalance(accountAddress).then(result=>{
//     let bal = Number(web3.utils.fromWei(result)).toFixed(3);
//     document.getElementById('eth-balance').innerHTML = bal;
//   });
//
//   let network = await web3.eth.net.getNetworkType();
//   getTokenBalance(Compound.util.getAddress('cETH', network), accountAddress).then(result =>{
//     document.getElementById('ceth-balance').innerHTML = result;
//   });
//   getTokenBalance(Compound.util.getAddress('DAI', network), accountAddress).then(result =>{
//     document.getElementById('dai-balance').innerHTML = result;
//   });
//   getTokenBalance(Compound.util.getAddress('cDAI', network), accountAddress).then(result =>{
//     document.getElementById('cdai-balance').innerHTML = result;
//   });
//
// /*
//   let contractAddress = ethereum.selectedAddress;
//   await web3.eth.getBalance(contractAddress,
//   function(error, result) {
//     if (error) {
//       console.log('error: ' + error);
//     }
//     else {
//       let bal = web3.utils.fromWei(result);
//       document.getElementById('eth-balance').innerHTML = Number(bal).toFixed(3);
//       console.log('balance: ' + document.getElementById('eth-balance').innerHTML);
//     }
//   });
//  */
// };
//
//
// async function supply(asset, amount) {
//   if (!isNaN(amount) && amount !== 0) {
//     try {
//       const trx = await compound.supply(asset, amount);
//       console.log(asset, 'Supply', amount, trx);
//       console.log('Transaction Hash', trx.hash);
//     } catch (err) {
//       alert(JSON.stringify(err));
//     }
//   }
// }
//
// async function redeem(asset, amount) {
//   if (!isNaN(amount) && amount !== 0) {
//     try {
//       const trx = await compound.redeem(asset, amount);
//       console.log(asset, 'Redeem', amount, trx);
//       console.log('Transaction Hash', trx.hash);
//     } catch (err) {
//       alert(JSON.stringify(err));
//     }
//   }
// }
//
// ethSupplyButton.onclick = async () => {
//   await supply(Compound.ETH, ethSupplyInput.value);
// };
//
// ethRedeemButton.onclick = async () => {
//   await redeem(Compound.cETH, ethRedeemInput.value);
// };
//
// daiSupplyButton.onclick = async () => {
//   await supply(Compound.DAI, daiSupplyInput.value);
// };
//
// daiRedeemButton.onclick = async () => {
//   await redeem(Compound.cDAI, daiRedeemInput.value);
// };
//
// async function getTokenBalance(tokenAddress, accountAddress) {
//   let contract = new web3.eth.Contract(erc20Abi, tokenAddress)
//   let balance = await contract.methods.balanceOf(accountAddress).call();
//   let unit = await contract.methods.decimals().call();
//   let tokenBal = (balance/Math.pow(10, unit)).toFixed(3);
//   return tokenBal;
// }
//
//
// async function calculateApy(asset) {
//
//   let network = await web3.eth.net.getNetworkType();
//   let address = Compound.util.getAddress('c' + asset, network);
//   const srpb = await Compound.eth.read(
//     address,
//     'function supplyRatePerBlock() returns (uint256)',
//     [],
//     { provider: window.ethereum }
//   ).catch(console.error);
//
//   const mantissa = Math.pow(10, 18);
//   const blocksPerDay = parseInt(60 * 60 * 24 / 13.15); // ~13.15 second block time
//   const daysPerYear = 365;
//
//   const supplyApy = (((Math.pow((+(srpb.toString()) / mantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
//   return supplyApy;
// }
//
// window.addEventListener('load', async (event) => {
//   const ethApy = await calculateApy('ETH');
//   ethApyElement.innerText = ethApy.toFixed(2);
//   const daiApy = await calculateApy('DAI');
//   daiApyElement.innerText = daiApy.toFixed(2);
//   console.log('Loading');
//
// });
