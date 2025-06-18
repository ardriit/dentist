'use client'

import { createContext, useState, useContext, type ReactNode } from 'react'
import { type LoginUser } from '@dental-pro/utils'

interface UserContextType {
  user: LoginUser | null
  login: (userData: LoginUser) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<LoginUser | null>(null)

  const login = (userData: LoginUser) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
