import * as L from 'partial.lenses';
import * as R from 'ramda';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { Marker, Group, Details as Deets } from 'components';

import { setDrag } from 'state/drag';
import './Modules.css';

export default function SidebarModules(props) {
  const update = useDispatch();
  const { t } = useTranslation();
  const [state, setState] = useState({ filterText: '' });
  const highlightFilterText = !!state.filterText;

  const filterRegex = useMemo(
    () => (state.filterText ? new RegExp(state.filterText, 'i') : null),
    [state.filterText],
  );

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

  const matchCount = useMemo(() => filteredModuleList.length, [
    filteredModuleList,
  ]);

  const modsʼ = useMemo(() => {
    const modules = L.collect(L.values, filteredModuleList);
    const modsʼʼ = R.sortBy(R.prop('tier'), modules);

    return modsʼʼ.reduceRight(
      (o, x) => L.set([`${x.tier}`, L.appendTo], x, o),
      {},
    );
  }, [filteredModuleList]);

  return (
    <Group title="Modules">
      <div className="sidebar-modules">
        <input
          type="search"
          className="input--base __search-field"
          defaultValue={state.filterText}
          onChange={e => {
            const text = e.target.value;
            const filterText = text.length >= 3 ? text : '';

            setState(s => ({ ...s, filterText }));
          }}
          placeholder={t('sidebar:modules.searchPlaceholder')}
        />
      </div>

      {!!state.filterText && (
        <div>{t('common:filter.match', { count: matchCount })}</div>
      )}

      {Object.entries(modsʼ).map(([tierNum, modules]) => (
        <Deets key={`tier-${tierNum}`} open head={`Tier ${tierNum}`}>
          <ul className="grid grid-cols-2 gap-2 text-xs module-list">
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
                className="border border-gray-200 shadow hover:shadow-lg px-2 py-1 font-mono flex flex-col cursor-pointer"
              >
                <div className="flex-1 font-sans mb-2">
                  <Marker
                    text={moduleObj.displayName}
                    highlight={highlightFilterText}
                    pattern={filterRegex}
                  />
                </div>
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
        </Deets>
      ))}
    </Group>
  );
}
