'use client'
import styles from './FilterByDoctor.module.scss'
import { Tooltip } from '@mantine/core'

interface Doctor {
  id: number
  name: string
  avatarUrl?: string
}

interface FilterByDoctorProps {
  doctors: Doctor[]
  onSelect: (doctor: Doctor) => void
  selectedDoctor: number | null
  setSelectedDoctor: (doctor: number | null) => void
}

export const FilterByDoctor: React.FC<FilterByDoctorProps> = ({
  doctors,
  onSelect,
  selectedDoctor,
  setSelectedDoctor,
}) => {
  const handleSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor.id)
    if (selectedDoctor === doctor.id) {
      setSelectedDoctor(null)
    } else {
      setSelectedDoctor(doctor.id)
      onSelect(doctor)
    }
  }

  return (
    <div className={styles.doctorsContainer}>
      {doctors.slice(0, 4).map((doctor) => (
        <Tooltip label={doctor.name} key={doctor.id}>
          <div
            key={doctor.id}
            onClick={() => handleSelect(doctor)}
            className={`${styles.doctorAvatar} ${
              selectedDoctor === doctor.id ? styles.selected : ''
            }`}
          >
            {doctor.avatarUrl ? (
              <img
                src={doctor.avatarUrl}
                alt={doctor.name}
                className={styles.doctorImage}
              />
            ) : (
              doctor.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
            )}
          </div>
        </Tooltip>
      ))}
      {doctors.length > 4 && (
        <div className={styles.moreBadge}>+{doctors.length - 4}</div>
      )}
    </div>
  )
}
