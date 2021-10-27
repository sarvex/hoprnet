import { join } from 'path'

export * from './constants'
export * from './types'
export type { TypedEventFilter, TypedEvent } from './types/common'

export type ContractNames = 'HoprToken' | 'HoprChannels' | 'HoprDistributor'

export type ContractData = {
  address: string
  transactionHash: string
  abi: any
}

export const getContractData = (environmentId: string, contract: ContractNames): ContractData => {
  // hack: required for E2E tests to pass
  // when a contract changes we redeploy it, this causes the deployments folder to change
  // unlike normal the release workflow, when running the E2E tests, we build the project
  // and then run deployments, which may update the deployment folder
  // this makes sure to always pick the deployment folder with the updated data
  const deploymentsPath = __dirname.endsWith('lib')
    ? join(__dirname, '..', 'deployments')
    : join(__dirname, 'deployments')

  try {
    return require(join(deploymentsPath, environmentId, `${contract}.json`))
  } catch {
    throw Error(`contract data for ${contract} from environment ${environmentId} not found`)
  }
}
