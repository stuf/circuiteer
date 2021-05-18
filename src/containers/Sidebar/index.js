import * as P from 'prop-types';
import cx from 'classnames';

import SidebarOptions from './Options';
import SidebarLocation from './Location';
import SidebarModules from './Modules';
import SidebarGrid from './Grid';

import './index.css';

export function Sidebar(props) {
  const { className } = props;

  return (
    <div className={cx('sidebar sidebar--root', className)}>
      <SidebarOptions />
      <SidebarLocation />
      <SidebarModules />
      <SidebarGrid />
    </div>
  );
}

Sidebar.propTypes = {
  className: P.string,
};

export { default as Options } from './Options';
export { default as Location } from './Location';
export { default as Modules } from './Modules';
export { default as Grid } from './Grid';
