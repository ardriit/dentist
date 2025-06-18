import { Button as MantineButton, type ButtonProps } from '@mantine/core';

export enum ButtonVariants {
  default = 'default',
  filled = 'filled',
  outlined = 'outlined',
  light = 'light',
  white = 'white',
  transparent = 'transparent',
  subtle = 'subtle',
}

interface P extends ButtonProps {
  label?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export const Button = ({
  label,
  disabled,
  color,
  loading,
  backgroundColor,
  children,
  style,
  ...props
}: P) => (
  <MantineButton
    data-testid="Button"
    style={{ ...style, backgroundColor }}
    disabled={disabled}
    color={color}
    loading={loading}
    {...props}
  >
    {label || children}
  </MantineButton>
);

export default Button;
