import { Fragment } from 'react'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

import { WalletProvider } from '../providers/Wallet'
import { AccountModuleProvider } from '../providers/Account'
import '../styles/styles.scss'

const MyApp = props => {
  const { Component, pageProps } = props

  return (
    <Fragment>
      <Head>
        <title>101 Dalmatian</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <WalletProvider>
        <AccountModuleProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </AccountModuleProvider>
      </WalletProvider>
    </Fragment>
  )
}

export default MyApp
