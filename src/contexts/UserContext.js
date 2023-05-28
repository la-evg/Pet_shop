import React, { useContext } from 'react'
import { useUser } from '../customHooks/useUser'

export const UserContext = React.createContext()

export function UserContextProvider({ children }) {
  const userData = useUser()

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)
