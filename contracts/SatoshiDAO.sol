//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SatoshiDAOTask {

    string private taskName;
    address private rewardToken;

    //user address => staking or not. (When user stake some fee, they are eligible to start given task.)
    mapping(address => bool) private staking;

    //user address => reward amount
    mapping(address => uint256) private rewards;

    constructor(string memory _taskName, address memory _rewardToken) {
        taskName = _taskName;
        rewardToken = _rewardToken;
    }

    function stakeForTask() public {
        staking[msg.sender] = true;
    }

    //TODO make parameter array(enable reward granting to multiple people at once)
    function grantReward(address user, uint256 amount){
        rewards[user] += amount;
    }

    function claimReward(uint256 amount) public {
        require(rewards[msg.sender] >= amount, 'Not eligible to claim reward');
        rewards[msg.sender] -= amount;
        IERC20(rewardToken).transfer(msg.sender, amount);
    }

    function withdrawReward(uint256 amount) onlyOwner {
        require(IERC20(address(this)).balanceOf(rewardToken) >= amount, 'Not enough balance to withdraw');
        IERC20(rewardToken).transfer(msg.sender, amount);
    }
}
