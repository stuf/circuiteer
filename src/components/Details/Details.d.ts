import { FunctionComponent, ReactNode } from 'react';

export interface Props {
  open?: boolean;
  head?: ReactNode;
  className?: string;
}

export const Details: FunctionComponent<Props>;
