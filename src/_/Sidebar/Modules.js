import * as L from 'partial.lenses';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import cx from 'classnames';

import Group from '_/Group';
import Details from '_/Details';

import { setDrag } from 'state/drag';

export default function SidebarModules(props) {
  const update = useDispatch();

  const modules = useSelector(
    L.get(['module', 'tier', L.valueOr({})]),
    shallowEqual,
  );

  return (
    <Group title="Modules">
      {Object.entries(modules).map(([tierNum, modules]) => (
        <Details key={`tier-${tierNum}`} open title={`Tier ${tierNum}`}>
          <ul className="grid grid-cols-2 gap-2 text-xs">
            {modules.map((moduleObj, i) => (
              <li
                key={`tier-${tierNum}-${i}`}
                draggable
                onDragStart={e => {
                  const data_ = { module: moduleObj };
                  const data = JSON.stringify(data_);

                  // Assign module data to the dragging event
                  e.dataTransfer.dropEffect = 'copy';
                  e.dataTransfer.setData('application/json', data);

                  update(
                    setDrag({
                      dragging: true,
                      size: data_.module.size,
                    }),
                  );
                }}
                className="border border-gray-200 shadow hover:shadow-md px-2 py-1 font-mono flex flex-col"
              >
                <div className="flex-1 font-sans mb-2">{moduleObj.name}</div>
                <div className="flex justify-between">
                  <div>{moduleObj.size.join(' × ')}</div>
                  <div
                    className={cx(
                      moduleObj.power < 0 ? 'text-red-500' : 'text-green-500',
                      'font-bold',
                    )}
                  >
                    {moduleObj.power}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Details>
      ))}
    </Group>
  );
}
