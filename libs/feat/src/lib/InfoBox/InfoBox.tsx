import styles from './InfoBox.module.scss'
import Link from 'next/link'
import { RightArrowIcon } from '@dental-pro/ui/icons'

interface InfoBoxProps {
  title: string
  icon: React.ReactNode
  description: string
  href: string
  color: string
}

export const InfoBox = ({
  title,
  icon,
  description,
  href,
  color,
}: InfoBoxProps) => {
  return (
    <div className={styles.infoBox}>
      <div className={styles.infoIcon} style={{ backgroundColor: color }}>
        {icon}
      </div>

      <div className={styles.infoBoxHeader}>
        <div className={styles.infoBoxMoney}>{title}.00$</div>
        <div className={styles.infoBoxDescription}>{description}</div>
      </div>
      <div className={styles.infoContent}>
        <Link href={href} className={styles.infoBoxButton}>
          <RightArrowIcon />
        </Link>
      </div>
    </div>
  )
}
