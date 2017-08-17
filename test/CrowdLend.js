var CrowdLend = artifacts.require("./CrowdLend.sol");

contract('CrowdLend', function (accounts) {
  it("we should be able create a new loan", function () {
    var repo;
    var account_one = accounts[1];

    return CrowdLend.deployed().then(function (instance) {
      repo = instance;
      return repo.newLoanRequest(account_one, 20000);
    }).then(function (transactionHash) {

    })
  });

  it("we should be able offer to the new loan request", function () {

    var repo;
    var account_one = accounts[1];
    var investor_a = accounts[2];
    var investor_b = accounts[3];

    var requestID = 0;


    return CrowdLend.deployed().then(function (instance) {
      repo = instance;
      return repo.offer(requestID, 65, {from: investor_a, value: 5000});
    }).then(function () {
      return repo.checkGoalReached.call(requestID);
    }).then(function (goalReached) {
      assert.equal(false, goalReached);
      return repo.offer(requestID, 70, {from: investor_b, value: 15000});
    }).then(function () {
      return repo.checkGoalReached.call(requestID);
    }).then(function (goalReached) {
      assert.equal(true, goalReached);
    });
  });
});
