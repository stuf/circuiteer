import * as L from 'partial.lenses';
import * as R from 'ramda';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { BackspaceIcon } from '@heroicons/react/solid';
import Group from '_/Group';
import Details from '_/Details';
import { Details as Deets } from 'components';
import { TierName } from '../../config';

import { setDrag } from 'state/drag';
import './Modules.css';

export default function SidebarModules(props) {
  const update = useDispatch();
  const { t } = useTranslation();
  const [state, setState] = useState({ filterText: '' });
  const filterRegex = useMemo(
    () => (state.filterText ? new RegExp(state.filterText, 'i') : null),
    [state.filterText],
  );

  console.log({ filterRegex });

  const mods = useSelector(
    L.get(['module', 'modules', L.valueOr([])]),
    shallowEqual,
  );

  /**
   * @type {IModule[]}
   */
  const moduleList = useMemo(() => L.collect(L.values, mods), [mods]);

  /**
   * @type {ITranslatedModule[]}
   */
  const translatedList = useMemo(
    () =>
      moduleList.map(it => ({
        ...it,
        displayName: t(`game:module.${it.id}`),
      })),
    [moduleList, t],
  );

  const filteredModuleList = useMemo(
    () =>
      translatedList.filter(it =>
        filterRegex ? filterRegex.test(it.displayName) : true,
      ),
    [translatedList, filterRegex],
  );

  const matchCount = useMemo(
    () => filteredModuleList.length,
    [filteredModuleList],
  );

  const modsʼ = useMemo(() => {
    const modules = L.collect(L.values, filteredModuleList);
    const modsʼʼ = R.sortBy(R.prop('tier'), modules);

    return modsʼʼ.reduceRight(
      (o, x) => L.set([`${x.tier}`, L.appendTo], x, o),
      {},
    );
  }, [filteredModuleList]);

  const term = state.filterText;

  return (
    <Group title="Modules">
      <div className="sidebar-modules">
        <input
          type="search"
          className="input--base"
          defaultValue={state.filterText}
          onChange={e => {
            const text = e.target.value;
            const filterText = text.length >= 3 ? text : '';

            setState(s => ({ ...s, filterText }));
          }}
          placeholder={t('sidebar:modules.searchPlaceholder')}
        />

        <div className="__search-clear-wrapper">
          <button
            className={cx(
              'button--base __search-clear',
              !state.filterText && '__search-clear--disabled',
            )}
            disabled={!state.filterText}
          >
            <BackspaceIcon
              className="__search-clear-icon"
              onClick={() => setState(s => ({ ...s, filterText: '' }))}
            />
          </button>
        </div>
      </div>

      {!!state.filterText && (
        <div>{t('common:filter.match', { count: matchCount })}</div>
      )}

      {Object.entries(modsʼ).map(([tierNum, modules]) => (
        <Deets key={`tier-${tierNum}`} open head={`Tier ${tierNum}`}>
          <ul className="grid grid-cols-2 gap-2 text-xs module-list">
            {modules.map((moduleObj, i) => {
              let match;
              const name = moduleObj.displayName;

              if (term === '') {
                match = name;
              } else {
                // match = <div className="text-lg">Juha Hugedick</div>;
                const len = term.length;
                const res = filterRegex.exec(name);

                match = (
                  <>
                    <span>{name.slice(0, res.index)}</span>
                    <mark>{name.slice(res.index, res.index + len)}</mark>
                    <span>{name.slice(res.index + len)}</span>
                  </>
                );
              }

              return (
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
                  className="border border-gray-200 shadow hover:shadow-lg px-2 py-1 font-mono flex flex-col cursor-pointer"
                >
                  <div className="flex-1 font-sans mb-2">{match}</div>
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
              );
            })}
          </ul>
        </Deets>
      ))}
    </Group>
  );
}
