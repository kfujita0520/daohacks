# Task Management for DAO
This project demonstrates Proof of Concept(PoC) of Task Management System for DAO member. 
The sceop of PoC and its technical architecture is explained below. 

## Functionality
### 1) Task Status Management
DAO members can take a given task from DAO. For that, they need to stake a small piece of coin for showing their commitment. 
Once they stake, they can see actual task page. (This is not the scope of the demo. This should be implemented separately in centralized way)
Once they complete the task, they can report its completion. Our dAPP record the status of task for each user. 

### 2) Reward Management
Once DAO memebers repoted the completion of its task, DAO admin will grant the specified amount of reward to member. 
Reward grant will be done in admin page, which shoud be accessible only admin member. 
Reward process is recorded in dAPP but it is done manually rathen than automated as task page is implemeted in centralized way.
After reward is granted by admin, member can see his claimable reward amount on our page and claim the reward at their convenient time.

### 3) Token Purchase
For those who do not have our DAO token which is needed for staking to apply tasks, 
our system offers the token purchase function where user can buy our token with exchanging native ETH tokens. 

### 4) Login Authentication (T.B.D.)
Implement login authentication function for Admin page access. (UX can be similar to OpenSea)
This function is still not implemented. 

## Architecture
DAOTask smart contract will manage above all functions, and clients(HTML/java script) will interact with this smart contract via Metamask(provider). 
For Login authentication, separate centralized database is needed to manage user information, which is still not implemented.   
