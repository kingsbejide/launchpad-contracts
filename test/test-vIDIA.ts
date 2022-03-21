import '@nomiclabs/hardhat-ethers'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Contract } from '@ethersproject/contracts'
import { mineNext, getBlockTime } from './helpers'
import { first } from 'lodash'

const MaxUint256 = ethers.constants.MaxUint256
const WeiPerEth = ethers.constants.WeiPerEther
const one = ethers.constants.One

const convToBN = (num: number) => {
  return ethers.BigNumber.from(num).mul(WeiPerEth)
}

export default describe('vIDIA', function () {
  // unset timeout from the test
  this.timeout(0)

  let vIDIA: Contract
  let VestToken: Contract
  let owner: SignerWithAddress
  let vester: SignerWithAddress

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    // Token = await ethers.getContractFactory("Token");
    [owner, vester] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    const vIDIAFactory = await ethers.getContractFactory('vIDIA')

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
      owner.address,
      VestToken.address
    )
  })


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
  })

  it('sets penalty of a token', async function () {

    const penalty = 10

    await vIDIA.updateSkipUnstakeDelayFee(penalty)

    const value = (await vIDIA.skipUnstakeDelayFee()).toNumber()
    expect(value).to.eq(10)
  })

  it('cannot set penalty of a token', async function () {
    const penalty = 10

    await expect
    (vIDIA.connect(vester).updateSkipUnstakeDelayFee(penalty)
    ).to.be.revertedWith('Must have fee setter role')

  })

  it('sets delay of a token', async function () {
 
    const delay = 10

    await vIDIA.updateUnvestingDelay(delay)
    const value = (await vIDIA.unstakingDelay()).toNumber()
    expect(value).to.eq(10)
  })

  it('deploys and cannot set delay of a token, thus still 0', async function () {

    const delay = 10

    await expect
    (vIDIA.connect(vester).updateUnvestingDelay(delay)
    ).to.be.revertedWith('Must have delay setter role')
  })

  it('deploys and stakes tokens', async function () {
    const transferAmt = 10000000
    await VestToken.transfer(vester.address, transferAmt) 
    await VestToken.connect(vester).approve(vIDIA.address, ethers.constants.MaxUint256)
    const firstStakeAmt = 100
    const secondStakeAmt = 250
    await vIDIA.connect(vester).stake(firstStakeAmt)
    let totalStaked = (await vIDIA.totalStakedAmount()).toNumber()
    expect(totalStaked).to.eq(firstStakeAmt)

    await vIDIA.connect(vester).stake(secondStakeAmt)
    totalStaked = (await vIDIA.totalStakedAmount()).toNumber()
    expect(totalStaked).to.eq(firstStakeAmt + secondStakeAmt)
  })

  it('stakes and unstakes tokens', async function () {
    const transferAmt = 10000000
    await VestToken.transfer(vester.address, transferAmt) 
    await VestToken.connect(vester).approve(vIDIA.address, ethers.constants.MaxUint256)
    const firstStakeAmt = 100
    const secondStakeAmt = 250
    await vIDIA.connect(vester).stake(firstStakeAmt)
    let totalStaked = (await vIDIA.totalStakedAmount()).toNumber()
    expect(totalStaked).to.eq(firstStakeAmt)

    await vIDIA.connect(vester).stake(secondStakeAmt)
    totalStaked = (await vIDIA.totalStakedAmount()).toNumber()
    expect(totalStaked).to.eq(firstStakeAmt + secondStakeAmt)
    await vIDIA.connect(vester).unstake(secondStakeAmt)
    const userData = (await vIDIA.userInfo(vester.address))
    expect(userData.unstakedAmount).to.eq(secondStakeAmt)
    const unstakeTime = (await getBlockTime()) + (await vIDIA.unstakingDelay()).toNumber()
    expect(userData.unstakeAt).to.eq(unstakeTime)
    await expect
    (vIDIA.connect(vester).unstake(firstStakeAmt)
    ).to.be.revertedWith('User already has pending tokens unstaking')


  })

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

  it('test claimstaked', async () => {
    const TestTokenFactory = await ethers.getContractFactory('GenericToken')
    const underlying = await TestTokenFactory.connect(owner).deploy(
      'Test',
      'TT',
      convToBN(200)
    )
    const vidiaFactory = await ethers.getContractFactory('vIDIA')
    const vidia = await vidiaFactory.deploy(
      'Vested IDIA',
      'VIDIA',
      owner.address,
      underlying.address
    )

    await underlying.approve(vidia.address, MaxUint256)
    await vidia.stake(convToBN(200))

    const testCases = [convToBN(1), convToBN(12), convToBN(0), convToBN(123)]

    let userPrevVidiaBalance = await vidia.balanceOf(owner.address)
    let userPrevUnderlying = await underlying.balanceOf(owner.address)
    let contractPrevUnderlying = await underlying.balanceOf(vidia.address)
    let prevFee = await vidia.accumulatedFee()


    const feePercentBasisPts = await vidia.skipUnstakeDelayFee()

    for (let i = 0; i < testCases.length; i++) {
      
      const fee = feePercentBasisPts.mul(testCases[i]).div(ethers.BigNumber.from('10000')) // 10000 basis pts = 100%
      const receiveAmt = testCases[i].sub(fee)

      const reward = await vidia.calculateUserReward()

      expect(await vidia.claimStaked(testCases[i]))
        .to.emit(vidia, 'ClaimStaked')
        .withArgs(owner.address, fee, receiveAmt)
        .to.emit(underlying, 'Transfer')
        .withArgs(vidia.address, owner.address, receiveAmt)

      expect(await vidia.balanceOf(owner.address)).to.equal(userPrevVidiaBalance.sub(testCases[i]))
      expect(await underlying.balanceOf(owner.address)).to.equal(userPrevUnderlying.add(receiveAmt).add(reward))
      expect(await vidia.accumulatedFee()).to.equal(prevFee.add(fee))
      expect(await underlying.balanceOf(vidia.address)).to.equal(contractPrevUnderlying.sub(receiveAmt).sub(reward))

      userPrevVidiaBalance = userPrevVidiaBalance.sub(testCases[i])
      userPrevUnderlying = userPrevUnderlying.add(receiveAmt).add(reward)
      contractPrevUnderlying = contractPrevUnderlying.sub(receiveAmt).sub(reward)
      prevFee = prevFee.add(fee)
    }
  })
})
