import clsx from 'clsx';

export { Checkbox } from './Checkbox';

const cns = {
  block: 'info-panel__block',
  content: 'info-panel__content',
};

export function Block(props) {
  const { className, flex, children } = props;

  return (
    <div className={clsx(cns.block, className, flex && `flex-${flex}`)}>
      {children}
    </div>
  );
}

export function Content(props) {
  const { className, flex, children } = props;

  return (
    <div className={clsx(cns.content, className, flex && `flex-${flex}`)}>
      {children}
    </div>
  );
}

export function Flex(props) {
  const { center, divide, main, cross, vertical } = props;

  console.assert(
    center && (main || cross),
    'If center is specified, either cross or main must be defined, too',
  );

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
}
