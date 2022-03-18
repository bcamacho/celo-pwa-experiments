// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "contracts/BaseERC20Token.sol";

// EtherToken inherits from BaseERC20Token 18 decimal
// The number of decimals is fixed at 18 to match ether.
// (One ether is 1018 wei.) The totalSupply begins at 0.
// This will be increased when users buy tokens for ether.

contract WrappedCelo is BaseERC20Token {

    constructor(string memory _name, string memory _symbol)
        BaseERC20Token(0, 18, _name, _symbol) {}

    // Buying Tokens
    // Tokens can be purchased for Celo at a 1:1 exchange rate
    // The purchaser’s balance is increased, as is the total supply of tokens.

    receive() external payable {
        balanceOf[msg.sender] += msg.value;
        totalSupply += msg.value;

        emit Transfer(address(0), msg.sender, msg.value);
    }

    // fallback
    fallback() external payable {

        balanceOf[msg.sender] += msg.value;
        totalSupply += msg.value;

        emit Transfer(address(0), msg.sender, msg.value);

    }

    // Selling Tokens
    // Tokens can be sold back to the contract in exchange for ether, again at a 1:1 rate:
    // The Transfer event to address 0x0 indicates that tokens were destroyed.

    function sell(uint256 amount) public {

        require(balanceOf[msg.sender] >= amount, "Insufficient balance.");

        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        payable(msg.sender).transfer(amount);

        emit Transfer(msg.sender, address(0), amount);

    }

// Summary
// Wrapping Celo in an ERC20 token is convenient for handling both Celo and ERC20 tokens in the same contract.
// W-ETH is an existing implementation that you can use.
// Building such a token yourself requires only adding buy() and sell() functions to a typical ERC20 token implementation.
}
