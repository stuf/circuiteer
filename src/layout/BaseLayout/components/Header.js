import cx from 'classnames';
import './Header.css';

export function Header(props) {
  const { children, className } = props;

  return (
    <header className={cx('base-layout__header', className)}>
      <div className="flex items-center space-x-2 w-full px-4 py-2">
        <div className="space-x-2">
          <span className="font-bold">Circuiteer</span>
          <sup className="text-gray-500">Experimental</sup>
        </div>

        <div className="flex-grow" />
        <div className="">{children}</div>
      </div>
    </header>
  );
}
