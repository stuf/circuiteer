import { FunctionComponent } from 'react';

export interface IChoice<T> {
  value: T;
  label: string;
}

export interface Props<T = string> {
  value: T;
  onChange?: (e: Event) => void;
  choices?: IChoice<T>[];
  disabled?: boolean;
}

export const Dropdown: FunctionComponent<Props>;
