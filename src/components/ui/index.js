import clsx from 'clsx';
import { memo } from 'react';

export { Checkbox } from './Checkbox';
export { Dropdown } from './Dropdown';

export const Block = memo(props => {
  const { className, flex, children } = props;

  return (
    <div className={clsx('block', className, flex && `flex-${flex}`)}>
      {children}
    </div>
  );
});

export const Content = memo(props => {
  const { className, flex, children } = props;

  return (
    <div className={clsx('content', className, flex && `flex-${flex}`)}>
      {children}
    </div>
  );
});

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
