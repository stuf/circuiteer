import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import * as L from 'partial.lenses';

import { State } from '../state_';
import { modules } from '../config';
import { Input } from './form';
import css from './Sidebar.module.css';

function Sidebar(props) {
  const { state, setState } = useContext(State);
  const { t } = useTranslation();

  const setDragSize = ([w, h]) => setState(L.set(['drag', 'size'], [w, h]));

  const moduleTierDict = Object.values(modules).reduce(
    (o, it) => L.set([`${it.tier}`, L.appendTo], it, o),
    {},
  );

  return (
    <aside className={css.root}>
      <header className={css.sidebarHeader}>Controls</header>

      <div className="space-y-2 flex flex-col h-full py-2">
        <section className={cx(css.group, 'flex-1')}>
          <header className={css.groupHead}>Modules</header>

          <div className={css.groupBody}>
            {Object.entries(moduleTierDict).map(([tier, items]) => {
              return (
                <details key={`tier${tier}`} open>
                  <summary className="mb-1">Tier {tier}</summary>

                  <ul className="grid grid-cols-2 text-xs gap-2">
                    {items.map(it => (
                      <li
                        key={`tier${tier}-${it.id}`}
                        draggable
                        tabIndex="-1"
                        className="bg-white focus:ring-2 ring-pink-500 border border-black border-opacity-50 px-2 py-1 shadow hover:shadow-md space-y-1"
                        onDragStart={e => {
                          e.dataTransfer.dropEffect = 'copy';
                          e.dataTransfer.setData(
                            'application/json',
                            JSON.stringify({
                              module: it,
                            }),
                          );
                        }}
                      >
                        <header>{it.name}</header>
                        <div
                          className={cx(
                            'font-mono',
                            'text-right',
                            it.power < 0 ? 'text-red-500' : 'text-green-500',
                          )}
                        >
                          {it.power > 0 ? '+' : ''}
                          {it.power}
                        </div>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
        </section>

        <section className={css.group}>
          <header className={css.groupHead}>{t('common:grid')}</header>

          <div className={css.groupBody}>
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Width"
                id="width"
                type="number"
                value={L.get(['canvas', 'grid', 0], state)}
                onChange={e =>
                  setState(L.set(['canvas', 'grid', 0], +e.target.value ?? 12))
                }
              />
              <Input
                label="Height"
                id="height"
                type="number"
                value={L.get(['canvas', 'grid', 1], state)}
                onChange={e =>
                  setState(L.set(['canvas', 'grid', 1], +e.target.value ?? 12))
                }
              />
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}

export default Sidebar;
