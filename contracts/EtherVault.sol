//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./StableCoin.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//1eth = 10^18wei

contract EtherVault is Ownable{

    struct Vault{
        uint256 etherCollateral; //in wei 
        uint256 tokenDebt;
    }

    mapping (address => Vault) vaultBalance;
   
    StableCoin public token;
    AggregatorV3Interface public priceFeed;

    /**
     * Network: rinkeby
     * Aggregator: ETH/USD
     * Address: 	0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
     */

    event Deposit(uint deposit, uint mint);
    event Withdraw(uint withdraw, uint burn);
    constructor(StableCoin _token){
        token = _token;
        priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    }

    

    function depositEther(uint256 etherDeposit) payable external{ //ether deposit is in wei
        require(etherDeposit == msg.value, "wrong amount of ether sent");
        uint256 tokenToMint = etherDeposit * getEthUSDPrice(); // 1*1000
        token.mint(msg.sender, (tokenToMint/(10**18)));
        vaultBalance[msg.sender].etherCollateral += etherDeposit;
        vaultBalance[msg.sender].tokenDebt += (tokenToMint/(10**18));
        emit Deposit(etherDeposit, (tokenToMint/(10**18)));
    }


    function withdrawEther(uint256 etherToWithdraw) external{ //value is in wei
        uint repayTokenAmount = etherToWithdraw * getEthUSDPrice();
        require(repayTokenAmount/(10**18) <= vaultBalance[msg.sender].tokenDebt, "withdraw limit exceeded");
        require(token.balanceOf(msg.sender) >= repayTokenAmount/(10**18), "not enough token balance");
        token.burn(msg.sender, (repayTokenAmount/(10**18)));
       
        vaultBalance[msg.sender].etherCollateral -= etherToWithdraw;
        vaultBalance[msg.sender].tokenDebt -= repayTokenAmount/(10**18);
        payable(msg.sender).transfer(etherToWithdraw);
        emit Withdraw(etherToWithdraw, repayTokenAmount/(10**18));
    }

    function getBalance(address userAddress) external view returns(Vault memory vault){
        return vaultBalance[userAddress];
    }

    function getEthUSDPrice() public view returns(uint){ 
        (,int price,,,) = priceFeed.latestRoundData();  
        return uint(price*(10**10)); // cause USD pair has 10^8 decimals, converting to 10^18
    }
}