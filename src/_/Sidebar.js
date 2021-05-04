import * as L from 'partial.lenses';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import Input from '../components/form/Input';
import { setDragSize, setDragging, setDrag } from '../state/drag';

function Sidebar(props) {
  const update = useDispatch();
  const [gw, gh] = useSelector(L.get(['grid', 'size']), shallowEqual);
  const modules = useSelector(
    L.get(['module', 'tier', L.valueOr({})]),
    shallowEqual,
  );

  return (
    <div>
      <section>
        <header>Modules</header>

        {Object.entries(modules).map(([t, xs]) => (
          <details key={`tier-${t}`} className="px-2 py-1" open>
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
                  className="border border-pink-500 px-2 py-1 font-mono"
                >
                  <div className="flex justify-between">
                    <span>{x.shortId}</span>
                    <span
                      className={`${
                        x.power < 0 ? 'text-red-500' : 'text-green-500'
                      }`}
                    >
                      {x.power}
                    </span>
                  </div>
                  <div>{x.size.join(' × ')}</div>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </section>

      <section>
        <header>Grid</header>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Width" type="number" value={gw} />
          <Input label="Height" type="number" value={gh} />
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
