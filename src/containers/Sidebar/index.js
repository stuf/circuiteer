import * as P from 'prop-types';

import SidebarOptions from './Options';
import SidebarLocation from './Location';
import SidebarModules from './Modules';
import SidebarGrid from './Grid';

import './index.css';

export function Sidebar(props) {
  return (
    <div className={'grid grid-cols-2 gap-2 border-l-2'} style={{ width: 400 }}>
      <div className="overflow-auto">
        <SidebarOptions />
        <SidebarLocation />
        <SidebarModules />
        <SidebarGrid />
      </div>
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
