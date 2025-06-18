import {
  Popover as MantinePopover,
  type PopoverProps,
  Button,
} from '@mantine/core';
// import { Button } from '../button';
import { FC } from 'react';

interface P extends PopoverProps {
  label?: string;
  trigger?: React.ReactNode;
}

export const Popover: FC<P> = ({
  label,
  trigger,
  children,
  position = 'bottom',
  withArrow = true,
  width = 300,
  withinPortal = false,
  ...props
}) => (
  <MantinePopover
    position={position}
    withArrow={withArrow}
    width={width}
    withinPortal={withinPortal}
    {...props}
  >
    <MantinePopover.Target>
      {trigger || (
        <Button size="xl" variant="white">
          {label}
        </Button>
      )}
    </MantinePopover.Target>
    <MantinePopover.Dropdown>{children}</MantinePopover.Dropdown>
  </MantinePopover>
);
