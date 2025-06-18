'use client'

import styles from './LayoutSidebar.module.scss'
import { useTranslation } from '@dental-pro/i18n'
import Link from 'next/link'
import className from 'classnames'
import {
  HomeIcon,
  CalendarIcon,
  InvoiceIcon,
  CreditCardIcon,
  EuroCurrencyIcon,
  DatabaseIcon,
  ChartIcon,
  TeamIcon,
  ArrowsShuffleIcon,
  SettingsStarIcon,
  InfoSmallIcon,
  CalendarCheck,
  DentalProLogo,
} from '@dental-pro/ui/icons'
import { usePathname } from 'next/navigation'

export const LayoutSidebar = () => {
  const { t } = useTranslation()
  const pathname = usePathname()

  const tabItems = [
    { title: t('layoutSidebar.home'), href: '/en', icon: <HomeIcon /> },
    {
      title: t('layoutSidebar.patients'),
      href: '/patients',
      icon: <TeamIcon />,
    },
    { title: t('layoutSidebar.calendar'), href: '/', icon: <CalendarIcon /> },
    {
      title: t('layoutSidebar.appointments'),
      href: '/appointments',
      icon: <CalendarCheck />,
    },
    {
      title: t('layoutSidebar.invoices'),
      href: '/invoices',
      icon: <InvoiceIcon />,
    },
    {
      title: t('layoutSidebar.payments'),
      href: '/payments',
      icon: <CreditCardIcon />,
    },
    {
      title: t('layoutSidebar.expences'),
      href: '/',
      icon: <EuroCurrencyIcon />,
    },
    { title: t('layoutSidebar.Storehouse'), href: '/', icon: <DatabaseIcon /> },
    {
      title: t('layoutSidebar.daily report'),
      href: '/reports',
      icon: <ChartIcon />,
    },
    {
      title: t('layoutSidebar.activities'),
      href: '/',
      icon: <ArrowsShuffleIcon />,
    },
    {
      title: t('layoutSidebar.management'),
      href: '/',
      icon: <SettingsStarIcon />,
    },
    {
      title: t('layoutSidebar.manual'),
      href: '/',
      icon: <InfoSmallIcon />,
    },
  ]

  return (
    <div className={styles['sidebarContainer']}>
      <DentalProLogo />

      {tabItems.map(({ href, title, icon }) => {
        return (
          <div
            className={className(styles['navItem'], {
              [styles['activeNavItem']]: href === pathname,
            })}
            key={title}
          >
            {icon}
            <Link href={href} className={styles['title']}>
              {title}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
