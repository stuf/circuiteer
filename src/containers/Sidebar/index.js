import SidebarOptions from './Options';
import SidebarLocation from './Location';
import SidebarModules from './Modules';
import SidebarGrid from './Grid';

import './index.css';

export function Sidebar() {
  return (
    <div className="sidebar sidebar--root">
      <SidebarOptions />
      <SidebarLocation />
      <SidebarModules />
      <SidebarGrid />
    </div>
  );
}

export { default as Options } from './Options';
export { default as Location } from './Location';
export { default as Modules } from './Modules';
export { default as Grid } from './Grid';
