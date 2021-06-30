import clsx from 'clsx';
import * as P from 'prop-types';
import { memo } from 'react';

export const Flex = memo(props => {
  const { center, divide, main, cross, vertical } = props;

  let axis;
  if (center && main) {
    axis = 'main';
  } else if (center && cross) {
    axis = 'cross';
  }
  const _className = [
    'flex',
    center && `center-${axis}`,
    vertical && `vertical`,
    divide && !vertical && 'divide-x',
    divide && vertical && 'divide-y',
    props.className,
  ];

  return <div className={clsx(_className)}>{props.children}</div>;
});

Flex.propTypes = {
  center: P.bool,
  divide: P.bool,
  main: P.bool,
  cross: P.bool,
  vertical: P.bool,
  children: P.oneOfType([P.node, P.elementType, P.string]),
};
