import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Toggle } from 'components';
import { useCurrentEntity } from './hooks';

export function EntityEditor(props) {
  const { current, module, toggleCurrent } = useCurrentEntity();
  const [state, setState] = useState({ showDebug: false });
  const { t } = useTranslation();

  function Wrapper({ children }) {
    return (
      <aside className="absolute top-2 right-2 bg-white shadow-md border-2 rounded-md z-10 text-xs w-96">
        {children}
      </aside>
    );
  }

  if (!current) {
    return (
      <Wrapper>
        <header>Something is wrong</header>

        <div>
          You shouldn't be seeing this, as the entity editor should only be
          shown when having selected an entity.
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
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
          <dt id="entity-id">ID</dt>
          <dd aria-labelledby="entity-id" className="font-mono">
            {current.id}
          </dd>

          <dt id="entity-position">Position</dt>
          <dd aria-labelledby="entity-position" className="font-mono">
            (x={current.pos[0]}, y={current.pos[1]})
          </dd>

          <dt id="entity-size">Size</dt>
          <dd aria-labelledby="entity-size" className="font-mono">
            (w={module.size[0]}, h={module.size[1]})
          </dd>

          <dt id="entity-module">Module</dt>
          <dd aria-labelledby="entity-module">
            <dl style={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}>
              <dt id="module-id">Module ID</dt>
              <dd aria-labelledby="module-id">{module.id}</dd>

              <dt id="module-power">Power</dt>
              <dd aria-labelledby="module-power">{module.power} U/s</dd>

              <dt id="module-type">Type</dt>
              <dd aria-labelledby="module-type">{module.powerType}</dd>

              <dt id="module-tier">Tier</dt>
              <dd aria-labelledby="module-tier">{module.tier}</dd>
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
    </Wrapper>
  );
}
