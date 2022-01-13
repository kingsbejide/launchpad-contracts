import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Contract } from '@ethersproject/contracts'
import { mineNext } from './helpers'

export default describe('vIDIA', function () {
  // unset timeout from the test
  this.timeout(0)

  let vIDIA: Contract
  let VestToken: Contract

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

    await vIDIA.setPenalty(penalty, VestToken.address)
    mineNext()

    const value = await vIDIA.tokenConfigurations(VestToken.address)
    expect(value.penalty.to.equal(10))
  })
})
