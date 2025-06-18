import { InfoBox } from '../InfoBox'
import styles from './InfoSection.module.scss'
import {
  EuroCurrencyIcon,
  CreditCardIcon,
  DailyReportIcon,
  CoinsIcon,
} from '@dental-pro/ui/icons'
import { useTranslation } from '@dental-pro/i18n'

// interface InfoSectionProps {
//   infoBoxMocks: {
//     title: string;
//     icon: any;
//     description: string;
//   }[];
// }

export const InfoSection = () => {
  const { t } = useTranslation()
  const infoBoxMocks = [
    {
      title: '100',
      icon: <DailyReportIcon />,
      description: t('infoBox.dailyReport'),
      href: '/raporti-ditor',
      color: 'var(--mantine-color-green-8)',
    },
    {
      title: '50',
      icon: <CreditCardIcon />,
      description: t('infoBox.payments'),
      href: '/payments',
      color: 'var(--mantine-color-blue-8)',
    },
    {
      title: '20',
      icon: <CoinsIcon />,
      description: t('infoBox.debt'),
      href: '/borgjet',
      color: 'var(--mantine-color-red-8)',
    },
    {
      title: '30',
      icon: <EuroCurrencyIcon />,
      description: t('infoBox.expenses'),
      href: '/shpenzimet',
      color: 'var(--mantine-color-orange-8)',
    },
  ]

  return (
    <div className={styles.infoContent}>
      {infoBoxMocks.map((infoBox) => (
        <InfoBox
          key={infoBox.description}
          title={infoBox.title}
          icon={infoBox.icon}
          description={infoBox.description}
          href={infoBox.href}
          color={infoBox.color}
        />
      ))}
    </div>
  )
}
