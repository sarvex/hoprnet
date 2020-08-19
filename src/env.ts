import dotenv from 'dotenv'
import dotenvParse from 'dotenv-parse-variables'

let parsed: {
  API_URL: string
  BOT_NAME: string
  TWITTER_API_KEY: string
  TWITTER_API_SECRET: string
  TWITTER_API_ACCESS_TOKEN: string
  TWITTER_API_ACCESS_TOKEN_SECRET: string
  INFURA_PROJECT_ID: string
  LINKDROP_PRIVATE_KEY: string
  LINKDROP_ACCOUNT_ADDRESS: string
  LINKDROP_CHAIN: string
  LINKDROP_CAMPAIGN_ID: number
  LINKDROP_CAMPAIGN_AMOUNT_PER_LINK_IN_WEI: string
} = {
  API_URL: '127.0.0.1:50051',
  BOT_NAME: 'randobot',
  TWITTER_API_KEY: '',
  TWITTER_API_SECRET: '',
  TWITTER_API_ACCESS_TOKEN: '',
  TWITTER_API_ACCESS_TOKEN_SECRET: '',
  INFURA_PROJECT_ID: '',
  LINKDROP_PRIVATE_KEY: '',
  LINKDROP_ACCOUNT_ADDRESS: '',
  LINKDROP_CHAIN: 'mainnet',
  LINKDROP_CAMPAIGN_ID: 1,
  LINKDROP_CAMPAIGN_AMOUNT_PER_LINK_IN_WEI: '1000000000000000000'
}

try {
  const result = dotenv.config()
  if (!result.error) {
    for (const k in result.parsed) {
      process.env[k] = result.parsed[k]
    }
  }
} catch {}

parsed = {
  ...parsed,
  ...(dotenvParse(process.env) as typeof parsed),
}

export const API_URL = parsed.API_URL
export const BOT_NAME = parsed.BOT_NAME
export const TWITTER_API_KEY = parsed.TWITTER_API_KEY
export const TWITTER_API_SECRET = parsed.TWITTER_API_SECRET
export const TWITTER_API_ACCESS_TOKEN = parsed.TWITTER_API_ACCESS_TOKEN
export const TWITTER_API_ACCESS_TOKEN_SECRET = parsed.TWITTER_API_ACCESS_TOKEN_SECRET
export const INFURA_PROJECT_ID = parsed.INFURA_PROJECT_ID
export const LINKDROP_PRIVATE_KEY = parsed.LINKDROP_PRIVATE_KEY
export const LINKDROP_ACCOUNT_ADDRESS = parsed.LINKDROP_ACCOUNT_ADDRESS
export const LINKDROP_CHAIN = parsed.LINKDROP_CHAIN
export const LINKDROP_CAMPAIGN_ID = parsed.LINKDROP_CAMPAIGN_ID
export const LINKDROP_CAMPAIGN_AMOUNT_PER_LINK_IN_WEI = parsed.LINKDROP_CAMPAIGN_AMOUNT_PER_LINK_IN_WEI
