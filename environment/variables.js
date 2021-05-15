export const ENV_VARS = {
  NETWORK_ENVIRONMENT() {
    return (
      process.env.NEXT_PUBLIC_ENV === 'development' ? 'ropsten' : 'ethereum'
    )
  },
  IPFS_GATEWAY() {
    return process.env.NEXT_APP_IPFS_GATEWAY || ''
  },
  FORTMATIC_API_KEY() {
    return process.env.NEXT_APP_FORTMATIC_API_KEY || ''
  },
  PORTIS_DAPP_ID() {
    return process.env.NEXT_APP_PORTIS_DAPP_ID || ''
  },
  SENTRY_DSN() {
    const dsn = process.env.NEXT_APP_SENTRY_DSN || ''
    return dsn.trim()
  },
}