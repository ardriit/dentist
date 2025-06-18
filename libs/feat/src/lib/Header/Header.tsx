'use client'
import { SearchBar } from '../SearchBar'
import styles from './Header.module.scss'
import { Button, Popover, Modal } from '@mantine/core'
import { UserMenu } from '../UserMenu'
import {
  CirclePlusIcon,
  CreateAppointmentIcon,
  CreatePatientIcon,
} from '@dental-pro/ui/icons'
import { CreatePatient } from '../CreatePatient'
import { useTranslation } from '@dental-pro/i18n'
import { useRouter } from 'next/navigation'
import { useDisclosure } from '@mantine/hooks'

export const Header = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [popoverOpened, { close: closePopover, toggle: togglePopover }] =
    useDisclosure(false)
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false)

  const handleCloseModal = () => {
    closeModal()
  }

  return (
    <div className={styles.header}>
      <span />
      <div className={styles.searchBar}>
        <SearchBar />
        <Popover
          opened={popoverOpened}
          width={250}
          position="bottom"
          withArrow
          shadow="md"
          classNames={{ dropdown: styles.popoverDropdown }}
          onChange={togglePopover}
        >
          <Popover.Target>
            <Button
              px={16}
              py={5}
              size="sm"
              onClick={togglePopover}
              rightSection={<CirclePlusIcon />}
              name={'togglePopover'}
            >
              {t('create.new.header')}
            </Button>
          </Popover.Target>
          <Popover.Dropdown bg="var(--mantine-color-body)">
            <Button
              variant="white"
              size="md"
              onClick={() => {
                router.push('/calendar')
                closePopover()
              }}
              leftSection={<CreateAppointmentIcon />}
            >
              {t('create.new.appointment')}
            </Button>
            <Button
              variant="white"
              size="md"
              onClick={() => {
                openModal()
                closePopover()
              }}
              leftSection={<CreatePatientIcon />}
            >
              {t('create.new.patient')}
            </Button>
          </Popover.Dropdown>
        </Popover>
      </div>
      <div className={styles.userMenu}>
        <UserMenu />
      </div>
      <Modal opened={modalOpened} onClose={closeModal} size="60%">
        <CreatePatient onClose={handleCloseModal} />
      </Modal>
    </div>
  )
}
