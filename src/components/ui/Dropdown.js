import clsx from 'clsx';

export function Dropdown(props) {
  const { id, className, value, choices = [], onChange, renderChoice } = props;

  const choiceFn = renderChoice || (() => 'foo');

  return (
    <div className={clsx('dropdown', className)}>
      <select {...{ id, onChange, defaultValue: value }}>
        {choices.map((item, i) => choiceFn({ item, i }))}
      </select>
    </div>
  );
}
