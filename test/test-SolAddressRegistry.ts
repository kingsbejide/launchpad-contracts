import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'
import { mineNext } from './helpers'
import { expect } from 'chai'

export default describe('SolAddressRegistry', function () {
  // unset timeout from the test
  this.timeout(0)

  it('Registers addresses', async function () {
    // get test accounts
    const user1 = (await ethers.getSigners())[0]
    const user2 = (await ethers.getSigners())[1]

    // deploy
    const SolAddressRegistryFactory = await ethers.getContractFactory(
      'SolAddressRegistry'
    )
    const SolAddressRegistry = await SolAddressRegistryFactory.deploy()

    // test

    const solAddr1 = 'HfeFy4G9r77iyeXdbfNJjYw4z3NPEKDL6YQh3JzJ9s9f'
    const solAddr2 = 'EcV1X1gY2yb4KXxjVQtTHTbioum2gvmPnFk4zYAt7zne'

    mineNext()

    // register couple addresses
    await SolAddressRegistry.connect(user1).registerSolAddress(solAddr1)
    await SolAddressRegistry.connect(user2).registerSolAddress(solAddr2)

    mineNext()

    // check addresses
    expect(await SolAddressRegistry.addresses(0)).to.equal(user1.address)
    expect(await SolAddressRegistry.addresses(1)).to.equal(user2.address)

    // check registry
    const regEntry1 = await SolAddressRegistry.registry(user1.address)
    const regEntry2 = await SolAddressRegistry.registry(user2.address)
    expect(regEntry1.evmAddr).to.equal(user1.address)
    expect(regEntry1.solAddr).to.equal(solAddr1)
    expect(regEntry2.evmAddr).to.equal(user2.address)
    expect(regEntry2.solAddr).to.equal(solAddr2)

    // address count
    expect(await SolAddressRegistry.addrCount()).to.equal(2)

    // attempt reregister
    await SolAddressRegistry.connect(user1).registerSolAddress('foo')

    mineNext()

    // check output of reregister
    const regEntry1Again = await SolAddressRegistry.registry(user1.address)
    expect(regEntry1Again.evmAddr).to.equal(user1.address)
    expect(regEntry1Again.solAddr).to.equal('foo')

    // address count should be unchanged
    expect(await SolAddressRegistry.addrCount()).to.equal(2)
  })
})
