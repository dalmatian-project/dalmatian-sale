import { ENV_VARS } from './variables'
import { getNetworkConfig } from './network'

export const envVar = name => {
  const envVar = ENV_VARS[name]
  return envVar()
}

const getNetworkEnvironment = name => {
  const preset = getNetworkConfig(name)

  return {
    ...preset
  }
}

export const getEnvNetworkType = () => {
  return process.env.NEXT_PUBLIC_ENV === 'development' ? 'ropsten' : 'ethereum'
}

export const networkEnvironment = getNetworkEnvironment(getEnvNetworkType())