import '@nomiclabs/hardhat-ethers'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Contract } from '@ethersproject/contracts'
import { mineNext } from './helpers'

const MaxUint256 = ethers.constants.MaxUint256
const WeiPerEth = ethers.constants.WeiPerEther
const one = ethers.constants.One

export default describe('vIDIA', function () {
  // unset timeout from the test
  this.timeout(0)

  let vIDIA: Contract
  let VestToken: Contract
  let owner: SignerWithAddress
  let vester: SignerWithAddress

  it('deploys', async function () {
    // get owner
    const [owner] = await ethers.getSigners()

    // deploy
    const vIDIAFactory = await ethers.getContractFactory('vIDIA')

    const testTokenAddress = '0x0b15Ddf19D47E6a86A56148fb4aFFFc6929BcB89'
    const vIDIA = await vIDIAFactory.deploy(
      'vIDIA contract',
      'VIDIA',
      owner.address,
      testTokenAddress
    )
<<<<<<< HEAD

=======
>>>>>>> c4b2487115aac0c8265b916b085c93711ede91c2
  })

  // it('deploys and can set penalty of a token', async function () {

  //   const vIDIAFactory = await ethers.getContractFactory('vIDIA')
  //   vIDIA = await vIDIAFactory.deploy()

<<<<<<< HEAD

=======
>>>>>>> c4b2487115aac0c8265b916b085c93711ede91c2
  //   const [owner] = await ethers.getSigners()
  //   const penalty = 10
  //   const TestTokenFactory = await ethers.getContractFactory('GenericToken')
  //   VestToken = await TestTokenFactory.connect(owner).deploy(
  //     'Test Vest Token',
  //     'Vest',
  //     '21000000000000000000000000' // 21 million * 10**18
  //   )

  //   await vIDIA.setPenalty(penalty, VestToken.address)

  //   const value = await vIDIA.tokenConfigurations(VestToken.address)
  //   expect(value.penalty).to.equal(10)
  // })

  // it('deploys and cannot set penalty of a token, thus still 0', async function () {

  //   const vIDIAFactory = await ethers.getContractFactory('vIDIA')
  //   vIDIA = await vIDIAFactory.deploy()

  //   owner = (await ethers.getSigners())[0]
  //   vester = (await ethers.getSigners())[1]
  //   const penalty = 10
  //   const TestTokenFactory = await ethers.getContractFactory('GenericToken')
  //   VestToken = await TestTokenFactory.connect(owner).deploy(
  //     'Test Vest Token',
  //     'Vest',
  //     '21000000000000000000000000' // 21 million * 10**18
  //   )
  //   await vIDIA.connect(vester).setPenalty(penalty, VestToken.address)

<<<<<<< HEAD

=======
>>>>>>> c4b2487115aac0c8265b916b085c93711ede91c2
  //   const value = await vIDIA.tokenConfigurations(VestToken.address)
  //   expect(value.penalty).to.equal(0)
  // })

  // it('deploys and can set delay of a token', async function () {
<<<<<<< HEAD


  //   const vIDIAFactory = await ethers.getContractFactory('vIDIA')
  //   vIDIA = await vIDIAFactory.deploy()

 

  //   const [owner] = await ethers.getSigners()
  //   const delay = 10
  //   const TestTokenFactory = await ethers.getContractFactory('GenericToken')
  //   VestToken = await TestTokenFactory.connect(owner).deploy(
  //     'Test Vest Token',
  //     'Vest',
  //     '21000000000000000000000000' // 21 million * 10**18
  //   )


  //   await vIDIA.setUnvestingDelay(delay, VestToken.address)


  //   const value = await vIDIA.tokenConfigurations(VestToken.address)
  //   expect(value.unvestingDelay).to.equal(10)
  // })

  // it('deploys and cannot set delay of a token, thus still 0', async function () {
 

  //   const vIDIAFactory = await ethers.getContractFactory('vIDIA')
  //   vIDIA = await vIDIAFactory.deploy()

  

  //   owner = (await ethers.getSigners())[0]
  //   vester = (await ethers.getSigners())[1]
  //   const delay = 10
  //   const TestTokenFactory = await ethers.getContractFactory('GenericToken')
  //   VestToken = await TestTokenFactory.connect(owner).deploy(
  //     'Test Vest Token',
  //     'Vest',
  //     '21000000000000000000000000' // 21 million * 10**18
  //   )

  //   await vIDIA.connect(vester).setUnvestingDelay(delay, VestToken.address)

  //   const value = await vIDIA.tokenConfigurations(VestToken.address)
  //   expect(value.unvestingDelay).to.equal(0)
  // })

  it('deploys and stakes tokens', async function () {
    const vIDIAFactory = await ethers.getContractFactory('vIDIA')
    const testAddress = '0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc'
    owner = (await ethers.getSigners())[0]
    vester = (await ethers.getSigners())[1]
    const TestTokenFactory = await ethers.getContractFactory('GenericToken')
    VestToken = await TestTokenFactory.connect(owner).deploy(
      'Test Vest Token',
      'Vest',
      '21000000000000000000000000' // 21 million * 10**18
    )
    vIDIA = await vIDIAFactory.deploy(
      'vIDIA contract',
      'VIDIA',
      testAddress,
      VestToken.address
    )

    await VestToken.transfer(vester.address, ethers.constants.MaxUint256) //times out here
    await VestToken.connect(vester).approve(vIDIA.address, '10000000')
    const firstStakeAmt = 100
    const secondStakeAmt = 250
    await vIDIA.connect(vester).stake(firstStakeAmt)
    let totalStaked = (await vIDIA.totalStakedAmount()).toNumber()
    expect(totalStaked).to.eq(firstStakeAmt)
    let totalStakers = (await vIDIA.totalStakers()).toNumber()
    expect(totalStakers).to.eq(1)

    // const delay = 10
    await vIDIA.connect(vester).stake(secondStakeAmt)
    totalStaked = (await vIDIA.totalStakedAmount()).toNumber()
    expect(totalStaked).to.eq(firstStakeAmt + secondStakeAmt)
    totalStakers = (await vIDIA.totalStakers()).toNumber()
    expect(totalStakers).to.eq(2)
  })

  it('deploys and does not stake 0  tokens', async function () {
    const vIDIAFactory = await ethers.getContractFactory('vIDIA')
    const testAddress = '0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc'
    owner = (await ethers.getSigners())[0]
    vester = (await ethers.getSigners())[1]
    const TestTokenFactory = await ethers.getContractFactory('GenericToken')
    VestToken = await TestTokenFactory.connect(owner).deploy(
      'Test Vest Token',
      'Vest',
      '21000000000000000000000000' // 21 million * 10**18
    )
    vIDIA = await vIDIAFactory.deploy(
      'vIDIA contract',
      'VIDIA',
      testAddress,
      VestToken.address
    )

    await VestToken.transfer(vester.address, '1000') //times out here
    await VestToken.connect(vester).approve(vIDIA.address, ethers.constants.MaxUint256)

    await expect(
      vIDIA.connect(vester).stake('0')
    ).to.be.revertedWith('User cannot stake 0 tokens')

  })
=======

  //   const vIDIAFactory = await ethers.getContractFactory('vIDIA')
  //   vIDIA = await vIDIAFactory.deploy()

  //   const [owner] = await ethers.getSigners()
  //   const delay = 10
  //   const TestTokenFactory = await ethers.getContractFactory('GenericToken')
  //   VestToken = await TestTokenFactory.connect(owner).deploy(
  //     'Test Vest Token',
  //     'Vest',
  //     '21000000000000000000000000' // 21 million * 10**18
  //   )

  //   await vIDIA.setUnvestingDelay(delay, VestToken.address)

  //   const value = await vIDIA.tokenConfigurations(VestToken.address)
  //   expect(value.unvestingDelay).to.equal(10)
  // })

  // it('deploys and cannot set delay of a token, thus still 0', async function () {

  //   const vIDIAFactory = await ethers.getContractFactory('vIDIA')
  //   vIDIA = await vIDIAFactory.deploy()

  //   owner = (await ethers.getSigners())[0]
  //   vester = (await ethers.getSigners())[1]
  //   const delay = 10
  //   const TestTokenFactory = await ethers.getContractFactory('GenericToken')
  //   VestToken = await TestTokenFactory.connect(owner).deploy(
  //     'Test Vest Token',
  //     'Vest',
  //     '21000000000000000000000000' // 21 million * 10**18
  //   )

  //   await vIDIA.connect(vester).setUnvestingDelay(delay, VestToken.address)
>>>>>>> c4b2487115aac0c8265b916b085c93711ede91c2

  //   const value = await vIDIA.tokenConfigurations(VestToken.address)
  //   expect(value.unvestingDelay).to.equal(0)
  // })

  it('test whitelist feature', async () => {
    const TestTokenFactory = await ethers.getContractFactory('GenericToken')
    const underlying = await TestTokenFactory.connect(owner).deploy(
      'Test',
      'TT',
      MaxUint256
    )
    const vidiaFactory = await ethers.getContractFactory('vIDIA')
    const vidia = await vidiaFactory.deploy(
      'Vested IDIA',
      'VIDIA',
      owner.address,
      underlying.address
    )

    await underlying.approve(vidia.address, MaxUint256)
    await vidia.stake(WeiPerEth)
    await vidia.approve(vester.address, MaxUint256)

    const checkFailure = async () => {
      await expect(vidia.transfer(vester.address, one)).to.be.revertedWith(
        'Origin and dest address not in whitelist'
      )
      await expect(
        vidia.connect(vester).transferFrom(owner.address, vester.address, one)
      ).to.be.revertedWith('Origin and dest address not in whitelist')
    }

    const checkSuccess = async () => {
      await expect(vidia.transfer(vester.address, one))
        .to.emit(vidia, 'Transfer')
        .withArgs(owner.address, vester.address, one)
      await expect(
        vidia.connect(vester).transferFrom(owner.address, vester.address, one)
      )
        .to.emit(vidia, 'Transfer')
        .withArgs(owner.address, vester.address, one)
    }

    const checkWhitelist = async (addrArr: string[]) => {
      expect(JSON.stringify(await vidia.getAllWhitelistedAddrs())).to.eq(
        JSON.stringify(addrArr)
      )
    }

    // case 1: no whitelist, should fail transfer
    await checkWhitelist([])
    await checkFailure()

    // case 2: source addr in whitelist, should not fail xfer
    await vidia.addToWhitelist(owner.address)
    await checkWhitelist([owner.address])
    await checkSuccess()

    // case 3: source addr and dest addr in whitelist, should not fail xfer
    await vidia.addToWhitelist(vester.address)
    await checkWhitelist([owner.address, vester.address])
    await checkSuccess()

    // case 4: dest addr in whitelist, should not fail xfer
    await vidia.removeFromWhitelist(owner.address)
    await checkWhitelist([vester.address])
    await checkSuccess()

    // case 5: remove all addr from whitelist, should fail xfer
    await vidia.removeFromWhitelist(vester.address)
    await checkWhitelist([])
    await checkFailure()
  })
})
