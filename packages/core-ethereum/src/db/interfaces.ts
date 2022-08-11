import { PriorityConfiguration, StatusTransacitons, Transaction, TransactionPayload } from "../transaction-manager/types.js";
import { TransactionHash } from "./types.js";

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

    
    /**
     * add a boardcasted transaction. This transaction should be defautl to pending
     * 
     * Note that this function is also called when updating a transaction's network priority condition 
     * - a new entry in the Boardcasted transaction queue should be created. The old hash entry is not removed.
     * Add the new hash associated with the nonce
     * @param transaction 
     */
    addBoardcastedTransaction(transaction: Transaction): void
    
    /**
     * dedicated function for updating the priority config. See required actions
     * in the `addBoardcastedTransaction` function.
     */
    updateTransactionPriorityConfig(prevHash: TransactionHash, priorityConfig: PriorityConfiguration): void
    
    // return a transaction by its hash
    getBoardcastedTransactionByHash(hash: TransactionHash): Transaction
    /*
     * udpate a transaction by its hash. When multiple hashes are associated with one nonce. Only one
     * transaction can be `FINALIZED` and all the rest should be `REPLACED`
     * @param hash of the  transaction
     * @param newStatus new status
     */
    updateBoardcastedTransactionStatusByHash(hash: TransactionHash, newStatus: StatusTransacitons): void

    /**
     * return an array of transactions based on the given transaction status
     */
     getBoardcastedTransactionsByStatus(status: StatusTransacitons): Array<Transaction>
}