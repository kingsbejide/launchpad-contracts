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
    const testAddress = '0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc'
    const testTokenAddress = '0x0b15Ddf19D47E6a86A56148fb4aFFFc6929BcB89'
    const vIDIA = await vIDIAFactory.deploy(
      'vIDIA contract',
      'VIDIA',
      testAddress,
      testTokenAddress
    )

    // test
    mineNext()
    // await vIDIA.stake('123456')
    mineNext()
  })

  // it('deploys and can set penalty of a token', async function () {
  //   mineNext()

  //   const vIDIAFactory = await ethers.getContractFactory('vIDIA')
  //   vIDIA = await vIDIAFactory.deploy()

  //   mineNext()

  //   const [owner] = await ethers.getSigners()
  //   const penalty = 10
  //   const TestTokenFactory = await ethers.getContractFactory('GenericToken')
  //   VestToken = await TestTokenFactory.connect(owner).deploy(
  //     'Test Vest Token',
  //     'Vest',
  //     '21000000000000000000000000' // 21 million * 10**18
  //   )
  //   mineNext()

  //   await vIDIA.setPenalty(penalty, VestToken.address)
  //   mineNext()

  //   const value = await vIDIA.tokenConfigurations(VestToken.address)
  //   expect(value.penalty).to.equal(10)
  // })

  // it('deploys and cannot set penalty of a token, thus still 0', async function () {
  //   mineNext()

  //   const vIDIAFactory = await ethers.getContractFactory('vIDIA')
  //   vIDIA = await vIDIAFactory.deploy()

  //   mineNext()

  //   owner = (await ethers.getSigners())[0]
  //   vester = (await ethers.getSigners())[1]
  //   const penalty = 10
  //   const TestTokenFactory = await ethers.getContractFactory('GenericToken')
  //   VestToken = await TestTokenFactory.connect(owner).deploy(
  //     'Test Vest Token',
  //     'Vest',
  //     '21000000000000000000000000' // 21 million * 10**18
  //   )
  //   mineNext()

  //   await vIDIA.connect(vester).setPenalty(penalty, VestToken.address)
  //   mineNext()

  //   const value = await vIDIA.tokenConfigurations(VestToken.address)
  //   expect(value.penalty).to.equal(0)
  // })

  // it('deploys and can set delay of a token', async function () {
  //   mineNext()

  //   const vIDIAFactory = await ethers.getContractFactory('vIDIA')
  //   vIDIA = await vIDIAFactory.deploy()

  //   mineNext()

  //   const [owner] = await ethers.getSigners()
  //   const delay = 10
  //   const TestTokenFactory = await ethers.getContractFactory('GenericToken')
  //   VestToken = await TestTokenFactory.connect(owner).deploy(
  //     'Test Vest Token',
  //     'Vest',
  //     '21000000000000000000000000' // 21 million * 10**18
  //   )
  //   mineNext()

  //   await vIDIA.setUnvestingDelay(delay, VestToken.address)
  //   mineNext()

  //   const value = await vIDIA.tokenConfigurations(VestToken.address)
  //   expect(value.unvestingDelay).to.equal(10)
  // })

  // it('deploys and cannot set delay of a token, thus still 0', async function () {
  //   mineNext()

  //   const vIDIAFactory = await ethers.getContractFactory('vIDIA')
  //   vIDIA = await vIDIAFactory.deploy()

  //   mineNext()

  //   owner = (await ethers.getSigners())[0]
  //   vester = (await ethers.getSigners())[1]
  //   const delay = 10
  //   const TestTokenFactory = await ethers.getContractFactory('GenericToken')
  //   VestToken = await TestTokenFactory.connect(owner).deploy(
  //     'Test Vest Token',
  //     'Vest',
  //     '21000000000000000000000000' // 21 million * 10**18
  //   )
  //   mineNext()

  //   await vIDIA.connect(vester).setUnvestingDelay(delay, VestToken.address)
  //   mineNext()

  //   const value = await vIDIA.tokenConfigurations(VestToken.address)
  //   expect(value.unvestingDelay).to.equal(0)
  // })

  it('deploys and stakes tokens', async function () {
    mineNext()
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
    await VestToken.connect(vester).approve(vIDIA.address, '10000000')

    await vIDIA.connect(vester).stake('100')
    let totalStaked = (await vIDIA.totalStakedAmount()).toNumber()
    expect(totalStaked).to.eq(100)
    let totalStakers = (await vIDIA.totalStakers()).toNumber()
    expect(totalStakers).to.eq(1)

    // const delay = 10
    await vIDIA.connect(vester).stake('250')
    totalStaked = (await vIDIA.totalStakedAmount()).toNumber()
    expect(totalStaked).to.eq(350)
    totalStakers = (await vIDIA.totalStakers()).toNumber()
    expect(totalStakers).to.eq(2)
  })

  it('deploys and does not stake 0  tokens', async function () {
    mineNext()
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
    await VestToken.connect(vester).approve(vIDIA.address, '10000000')

    await expect(
      vIDIA.connect(vester).stake('0')
    ).to.be.revertedWith('User cannot stake 0 tokens')

  })
})
