import clsx from 'clsx';
import * as P from 'prop-types';
import { memo } from 'react';

export const ShowInfo = memo(props => {
  const {
    size = null,
    narrow,
    label,
    content,
    className,
    children,
    noPadContent,
  } = props;

  return (
    <div className={clsx('show-info', noPadContent && 'content--no-pad')}>
      <div className="show-info__label font-02">{label}</div>
      <div
        className={clsx(
          'show-info__content',
          className,
          size && `font-${size}`,
          'font-italic',
          narrow && 'font-narrow',
        )}
      >
        {children || content}
      </div>
    </div>
  );
});

ShowInfo.propTypes = {
  /**
   * Font size
   */
  size: P.oneOf(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']),
  /**
   * Display content with a narrow typeface
   */
  narrow: P.bool,
  label: P.string.isRequired,
  /**
   * Content to show, if a simple string, number, etc.
   * Otherwise put the content as its children.
   */
  content: P.string,
  /**
   * Content to show, in case of more complex stuff.
   */
  children: P.oneOfType([P.node, P.elementType, P.string]),
  className: P.string,
};
