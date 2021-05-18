import { FunctionComponent } from 'react';

export interface Props {
  value: any;
  disabled?: boolean;
  onChange?: (e: Event) => void;
  placeholder?: string;
}

export const Input: FunctionComponent<Props>;
