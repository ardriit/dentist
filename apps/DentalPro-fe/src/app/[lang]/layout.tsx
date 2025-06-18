import '@mantine/core/styles.css'
import { LanguageProvider } from '@dental-pro/i18n'
import { getTranslations } from '@dental-pro/i18n/server'
import { LayoutSidebar, Header } from '@dental-pro/feat'
import styles from './layout.module.scss'
import '../../globals.scss'
import { UserProvider } from '@dental-pro/hooks'
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from '@mantine/core'
import { Barriere } from '@dental-pro/feat/server'
import { apiClient, type Login } from '@dental-pro/utils'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Dental Pro',
  description: 'No description for now :)',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: 'en' | 'sq' }
}) {
  const cookieStore = cookies()
  const cookieString = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ')

  const t = await getTranslations(params.lang)
  const me = (await apiClient<Login>('/me', 'GET', undefined, {
    cookie: cookieString,
  })) as Login

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <LanguageProvider translations={t}>
            <UserProvider>
              <Barriere me={me?.user}>
                <div className={styles['layoutContainer']}>
                  <LayoutSidebar />
                  <div className={styles['mainContent']}>
                    <Header />
                    {children}
                  </div>
                </div>
              </Barriere>
            </UserProvider>
          </LanguageProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
