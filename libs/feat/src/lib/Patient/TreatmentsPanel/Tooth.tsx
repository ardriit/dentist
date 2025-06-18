import { useState } from 'react'
import { ClickableZone } from './ClickableZone'
import { teeths } from '../helpers/Teeths'
import styles from './Tooth.module.scss'
import type { Position } from './types'

export const Tooth = () => {
  const [selectedTeeth, setSelectedTeeth] = useState(teeths)

  const handleClick = (position: Position, number: number) => {
    setSelectedTeeth((prevSelectedTeeth) => {
      const toothIndex = prevSelectedTeeth.findIndex(
        (tooth) => tooth.number === number
      )
      if (toothIndex !== -1) {
        const updatedTeeth = [...prevSelectedTeeth]
        updatedTeeth[toothIndex] = {
          ...updatedTeeth[toothIndex],
          [position]: !updatedTeeth[toothIndex][position],
        }
        return updatedTeeth
      } else {
        return [
          ...prevSelectedTeeth,
          {
            number,
            top: false,
            left: false,
            center: false,
            right: false,
            bottom: false,
            [position]: true,
          },
        ]
      }
    })
  }

  const isSelected = (number: number, position: Position) => {
    const tooth = selectedTeeth.find((tooth) => tooth.number === number)
    return tooth ? tooth[position] : false
  }

  return (
    <div className={styles.backgroundImage}>
      <div className={styles.teethsContainer}>
        <div className={styles.firstRow}>
          {selectedTeeth.slice(0, 16).map((teeth) => (
            <ClickableZone
              key={teeth.number}
              toothNumber={teeth.number}
              handleClick={handleClick}
              selectedTop={isSelected(teeth.number, 'top')}
              selectedLeft={isSelected(teeth.number, 'left')}
              selectedCenter={isSelected(teeth.number, 'center')}
              selectedRight={isSelected(teeth.number, 'right')}
              selectedBottom={isSelected(teeth.number, 'bottom')}
            />
          ))}
        </div>
        <div className={styles.secondRow}>
          {teeths.slice(16).map((teeth) => (
            <ClickableZone
              key={teeth.number}
              toothNumber={teeth.number}
              handleClick={handleClick}
              selectedTop={isSelected(teeth.number, 'top')}
              selectedLeft={isSelected(teeth.number, 'left')}
              selectedCenter={isSelected(teeth.number, 'center')}
              selectedRight={isSelected(teeth.number, 'right')}
              selectedBottom={isSelected(teeth.number, 'bottom')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tooth
