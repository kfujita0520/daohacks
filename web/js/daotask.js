
const DAOTokenAddress = "0xfb694C14B7BDB2E630948ac770B1c4BeaC8416C9";
const DAOTaskAddress = "0xb452601270aca917C24678D6CF0ca21304BB383B";
const stakeTaskButton = document.getElementById('stake-task-button');
const TaskCompleteButton = document.getElementById('task-complete-button');
const claimRewardButton = document.getElementById('claim-reward-button');
const claimRewardInput = document.getElementById('claim-reward');
const descBox = document.getElementById('buy-announce');
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


stakeTaskButton.onclick = async () => {
  const signer = await provider.getSigner();
  let signerAddr = await signer.getAddress();
  console.log(signerAddr);
  const DAOTaskContract = new ethers.Contract(DAOTaskAddress, daoTaskAbi, signer);

  await DAOTaskContract.stakeForTask();

};

TaskCompleteButton.onclick = async () => {
  const signer = await provider.getSigner();
  const DAOTaskContract = new ethers.Contract(DAOTaskAddress, daoTaskAbi, signer);

  await DAOTaskContract.completeTask();

};



claimRewardButton.onclick = async () => {
  const signer = await provider.getSigner();
  // let address = await signer.getAddress();
  // console.log(address);
  const DAOTaskContract = new ethers.Contract(DAOTaskAddress, daoTaskAbi, signer);
  console.log(claimRewardInput.value);
  //await DAOTaskContract.connect(signer);
  await DAOTaskContract.claimReward(claimRewardInput.value);

  let reward = await DAOTaskContract.getReward(window.ethereum.selectedAddress);
  document.getElementById('reward_amount').innerHTML = reward.toNumber();

};



async function getTokenBalance(tokenAddress, accountAddress) {
  const erc20Contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
  let bal = await erc20Contract.balanceOf(accountAddress);
  let decimals = await erc20Contract.decimals();
  console.log('balance of toeken: ', ethers.utils.formatUnits(bal, decimals));
  return ethers.utils.formatUnits(bal, decimals);

  // let tokenBal = (balance/Math.pow(10, unit)).toFixed(3);

}



async function setupStatus() {
  Promise.allSettled([setupStakeStatus(), setupRewardStatus()]).then(result => {
    console.log('Complete promise');
  });

}

async function setupStakeStatus() {
  const DAOTaskContract = new ethers.Contract(DAOTaskAddress, daoTaskAbi, provider);
  let status = await DAOTaskContract.getStaking(window.ethereum.selectedAddress);
  console.log('status: ', status.toNumber());
  if(status.toNumber()!==1){
    stakeTaskButton.disabled = false;
  } else {
    TaskCompleteButton.disabled = false;
  }
}

async function setupRewardStatus() {
  const DAOTaskContract = new ethers.Contract(DAOTaskAddress, daoTaskAbi, provider);
  let reward = await DAOTaskContract.getReward(window.ethereum.selectedAddress);
  console.log('reward: ', reward.toNumber());
  document.getElementById('reward_amount').innerHTML = reward.toNumber();
  if(reward.toNumber() > 0){
    claimRewardButton.disabled = false;
  }
}



async function isMetaMaskConnected()  {
  const accounts = await provider.listAccounts();
  console.log('account[0]' + accounts[0]);
  console.log('account length' + accounts.length);
  return accounts.length > 0;
}

async function tokenHoldCheck()  {
  let balance = await getTokenBalance(DAOTokenAddress, window.ethereum.selectedAddress);
  console.log('balance: ', balance)
  return balance > 1000;
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

    await setupStatus();
    let isTokenHolder = await tokenHoldCheck();
    if(!isTokenHolder){
      descBox.style.display = "block";
    }


    console.log('Loading');
  } else{
    // metamask is not connected
    console.log('metamask is not connected');
    document.getElementById('metamask-announce').style.display = "block";
  }

  console.log('Completed');




});

