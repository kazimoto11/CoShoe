const truffleAssert = require('truffle-assertions')

// import the contract artifact
const CoShoe = artifacts.require('./CoShoe.sol')

// test starts here
contract('CoShoe', function (accounts) {
  // predefine the contract instance
  let CoShoeInstance

  // before each test, create a new contract instance
  beforeEach(async function () {
    CoShoeInstance = await CoShoe.new()
  })

  //test 1
  it("Should check if 100 coins were minted on deployment", async function() {
    // tokens calls upon noOfTokens function to check if 100 coins were minted on deployment
    let tokens = await CoShoeInstance.noOfTokens()
    //Check if 100 coins were minted
    assert.equal(tokens.toNumber(), 100, "100 coins were not minted on deployment")
  })

  //test 2 checks transfers ownnership,sets name&image,sets sold and updates shoe count for buyshoe function
  it("Should test buyShoe function- transfers ownnership,sets name&image,sets sold and updates shoe counts", async function(){
      //await CoShoeInstance.buyShoe("nike", "just do it", {from: accounts[1], value: 0.5 * 10**18})
      let shoes = await CoShoeInstance.buyShoe("nike", "just do it", {from: accounts[1], value: 0.5 * 10**18})
      //
      assert.equal(shoes.owner, accounts[1])
      assert.equal(shoes.name, "nike")
      assert.equal(shoes.image, "just do it")
      assert.equal(shoes.sold,true)
    })

    //test 3 -revert
    it("Should revert if price is not 0.5 ether", async function (){
      await truffleAssert.reverts(CoShoeInstance.buyShoe("addidas","3 stripes",{from: accounts[1], "value": 4}))
    })

    //test 4 checkPurchases
    it("Should test checkPurchases function if returns the correct number of trues", async function (){
      let boughtshoe_ = await CoShoeInstance.buyShoe("nike", "just do it", {from: accounts[1], value: 0.5 * 10**18})
      await CoShoeInstance.checkPurchases(accounts[1])
      assert.equal(boughtshoe_.sold, true)
    })

})