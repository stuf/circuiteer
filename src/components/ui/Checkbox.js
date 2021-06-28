import clsx from 'clsx';

export function Checkbox(props) {
  const { id, label, children, checked, onChange, invert } = props;

  return (
    <div className={clsx(!invert ? 'checkbox' : 'checkbox-invert')}>
      <input type="checkbox" {...{ id, checked, onChange }} />
      <label htmlFor={id}>{children || label}</label>
    </div>
  );
}
