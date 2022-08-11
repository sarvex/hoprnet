import { Transaction, TransactionPayload } from '../transaction-manager/types.js'

// export type ActionsQueue {
// }

export type TransactionHash = string

// FIFO queue
export type QueuingTransactionsQueue = Array<TransactionPayload>

/**
 * Store treansactions in a key value pair where the transaction
 * hash is the key
 * It contains pending transactions and confirmed transactions
 */
export type BoardcastedTransactions = {
  [hash: TransactionHash]: Transaction
}

/**
 * Store transactions in a queue, indexed by its nonce
 * It is possibe to associate two pending transactions with one nonce
 */
export type BoardcastedTransactionsQueue = {
  minNonce: string
  [nonce: number]: Array<TransactionHash>
}
