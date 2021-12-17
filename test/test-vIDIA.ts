import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { mineNext } from './helpers'

export default describe('vIDIA', function () {
  // unset timeout from the test
  this.timeout(0)

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
})
