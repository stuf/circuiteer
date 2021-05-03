import css from './Input.module.css';

function Input(props) {
  const { label, type, id, value, onChange = a => a } = props;

  return (
    <div className={css.root}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={css.input}
        type={type}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
