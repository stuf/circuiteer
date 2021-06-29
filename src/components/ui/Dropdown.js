import clsx from 'clsx';

export function Dropdown(props) {
  const { id, className, value, choices = [], onChange } = props;

  return (
    <div className="dropdown">
      <select {...{ id, onChange, defaultValue: value }}>
        {choices.map((item, i) => (
          <option key={`choice-${i}`}></option>
        ))}
      </select>
    </div>
  );
}
