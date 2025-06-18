'use client'

import { Container, MyTable } from '@dental-pro/ui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { apiClient } from '@dental-pro/utils'

const tableHead = ['ID', 'First Name', 'Last Name', 'Phone', 'Email']

export const PatientsPage = () => {
  const router = useRouter()
  const [tableData, setTableData] = useState<
    {
      ID: number
      'First Name': string
      'Last Name': string
      Phone: string
      Email: string
    }[]
  >([])

  useEffect(() => {
    const fetchPatients = async () => {
      const res: any = await apiClient('/clients', 'GET')

      const mappedData = res.map((client: any) => ({
        ID: client.id,
        'First Name': client.firstName,
        'Last Name': client.lastName,
        Phone: client.phone,
        Email: client.email,
      }))
      setTableData(mappedData)
    }

    fetchPatients()
  }, [])

  const handleRowClick = (row: Record<string, string | number>) => {
    router.push(`/patients/${row.ID}`)
  }

  return (
    <div>
      <Container header="Patients">
        <MyTable
          tableHead={tableHead}
          tableData={tableData}
          onRowClick={handleRowClick}
        />
      </Container>
    </div>
  )
}
