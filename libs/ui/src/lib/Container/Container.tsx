'use client'

import { Button, Card } from '@mantine/core'
import styles from './Container.module.scss'
import type { CSSProperties, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  style?: CSSProperties
  header?: string
  button?: string
}

export const Container = ({
  children,
  style,
  header,
  button,
}: ContainerProps) => {
  return (
    <Card shadow="lg" radius="md" className={styles.card} style={style}>
      <div className={styles.headerContainer}>
        {header && <h1 className={styles.header}>{header}</h1>}
        {button && <Button className={styles.button}>{button}</Button>}
      </div>
      {children}
    </Card>
  )
}
