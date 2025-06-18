'use client'

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
} from '@mantine/core'
import styles from './LoginForm.module.scss'
import { Button } from '@mantine/core'
import { useTranslation } from '@dental-pro/i18n'
import { useRouter } from 'next/navigation'
import { useUser } from '@dental-pro/hooks'
import { useState } from 'react'
import { apiClient, type Login } from '@dental-pro/utils'

export const LoginForm = () => {
  const { t } = useTranslation()
  const { login } = useUser()

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const callLogin = (await apiClient<Login>('/login', 'POST', {
      email,
      password,
    })) as Login
    if (callLogin.success === true) {
      login(callLogin.user)
    }
  }

  return (
    <div className={styles.container}>
      <Container size={600} my={40}>
        {/* @ts-expect-error: Title component does not support 'mb' prop but it is required for styling */}
        <Title align="center" className={styles.title} order={1} mb="md">
          {t('welcome')}
        </Title>
        <Paper withBorder shadow="md" p={50} mt={0} radius="md">
          <form onSubmit={handleLogin}>
            <TextInput
              size="lg"
              label="Email"
              placeholder="you@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              size="lg"
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button fullWidth mt="xl" size="lg" type="submit">
              Login
            </Button>

            <Button
              fullWidth
              variant="transparent"
              mt="md"
              size="lg"
              onClick={() => {
                router.push('/signup')
              }}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )
}
