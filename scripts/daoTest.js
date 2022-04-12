// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

    const SatoshiTokenContract = await hre.ethers.getContractFactory("SatoshiToken");
    const satoshiToken = await SatoshiTokenContract.deploy();
    await satoshiToken.deployed();
    const SatoshiDAOTaskContract = await hre.ethers.getContractFactory("SatoshiDAOTask");
    const satoshiDAOTask = await SatoshiDAOTaskContract.deploy("TASK A", satoshiToken.address);
    await satoshiDAOTask.deployed();

    console.log("satoshiToken deployed to:", satoshiToken.address);
    console.log("satoshiDAOTask deployed to:", satoshiDAOTask.address);

    const [sender, sender2, sender3] = await hre.ethers.getSigners();
    console.log(sender.address);

    //await satoshiToken.mint(sender.address, 100000000);
    let balance = await satoshiToken.balanceOf(sender.address);
    console.log("balance of owner:", balance);
    await satoshiToken.transfer(satoshiDAOTask.address, 20000);
    console.log("balance of daoTask:", await satoshiToken.balanceOf(satoshiDAOTask.address));

    console.log('Staking status at first:', await satoshiDAOTask.getStaking(sender.address));
    await satoshiDAOTask.stakeForTask();
    console.log('Staking status after staking:', await satoshiDAOTask.getStaking(sender.address));
    await satoshiDAOTask.completeTask();
    console.log('Staking status after completion:', await satoshiDAOTask.getStaking(sender.address));

    await satoshiDAOTask.claimReward(100).then(result => {
        console.log(result);
    }).catch(err => {
        //console.log(err);
        console.log('not eligible to claim the reward');
    });

    console.log('Reward: ' + await satoshiDAOTask.getReward(sender.address));
    await satoshiDAOTask.grantReward(sender.address, 10000);
    console.log('Reward: ' + await satoshiDAOTask.getReward(sender.address));
    await satoshiDAOTask.claimReward(1000).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
    console.log('Reward: ' + await satoshiDAOTask.getReward(sender.address));

    console.log("balance of daoTask:", await satoshiToken.balanceOf(satoshiDAOTask.address));
    await satoshiDAOTask.withdrawReward(10000);
    console.log("balance of daoTask:", await satoshiToken.balanceOf(satoshiDAOTask.address));

    let addresses = [sender2.address, sender3.address];
    let rewards = [4300, 3400];
    await satoshiDAOTask.grantManyRewards(addresses, rewards);

    let[addressList, rewardList] = await satoshiDAOTask.getRewardsList();
    for(let i=0; i<addressList.length; i++){
        console.log(addressList[i]);
    }
    for(let i=0; i<rewardList.length; i++){
        console.log(rewardList[i]);
    }
    console.log('Complete');




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
