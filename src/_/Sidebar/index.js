import * as L from 'partial.lenses';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import Input from 'components/form/Input';
import { setDrag } from 'state/drag';
import { setGridSize } from 'state/grid';

import css from './Sidebar.module.css';
import SidebarOptions from './Options';
import SidebarLocation from './Location';
import SidebarModules from './Modules';

function Sidebar(props) {
  const update = useDispatch();
  const gxy = useSelector(L.get(['grid', 'size']), shallowEqual);

  const modules = useSelector(
    L.get(['module', 'tier', L.valueOr({})]),
    shallowEqual,
  );

  const [gw, gh] = gxy;

  return (
    <div className={css.root}>
      <SidebarOptions />
      <SidebarLocation />
      <SidebarModules />

      <section className={css.group}>
        <header className={css.groupHead}>Modules</header>

        <div className={css.groupBody}>
          {Object.entries(modules).map(([t, xs]) => (
            <details key={`tier-${t}`} open>
              <summary>Tier {t}</summary>

              <ul className="grid grid-cols-2 gap-2 text-xs">
                {xs.map((x, i) => (
                  <li
                    key={`tier-${t}-${i}`}
                    draggable
                    onDragStart={e => {
                      const data_ = { module: x };
                      const data = JSON.stringify(data_);
                      e.dataTransfer.dropEffect = 'copy';
                      e.dataTransfer.setData('application/json', data);

                      console.log('data', data);

                      update(
                        setDrag({
                          dragging: true,
                          size: data_.module.size,
                        }),
                      );
                    }}
                    className="border border-gray-200 shadow hover:shadow-md px-2 py-1 font-mono flex flex-col"
                  >
                    <div className="flex-1 font-sans mb-2">{x.name}</div>
                    <div className="flex justify-between">
                      <div>{x.size.join(' × ')}</div>
                      <div
                        className={`${
                          x.power < 0 ? 'text-red-500' : 'text-green-500'
                        } font-bold`}
                      >
                        {x.power}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className={css.group}>
        <header className={css.groupHead}>Grid</header>

        <div className={css.groupBody}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Width"
              type="number"
              value={gw}
              onChange={e =>
                update(setGridSize(L.set(0, +e.target.value, gxy)))
              }
            />
            <Input
              label="Height"
              type="number"
              value={gh}
              onChange={e =>
                update(setGridSize(L.set(1, +e.target.value, gxy)))
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;

export { default as Options } from './Options';
export { default as Location } from './Location';
export { default as Modules } from './Modules';
