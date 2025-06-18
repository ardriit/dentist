import { useBoolean } from '@dental-pro/hooks'
import { Modal as MantineModal, type ModalProps } from '@mantine/core'

interface P extends ModalProps {
  isEdit?: boolean
  setIsEdit?: (value: boolean) => void
}

export const Modal = ({
  opened,
  onClose,
  children,
  title,
  fullScreen,
  size,
}: P) => {
  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      title={title}
      fullScreen={fullScreen}
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
      size={size}
    >
      {children}
    </MantineModal>
  )
}
