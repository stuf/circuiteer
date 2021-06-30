import clsx from 'clsx';
import * as P from 'prop-types';

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

Dropdown.propTypes = {
  id: P.string.isRequired,
  className: P.string,
  value: P.any,
  choices: P.arrayOf(P.object),
  onChange: P.func,
  renderChoice: P.func.isRequired,
};
