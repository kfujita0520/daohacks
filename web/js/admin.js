const DAOTokenAddress = "0xfb694C14B7BDB2E630948ac770B1c4BeaC8416C9";
const DAOTaskAddress = "0xb452601270aca917C24678D6CF0ca21304BB383B";
const grantRewardButton = document.getElementById('grant-reward-button');
const grantAddressInput = document.getElementById('grant-address');
const rewardAmountInput = document.getElementById('reward-amount');
const enableEthereumButton = document.getElementById('enable-button');
let accounts;
let provider;

enableEthereumButton.onclick = async () => {
  console.log('test');
  provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  console.log(accounts);
  console.log(accounts[0]);

};


grantRewardButton.onclick = async () => {
  const signer = await provider.getSigner();
  const DAOTaskContract = new ethers.Contract(DAOTaskAddress, daoTaskAbi, signer);

  await DAOTaskContract.grantReward(grantAddressInput.value, rewardAmountInput.value);

};






async function isMetaMaskConnected()  {
  const accounts = await provider.listAccounts();
  console.log('account[0]' + accounts[0]);
  console.log('account length' + accounts.length);
  return accounts.length > 0;
}


window.addEventListener('load', async (event) => {

  // const daiApy = await calculateApy('DAI');
  // daiApyElement.innerText = daiApy.toFixed(2);
  provider = new ethers.providers.Web3Provider(window.ethereum);

  let connected = await isMetaMaskConnected();
  if (connected){
    // metamask is connected
    console.log('metamask is connected to ' + window.ethereum.selectedAddress);
    enableEthereumButton.disabled = true;
    enableEthereumButton.innerHTML = window.ethereum.selectedAddress;


    console.log('Loading');
  } else{
    // metamask is not connected
    console.log('metamask is not connected');
    document.getElementById('metamask-announce').style.display = "block";
  }

  console.log('Completed');

});

