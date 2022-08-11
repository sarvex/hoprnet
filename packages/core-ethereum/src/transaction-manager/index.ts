import { type Address, PublicKey } from '@hoprnet/hopr-utils'
import NonceTracker from '../nonce-tracker.js'
import { Transaction, TransactionPayload, NonceTypeAtTransactionCreation, PriorityConfiguration } from './types.js'
import type { Provider } from '@ethersproject/abstract-provider'
import { UnsignedTransaction, utils } from 'ethers'
import { CoreEthereumDB } from '../db/index.js'

class TransactionManager {
  private fromAddress: Address
  private chainId: number

  constructor(
    private db: CoreEthereumDB,
    private provider: Provider,
    private privateKey: Uint8Array,
    private nonceTracker: NonceTracker
  ) {
    // node address
    this.fromAddress = PublicKey.fromPrivKey(this.privateKey).toAddress()
    this.chainId = (await this.provider.getNetwork()).chainId
  }

  // transaction manager receives TransactionPayload from ethereum.ts, when node runner performs an action
  // e.g. as the last step of `announce()`
  private async buildTransaction(
    _payload: TransactionPayload,
    _nonce: NonceTypeAtTransactionCreation
  ): Promise<Omit<Transaction, 'status' | 'broadcastedAt'>> {
    // gets the latest nonce.
    const nonce =
      typeof _nonce === 'number' ? _nonce : (await this.nonceTracker.getNonceLock(this.fromAddress)).nextNonce
    // get network priority configuration
    // TODO: move this part to a seperate class that can be written/read directly to/from db, which the lastUpdated timestamp, to reduce RPC calls. With default values saved in the DB
    const feeData = await this.provider.getFeeData()
    const priorityConfig: PriorityConfiguration = {
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      maxFeePerGas: feeData.maxFeePerGas
    }
    // populate transaction
    const populatedTx: UnsignedTransaction = {
      ..._payload,
      ...priorityConfig,
      type: 2,
      nonce,
      chainId: this.chainId
    }

    // 3. sign transaction
    const signingKey = new utils.SigningKey(this.privateKey)
    const signature = signingKey.signDigest(utils.keccak256(utils.serializeTransaction(populatedTx)))
    const signedTx = utils.serializeTransaction(populatedTx, signature)

    // compute tx hash and save to initiated tx list in tx manager
    const initiatedHash = utils.keccak256(signedTx)
    return {
      ..._payload,
      ...priorityConfig,
      hash: initiatedHash,
      nonce,
      signature,
      createdAt: Date.now()
    }
  }
}

export default TransactionManager
