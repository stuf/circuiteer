import clsx from 'clsx';
import { memo } from 'react';
import * as P from 'prop-types';

export const Block = memo(props => {
  const { className, flex, children } = props;

  return (
    <div className={clsx('block', className, flex && `flex-${flex}`)}>
      {children}
    </div>
  );
});

Block.propTypes = {
  className: P.string,
  flex: P.string,
  children: P.oneOfType([P.node, P.elementType, P.string]),
};
