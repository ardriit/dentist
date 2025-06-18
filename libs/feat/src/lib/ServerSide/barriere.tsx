'use client'

import { LoginForm } from '../Login'
import { SignupPage } from '../Signup'
import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { useBoolean, useUser } from '@dental-pro/hooks'
import { type LoginUser } from '@dental-pro/utils'
import { MyLoader } from '@dental-pro/ui'

interface BarriereProps {
  children: ReactNode
  me?: LoginUser
}

export const Barriere = ({ children, me }: BarriereProps) => {
  const { value: queryLoading, setFalse: loaded } = useBoolean(true)
  const pathname = usePathname()
  const { user, login } = useUser()
  useEffect(() => {
    if (me) {
      login(me)
    }
    loaded()
  }, [])

  if (queryLoading) {
    return <MyLoader />
  }
  if (!user?.id && !pathname.endsWith('/signup')) return <LoginForm />
  if (pathname.endsWith('/signup')) return <SignupPage />
  else return children
}
