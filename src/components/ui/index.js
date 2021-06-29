import clsx from 'clsx';
import { memo } from 'react';

export { Checkbox } from './Checkbox';
export { Dropdown } from './Dropdown';

const cns = {
  block: 'info-panel__block',
  content: 'info-panel__content',
};

export const Block = memo(props => {
  const { className, flex, children } = props;

  return (
    <div className={clsx(cns.block, className, flex && `flex-${flex}`)}>
      {children}
    </div>
  );
});

export const Content = memo(props => {
  const { className, flex, children } = props;

  return (
    <div className={clsx(cns.content, className, flex && `flex-${flex}`)}>
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
  const { size = null, narrow, label, content, className, children } = props;

  return (
    <>
      <div className="font-02">{label}</div>
      <div
        className={clsx(
          className,
          size && `font-${size}`,
          'font-italic',
          narrow && 'font-narrow',
        )}
      >
        {children || content}
      </div>
    </>
  );
});
