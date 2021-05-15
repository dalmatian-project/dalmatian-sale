import { useCallback, useContext, useMemo, useState, createContext } from 'react'

const AccountModuleContext = createContext(null)

const AccountModuleProvider = ({ children }) => {
  const [accountVisible, setAccountVisible] = useState(false)

  const showAccount = useCallback(() => setAccountVisible(true), [])
  const hideAccount = useCallback(() => setAccountVisible(false), [])

  const contextValue = useMemo(() => ({
    accountVisible,
    showAccount,
    hideAccount
  }), [accountVisible, showAccount, hideAccount])

  return (
    <AccountModuleContext.Provider value={contextValue}>
      {children}
    </AccountModuleContext.Provider>
  )
}

const useAccountModule = () => {
  return useContext(AccountModuleContext)
}

export { useAccountModule, AccountModuleProvider }