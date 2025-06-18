'use client'
import styles from './AppointmentsPage.module.scss'
import { useState } from 'react'
// import { useRouter } from 'next/navigation';
import { Container, MyTable } from '@dental-pro/ui'
import { FilterByDoctor } from '../FilterByDoctor'
import { useTranslation } from '@dental-pro/i18n'

export const AppointmentsPage = () => {
  // const router = useRouter();
  const { t } = useTranslation()
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const appointmentsFields = [
    'id',
    'patient',
    'doctor',
    'total',
    'date',
    'payment time',
  ]

  const mockAppointments = [
    {
      id: 1,
      invoice: 'INV-001',
      patient: 'John Doe',
      doctor: {
        id: 1,
        name: 'Mick Doe',
        avatarUrl:
          'data:image/jpeg;base64,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',
      },
      total: 100,
      date: '2023-10-01',
      paymentTime: '2023-10-05',
    },
    {
      id: 2,
      invoice: 'INV-002',
      patient: 'Jane Smith',
      doctor: { id: 2, name: 'John Doe' },
      total: 200,
      date: '2023-10-02',
      paymentTime: '2023-10-06',
    },
    {
      id: 3,
      invoice: 'INV-003',
      patient: 'Jane Smith',
      doctor: { id: 2, name: 'John Doe' },
      total: 200,
      date: '2023-10-02',
      paymentTime: '2023-10-06',
    },
    {
      id: 4,
      invoice: 'INV-004',
      patient: 'Alice Doe',
      doctor: {
        id: 1,
        name: 'Mick Doe',
        avatarUrl:
          'data:image/jpeg;base64,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',
      },
      total: 150,
      date: '2023-10-03',
      paymentTime: '2023-10-07',
    },
    {
      id: 5,
      invoice: 'INV-005',
      patient: 'Bob Doe',
      doctor: { id: 3, name: 'Jane Doe' },
      total: 250,
      date: '2023-10-04',
      paymentTime: '2023-10-08',
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

  const filteredAppointments = selectedDoctor
    ? mockAppointments.filter((appt) => appt.doctor.id === selectedDoctor)
    : mockAppointments

  return (
    <Container header={t('appointments.page.header')}>
      <div className={styles.filterAppointments}>
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
            doctor: appointment.doctor.name,
          }))}
          tableHead={appointmentsFields}
        />
      </div>
    </Container>
  )
}
