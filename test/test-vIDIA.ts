import '@nomiclabs/hardhat-ethers'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Contract } from '@ethersproject/contracts'
import { mineNext } from './helpers'

export default describe('vIDIA', function () {
  // unset timeout from the test
  this.timeout(0)

  let vIDIA: Contract
  let VestToken: Contract
  let owner: SignerWithAddress
  let vester: SignerWithAddress

  it('deploys', async function () {
    // get owner
    // const [owner] = await ethers.getSigners()

    // deploy
    const vIDIAFactory = await ethers.getContractFactory('vIDIA')
    const vIDIA = await vIDIAFactory.deploy()

    // test
    mineNext()
    await vIDIA.stake('123456')
    mineNext()
  })

  it('deploys and can set penalty of a token', async function () {
    mineNext()

    const vIDIAFactory = await ethers.getContractFactory('vIDIA')
    vIDIA = await vIDIAFactory.deploy()

    mineNext()

    const [owner] = await ethers.getSigners()
    const penalty = 10
    const TestTokenFactory = await ethers.getContractFactory('GenericToken')
    VestToken = await TestTokenFactory.connect(owner).deploy(
      'Test Vest Token',
      'Vest',
      '21000000000000000000000000' // 21 million * 10**18
    )
    mineNext()

    await vIDIA.setPenalty(penalty, VestToken.address)
    mineNext()

    const value = await vIDIA.tokenConfigurations(VestToken.address)
    expect(value.penalty).to.equal(10)
  })

  it('deploys and cannot set penalty of a token, thus still 0', async function () {
    mineNext()

    const vIDIAFactory = await ethers.getContractFactory('vIDIA')
    vIDIA = await vIDIAFactory.deploy()

    mineNext()

    owner = (await ethers.getSigners())[0]
    vester = (await ethers.getSigners())[1]
    const penalty = 10
    const TestTokenFactory = await ethers.getContractFactory('GenericToken')
    VestToken = await TestTokenFactory.connect(owner).deploy(
      'Test Vest Token',
      'Vest',
      '21000000000000000000000000' // 21 million * 10**18
    )
    mineNext()

    await vIDIA.connect(vester).setPenalty(penalty, VestToken.address)
    mineNext()

    const value = await vIDIA.tokenConfigurations(VestToken.address)
    expect(value.penalty).to.equal(0)
  })

  it('deploys and can set delay of a token', async function () {
    mineNext()

    const vIDIAFactory = await ethers.getContractFactory('vIDIA')
    vIDIA = await vIDIAFactory.deploy()

    mineNext()

    const [owner] = await ethers.getSigners()
    const delay = 10
    const TestTokenFactory = await ethers.getContractFactory('GenericToken')
    VestToken = await TestTokenFactory.connect(owner).deploy(
      'Test Vest Token',
      'Vest',
      '21000000000000000000000000' // 21 million * 10**18
    )
    mineNext()

    await vIDIA.setUnvestingDelay(delay, VestToken.address)
    mineNext()

    const value = await vIDIA.tokenConfigurations(VestToken.address)
    expect(value.unvestingDelay).to.equal(10)
  })

  it('deploys and cannot set delay of a token, thus still 0', async function () {
    mineNext()

    const vIDIAFactory = await ethers.getContractFactory('vIDIA')
    vIDIA = await vIDIAFactory.deploy()

    mineNext()

    owner = (await ethers.getSigners())[0]
    vester = (await ethers.getSigners())[1]
    const delay = 10
    const TestTokenFactory = await ethers.getContractFactory('GenericToken')
    VestToken = await TestTokenFactory.connect(owner).deploy(
      'Test Vest Token',
      'Vest',
      '21000000000000000000000000' // 21 million * 10**18
    )
    mineNext()

    await vIDIA.connect(vester).setUnvestingDelay(delay, VestToken.address)
    mineNext()

    const value = await vIDIA.tokenConfigurations(VestToken.address)
    expect(value.unvestingDelay).to.equal(0)
  })

  it('deploys and stakes tokens', async function () {
    mineNext() 
    const vIDIAFactory = await ethers.getContractFactory('vIDIA')
    vIDIA = await vIDIAFactory.deploy()
    mineNext()
    owner = (await ethers.getSigners())[0]
    vester = (await ethers.getSigners())[1]

    VestToken = await TestTokenFactory.connect(owner).deploy(
      'Test Vest Token',
      'Vest',
      '21000000000000000000000000' // 21 million * 10**18
    )
    mineNext()
    await vIDIA.stake('100',VestToken.address)
    const value = await vIDIA.tokenConfigurations(VestToken.address)
    expect(value.totalStakers).to.equal(1);
    expect(value.totalStakedAmount).to.equal(100);

    const delay = 10
    await vIDIA.stake('250',VestToken.address)
    const value1 = await vIDIA.tokenConfigurations(VestToken.address)

    expect(value.totalStakers).to.equal(2);
    expect(value.totalStakedAmount).to.equal(350);
    mineNext()
  })

  

  it('deploys and does not stake negative or 0 tokens', async function () {
    mineNext() 
    const vIDIAFactory = await ethers.getContractFactory('vIDIA')
    vIDIA = await vIDIAFactory.deploy()
    mineNext()
    owner = (await ethers.getSigners())[0]
    vester = (await ethers.getSigners())[1]

    VestToken = await TestTokenFactory.connect(owner).deploy(
      'Test Vest Token',
      'Vest',
      '21000000000000000000000000' // 21 million * 10**18
    )
    mineNext()
    await vIDIA.stake('0',VestToken.address)
    const value = await vIDIA.tokenConfigurations(VestToken.address)
    expect(value.totalStakers).to.equal(0);
    expect(value.totalStakedAmount).to.equal(0);

    const delay = 10
    await vIDIA.stake('-1',VestToken.address)
    const value1 = await vIDIA.tokenConfigurations(VestToken.address)

    expect(value.totalStakers).to.equal(0);
    expect(value.totalStakedAmount).to.equal(0);
    mineNext()
  })

  it('deploys and stakes and unstakes tokens', async function () {
    mineNext() 
    const vIDIAFactory = await ethers.getContractFactory('vIDIA')
    vIDIA = await vIDIAFactory.deploy()
    mineNext()
    owner = (await ethers.getSigners())[0]
    vester = (await ethers.getSigners())[1]

    VestToken = await TestTokenFactory.connect(owner).deploy(
      'Test Vest Token',
      'Vest',
      '21000000000000000000000000' // 21 million * 10**18
    )
    mineNext()
    await vIDIA.stake('100',VestToken.address)
    const value = await vIDIA.tokenConfigurations(VestToken.address)
    expect(value.totalStakers).to.equal(1);
    expect(value.totalStakedAmount).to.equal(100);

    const delay = 10
    await vIDIA.stake('250',VestToken.address)
    const value1 = await vIDIA.tokenConfigurations(VestToken.address)

    expect(value.totalStakers).to.equal(2);
    expect(value.totalStakedAmount).to.equal(350);

    mineNext()
    await vIDIA.unstake('250',VestToken.address)
    const unstakedValue = await vIDIA.tokenConfigurations(VestToken.address);
    expect(unstakedValue.totalStakers).to.equal(1)
    expect(unstakedValue.totalStakedAmount).to.equal(100);

  })


})
