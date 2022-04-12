//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SatoshiDAOTask is Ownable{

    string private taskName;
    address private rewardToken;

    //user address => staking status. (When user stake some fee, they are eligible to start given task.)
    //0: initial, 1: staking, 2 completed
    mapping(address => uint256) private staking;

    //user address => reward amount
    mapping(address => uint256) private rewards;
    mapping(address => bool) rewardsIndex;
    address[] rewardList;

    constructor(string memory _taskName, address _rewardToken) {
        taskName = _taskName;
        rewardToken = _rewardToken;
    }

    function getStaking(address user) public view virtual returns (uint256) {
        return staking[user];
    }

    function getReward(address user) public view virtual returns (uint256) {
        return rewards[user];
    }

    function getRewardsList() public view returns (address[] memory, uint256[] memory) {
        address[] memory addressList = new address[](rewardList.length);
        uint256[] memory rewardAmountList = new uint256[](rewardList.length);
        for(uint256 i=0; i<rewardList.length; i++){
            addressList[i] = rewardList[i];
            rewardAmountList[i] = rewards[addressList[i]];
        }
        return (addressList, rewardAmountList);

    }

    function stakeForTask() public {
        //TODO  the status validation can be customized. For now, allow user to stake repeatedly once they complete the task.
        if(staking[msg.sender] != 1 ){
            staking[msg.sender] = 1;
        }
    }

    function completeTask() public {
        staking[msg.sender] = 2;
    }

    function grantReward(address user, uint256 amount) public onlyOwner {
        if(!rewardsIndex[user]){
            rewardsIndex[user] = true;
            rewardList.push(user);
        }
        rewards[user] += amount;
    }

    function grantManyRewards(address[] memory users, uint256[] memory amounts) public onlyOwner {
        require(users.length == amounts.length, 'given parameter is not appropriate');
        for (uint256 i=0; i<users.length; i++){
            if(!rewardsIndex[users[i]]){
                rewardsIndex[users[i]] = true;
                rewardList.push(users[i]);
            }
            rewards[users[i]] += amounts[i];
        }

    }

    function claimReward(uint256 amount) public {
        require(rewards[msg.sender] >= amount, 'Not eligible to claim reward');
        require(IERC20(rewardToken).balanceOf(address(this)) >= amount, 'Not enough balance to payout');
        rewards[msg.sender] -= amount;
        IERC20(rewardToken).transfer(msg.sender, amount);
    }

    function withdrawReward(uint256 amount) public onlyOwner {
        require(IERC20(rewardToken).balanceOf(address(this)) >= amount, 'Not enough balance to withdraw');
        IERC20(rewardToken).transfer(msg.sender, amount);
    }

}
