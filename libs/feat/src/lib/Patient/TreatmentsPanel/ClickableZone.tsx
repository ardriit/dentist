import classNames from 'classnames'
import styles from './ClickableZone.module.scss'
import type { Position } from './types'

export const ClickableZone = ({
  toothNumber,
  handleClick,
  selectedTop,
  selectedLeft,
  selectedCenter,
  selectedRight,
  selectedBottom,
}: {
  toothNumber: number
  handleClick: (position: Position, toothNumber: number) => void
  selectedTop: boolean
  selectedLeft: boolean
  selectedCenter: boolean
  selectedRight: boolean
  selectedBottom: boolean
}) => {
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.zone, styles.top, {
          [styles.selected]: selectedTop,
        })}
        onClick={() => handleClick('top', toothNumber)}
      ></div>
      <div
        className={classNames(styles.zone, styles.left, {
          [styles.selected]: selectedLeft,
        })}
        onClick={() => handleClick('left', toothNumber)}
      ></div>
      <div
        className={classNames(styles.zone, styles.center, {
          [styles.selected]: selectedCenter,
        })}
        onClick={() => handleClick('center', toothNumber)}
      ></div>
      <div
        className={classNames(styles.zone, styles.right, {
          [styles.selected]: selectedRight,
        })}
        onClick={() => handleClick('right', toothNumber)}
      ></div>
      <div
        className={classNames(styles.zone, styles.bottom, {
          [styles.selected]: selectedBottom,
        })}
        onClick={() => handleClick('bottom', toothNumber)}
      ></div>
    </div>
  )
}
