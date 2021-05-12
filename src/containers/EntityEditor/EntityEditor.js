import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Toggle } from 'components';
import { useCurrentEntity } from './hooks';

export function EntityEditor(props) {
  const { current, module, toggleCurrent } = useCurrentEntity();
  const [state, setState] = useState({ showDebug: false });
  const { t } = useTranslation();

  return (
    <aside className="absolute top-2 right-2 bg-white shadow-md border-2 rounded-md z-10 text-xs w-96">
      <header className="relative px-4 py-2 text-base font-bold">
        {t(`game:module.${module.id}`)}
        <Toggle
          className="absolute flex items-center -inset-y-0 right-4 text-sm"
          checked={current.enabled}
          label={t('common:enable')}
          onChange={toggleCurrent}
        />
      </header>

      <div className="px-4 py-2">
        <dl
          className="gap-2"
          style={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}
        >
          <dt>ID</dt>
          <dd className="font-mono">{current.id}</dd>

          <dt>Position</dt>
          <dd className="font-mono">
            (x={current.pos[0]}, y={current.pos[1]})
          </dd>

          <dt>Size</dt>
          <dd className="font-mono">
            (w={module.size[0]}, h={module.size[1]})
          </dd>

          <dt>Module</dt>
          <dd>
            <dl style={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}>
              <dt>ID</dt>
              <dd>{module.id}</dd>

              <dt>Power</dt>
              <dd>{module.power} U/s</dd>

              <dt>Type</dt>
              <dd>{module.powerType}</dd>

              <dt>Tier</dt>
              <dd>{module.tier}</dd>
            </dl>
          </dd>
        </dl>
      </div>

      <div className="px-4 py-2">
        <fieldset>
          <legend>
            <Toggle
              label="Show debug"
              checked={state.showDebug}
              onChange={() =>
                setState(s => ({ ...s, showDebug: !s.showDebug }))
              }
            />
          </legend>

          {state.showDebug && (
            <pre className="mt-4">{JSON.stringify(current, null, 2)}</pre>
          )}
        </fieldset>
      </div>
    </aside>
  );
}
