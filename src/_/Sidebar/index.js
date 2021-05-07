import css from './Sidebar.module.css';
import SidebarOptions from './Options';
import SidebarLocation from './Location';
import SidebarModules from './Modules';
import SidebarGrid from './Grid';

function Sidebar() {
  return (
    <div className={css.root}>
      <SidebarOptions />
      <SidebarLocation />
      <SidebarModules />
      <SidebarGrid />
    </div>
  );
}

export default Sidebar;

export { default as Options } from './Options';
export { default as Location } from './Location';
export { default as Modules } from './Modules';
export { default as Grid } from './Grid';
