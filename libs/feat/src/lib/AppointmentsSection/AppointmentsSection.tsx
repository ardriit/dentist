'use client'
import { useState } from 'react'
// import { UpcomingAppoinment } from '../UpcomingAppoinment';
import styles from './AppointmentsSection.module.scss'
import { Container } from '@dental-pro/ui'
import { FilterByDoctor } from '../FilterByDoctor'
import { MyTable } from '@dental-pro/ui'
import { useTranslation } from '@dental-pro/i18n'

export const AppointmentsSection = () => {
  const { t } = useTranslation()

  const appointmentsFields = [
    'id',
    'patient',
    'doctor',
    'type',
    'date',
    'time',
    'duration',
  ]
  const mockAppointments = [
    {
      id: 1,
      patient: { id: 1, name: 'John Doe' },
      doctor: { id: 1, name: 'Mick Doe' },
      type: 'Routine Checkup',
      date: '2025-03-01',
      time: '09:00',
      duration: 30,
    },
    {
      id: 2,
      patient: { id: 2, name: 'Jane Doe' },
      doctor: { id: 1, name: 'Mick Doe' },
      type: 'Tooth Extraction',
      date: '2025-03-01',
      time: '10:00',
      duration: 60,
    },
    {
      id: 3,
      patient: { id: 3, name: 'Alice Doe' },
      doctor: { id: 2, name: 'John Doe' },
      type: 'Teeth Whitening',
      date: '2025-03-01',
      time: '11:00',
      duration: 45,
    },
    {
      id: 4,
      patient: { id: 4, name: 'Bob Doe' },
      doctor: { id: 3, name: 'This One' },
      type: 'Test',
      date: '2025-03-01',
      time: '12:00',
      duration: 90,
    },
    {
      id: 5,
      patient: { id: 4, name: 'Bob Doe' },
      doctor: { id: 4, name: 'Only One' },
      type: 'Test',
      date: '2025-03-19',
      time: '12:00',
      duration: 90,
    },
    {
      id: 6,
      patient: { id: 4, name: 'Bob Doe' },
      doctor: { id: 5, name: 'New Doctor' },
      type: 'Test',
      date: '2025-03-21',
      time: '12:00',
      duration: 90,
    },
  ]

  const doctors = Array.from(
    new Map(
      mockAppointments.map((appointment) => [
        appointment.doctor.id,
        appointment.doctor,
      ])
    ).values()
  )

  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null) // default need to be logged in user

  const filteredAppointments = selectedDoctor
    ? mockAppointments.filter((appt) => appt.doctor.id === selectedDoctor)
    : mockAppointments

  return (
    <Container>
      <div className={styles.filterSection}>
        <div>{t('upcoming.appointments.section.title')}</div>
        <FilterByDoctor
          doctors={doctors}
          onSelect={(doctor) => setSelectedDoctor(doctor.id)}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
        />
      </div>

      <div className={styles.appointmentsSection}>
        <MyTable
          tableData={filteredAppointments.map((appointment) => ({
            ...appointment,
            patient: appointment.patient.name,
            doctor: appointment.doctor.name,
          }))}
          tableHead={appointmentsFields}
        />
        {/* {filteredAppointments.map((appointment) => (
          <UpcomingAppoinment
            key={appointment.id}
            date={appointment.date}
            type={appointment.type}
            doctor={appointment.doctor.name}
            time={appointment.time}
            duration={appointment.duration}
          />
        ))} */}
      </div>
    </Container>
  )
}
