import { FunctionComponent } from 'react';

interface Props {
  text?: string;
  pattern?: RegExp;
  highlight?: boolean;
}

export const Marker: FunctionComponent<Props>;
