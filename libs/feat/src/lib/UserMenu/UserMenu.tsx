import { forwardRef } from 'react'
import {
  AlbanianFlagIcon,
  EnglishLanguageIcon,
  LogOutIcon,
  // MyAccountIcon,
} from '@dental-pro/ui/icons'
import { Group, Avatar, Text, Menu, UnstyledButton } from '@mantine/core'
// import styles from './UserMenu.module.scss';
interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string
  name: string
  email: string
  icon?: React.ReactNode
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-sm)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text c="white" size="sm" fw={500}>
            {name}
          </Text>
        </div>

        {/* {icon || <IconChevronRight size={16} />} */}
      </Group>
    </UnstyledButton>
  )
)

export const UserMenu = () => {
  // const handleLogOut = () => {
  // Handle logout logic here
  // }
  return (
    <Group justify="center" align="center">
      <Menu
        withArrow
        width={250}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        withinPortal
      >
        <Menu.Target>
          <UserButton
            image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
            name="DentalPro Test"
            email="dentalpro@test.com"
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
          // rightSection={<IconChevronRight size={16} stroke={1.5} />}
          >
            <Group>
              <Avatar
                radius="xl"
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
              />

              <div>
                <Text size="md" fw={500}>
                  DentalPro Test
                </Text>
                <Text size="md" c="dimmed">
                  dentalpro@test.com
                </Text>
              </div>
            </Group>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Language</Menu.Label>
          <Menu.Item leftSection={<AlbanianFlagIcon width={30} height={30} />}>
            Shqip
          </Menu.Item>
          {/* <Menu.Item leftSection={<MyAccountIcon />}>Profile</Menu.Item> */}
          <Menu.Item
            leftSection={<EnglishLanguageIcon width={30} height={30} />}
          >
            English
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
          // leftSection={<IconPlayerPause size={16} stroke={1.5} />}
          >
            Pause subscription
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<LogOutIcon />}
            // onClick={handleLogOut}
          >
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
