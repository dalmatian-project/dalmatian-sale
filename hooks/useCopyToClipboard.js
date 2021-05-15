import { useCallback } from 'react'
import { writeText as copy } from 'clipboard-polyfill'
import { toast } from 'react-toastify'

const useCopyToClipboard = (text, confirmationMessage) => {
  return useCallback((text, confirmationMessage = 'copied') => {
    copy(text)
    if (confirmationMessage) {
      toast(confirmationMessage)
    }
  }, [toast])
}

export default useCopyToClipboard