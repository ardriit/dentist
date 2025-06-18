'use client'

import { Table, Pagination, ActionIcon, Group } from '@mantine/core'
import { ReactComponent as TrashIcon } from '../icons/trash.svg'
import { ReactComponent as PrinterIcon } from '../icons/printer.svg'
import { ReactComponent as EditIcon } from '../icons/edit.svg'

//libs/ui/src/lib/icons/user-svgrepo-com.svg

import styles from './Table.module.scss'
import classNames from 'classnames'

export const MyTable = ({
  withColumnBorders = true,
  withTableBorder = true,
  highlightOnHover = true,
  isVertical = false,
  tableData,
  tableHead,
  onRowClick,
  customClassNames,
  verticalSpacing,
}: {
  withColumnBorders?: boolean
  withTableBorder?: boolean
  highlightOnHover?: boolean
  isVertical?: boolean
  tableData: Record<string, string | number>[]
  tableHead: string[]
  onRowClick?: (row: Record<string, string | number>) => void
  customClassNames?: string
  verticalSpacing?: string
}) => {
  // function setCurrentPage(value: number): void {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <div className={classNames(styles.container, customClassNames)}>
      <Table.ScrollContainer minWidth={500}>
        <Table
          withColumnBorders={withColumnBorders}
          withTableBorder={withTableBorder}
          highlightOnHover={highlightOnHover}
          variant={isVertical ? 'vertical' : 'horizontal'}
          verticalSpacing={verticalSpacing}
          striped
          styles={{
            tr: {
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            },
            th: {
              backgroundColor: '#1e2c31',
              fontWeight: 600,
              color: '#b6c5cc',
              textTransform: 'uppercase',
              fontSize: '16px',
            },
            td: {
              padding: '12px 16px',
              fontSize: '14px',
            },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              {tableHead.map((head, index) => (
                <Table.Th key={index}>{head}</Table.Th>
              ))}
              <Table.Th style={{ textAlign: 'center' }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableData.map((row, index) => (
              <Table.Tr
                key={index}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {tableHead.map((head, columnIndex) => (
                  <Table.Td key={columnIndex}>{row[head]}</Table.Td>
                ))}
                <Table.Td>
                  <Group
                    gap="sm"
                    justify="center"
                    style={{ marginLeft: 'auto' }}
                  >
                    <ActionIcon
                      variant="subtle"
                      color="green"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <PrinterIcon />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <EditIcon />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <TrashIcon />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Pagination
          total={4}
          value={1}
          // onChange={setCurrentPage}
          size="md"
          withEdges
        />
      </div>
    </div>
  )
}
