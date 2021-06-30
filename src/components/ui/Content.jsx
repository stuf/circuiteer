import clsx from 'clsx';
import { memo } from 'react';
import * as P from 'prop-types';

export const Content = memo(props => {
  const { className, flex, children } = props;

  return (
    <div className={clsx('content', className, flex && `flex-${flex}`)}>
      {children}
    </div>
  );
});

Content.propTypes = {
  className: P.string,
  flex: P.string,
  children: P.oneOfType([P.node, P.elementType, P.string]),
};
