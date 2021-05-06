import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleEntityEditor,
  toggleHideInvalid,
  togglePowerStatus,
} from 'state/options';

import Toggle from '_/Toggle';

const items = [
  {
    label: 'Hide invalid',
    value: options => options.flags.hideInvalid,
    action: () => toggleHideInvalid(),
  },
  {
    label: 'Show power status',
    value: options => options.flags.showPowerStatus,
    action: () => togglePowerStatus(),
  },
  {
    label: 'Show entity editor',
    value: options => options.flags.showEditor,
    action: () => toggleEntityEditor(),
  },
];

export default function SidebarOptions(props) {
  const options = useSelector(L.get('options'));
  const update = useDispatch();

  return (
    <section>
      <header className="font-bold mb-2">Options</header>

      <div className="space-y-2">
        {items.map((item, ix) => (
          <Toggle
            key={ix}
            checked={(item.value || (a => a))(options)}
            label={item.label}
            onChange={() => update(item.action())}
          />
        ))}
      </div>
    </section>
  );
}
