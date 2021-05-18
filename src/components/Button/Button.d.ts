import { FunctionComponent, ReactNode } from 'react';

interface Props {
  label?: string | ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'primary' | 'secondary';
  icon?: string;
}

export const Button: FunctionComponent<Props>;
