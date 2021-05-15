const Backdrop = props => {
  const { open, children } = props

  return (
    <div className={open ? 'backdrop open' : 'backdrop'}>
      {children}
    </div>
  )
}

export default Backdrop