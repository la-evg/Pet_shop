/* eslint-disable no-irregular-whitespace */
import { useState } from 'react'

export const useUser = () => {
  const [user, setUser] = useState({})
  console.log('useUser render')

  return {
    user,
    setUser,
  }
}
