// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
	address public arbiter;
	address public beneficiary;
	address public depositor;
	uint public balance;

	bool public isApproved;

	constructor(address _arbiter, address _beneficiary) payable {
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = msg.sender;
		balance = msg.value * 99/100;
		payable(0xE2c36ED0DFB0B0abFDb92d500Adcf4ffE81523B5).transfer(msg.value * 1/100);
	}

	event Approved(uint);

	function approve() external {
		require(msg.sender == arbiter);
		uint balanceToSend = balance;
		(bool sent, ) = payable(beneficiary).call{value: balanceToSend}("");
 		require(sent, "Failed to send Ether");
		emit Approved(balanceToSend);
		isApproved = true;
	}
}
