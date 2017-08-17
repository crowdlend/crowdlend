pragma solidity ^0.4.11;

contract CrowdLend {
  struct Lender {
  address addr;
  uint amount;
  uint interest;
  }

  struct LoanRequest {
  address beneficiary;
  uint loanGoal;
  uint numLenders;
  uint amount;
  mapping (uint => Lender) lenders;
  }

  uint numOffers;

  mapping (uint => LoanRequest) requests;

function CrowdLend() {
  tx.origin;
}

  function newLoanRequest(address beneficiary, uint goal) returns (uint offerID) {
    offerID = numOffers++;
    requests[offerID] = LoanRequest(beneficiary, goal, 0, 0);
  }

  function offer(uint offerID, uint interest) payable {
    LoanRequest storage c = requests[offerID];
    c.lenders[c.numLenders++] = Lender({addr : msg.sender, amount : msg.value, interest: interest});
    c.amount += msg.value;
  }

  function checkGoalReached(uint campaignID) returns (bool reached) {
    LoanRequest storage c = requests[campaignID];
    if (c.amount < c.loanGoal)
    return false;
    uint amount = c.amount;
    c.amount = 0;
    c.beneficiary.transfer(amount);
    return true;
  }
}
