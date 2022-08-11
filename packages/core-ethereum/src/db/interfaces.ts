import { PriorityConfiguration, Transaction, TransactionPayload } from '../transaction-manager/types.js'
import { TransactionHash } from './types.js'

/**
 * Interface of CoreEthereumDB
 */
export interface ICoreEthereumDB {
  // add a queuing tx into the db and returns the queuing index
  addQueuingTransaction(txPayload: TransactionPayload): number
  // return the size of the queuing transactions
  getQueuingTransactionsSize(): number
  // get the queuing transaction at index
  getQueuingTransactionAtIndex(index: number): TransactionPayload
  // pop the first queuing transaction
  popFirstQueuingTransaction(): TransactionPayload

  // add a boardcasted transaction. This transaction should be defautl to pending
  addBoardcastedTransaction(transaction: Transaction): void
  // return a transaction by its hash
  getBoardcastedTransactionByHash(hash: TransactionHash): Transaction
  // remove a transaction by its hash
  removeBoardcastedTransactionByHash(hash: TransactionHash): void
  // overwrite a transaction's network priority condition. It removes the old hash and add a new hash entry. Update the hash associated with the nonce
  updateTransactionPriorityConfig(prevHash: TransactionHash, priorityConfig: PriorityConfiguration): void
}
