import { BigNumber, Signature } from 'ethers'

export type TransactionPayload = {
  to: string
  data: string
  value: BigNumber
  gasLimit: BigNumber
}

export type PriorityConfiguration = {
  maxPriorityFeePerGas: BigNumber
  maxFeePerGas: BigNumber
}

export enum StatusTransacitons {
  QUEUING,
  PENDING,
  FINALIZED,
  REPLACED
}

export type Transaction = TransactionPayload &
  PriorityConfiguration & {
    hash: string
    nonce: number
    signature: Signature
    createdAt: number
    broadcastedAt: number
    status: StatusTransacitons
  }

export type NonceTypeAtTransactionCreation = number | 'latest'
