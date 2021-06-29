import { FunctionComponent } from 'react';

export interface Props {}

export interface AutosizeProps extends Props {
  parentWidth: number;
  parentHeight: number;
}

export const CanvasElement: FunctionComponent<Props>;

export const AutosizeCanvasElement: FunctionComponent<AutosizeProps>;
