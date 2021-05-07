import cx from 'classnames';

export default function Button(props) {
  const { children, className, icon: Icon, ...rest } = props;

  const cns = [
    'px-4 py-2 bg-black text-white rounded-md relative',
    'hover:bg-purple-600 hover:shadow-md',
    'focus:bg-purple-500',
    Icon && 'pl-10',
  ];

  return (
    <button className={cx(...cns)} {...rest}>
      {Icon && (
        <span className="absolute inset-y-0 left-2 inline-flex items-center">
          <Icon className="w-5 h-5" />
        </span>
      )}

      {children}
    </button>
  );
}
