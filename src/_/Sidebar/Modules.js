import * as L from 'partial.lenses';
import * as R from 'ramda';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { BackspaceIcon } from '@heroicons/react/solid';
import Group from '_/Group';
import Details from '_/Details';
import { TierName } from '../../config';

import { setDrag } from 'state/drag';
import './Modules.css';

export default function SidebarModules(props) {
  const update = useDispatch();
  const { t } = useTranslation();
  const [state, setState] = useState({ filterText: '' });

  const modules = useSelector(
    L.get(['module', 'tier', L.valueOr({})]),
    shallowEqual,
  );

  const mods = useSelector(
    L.get(['module', 'modules', L.valueOr([])]),
    shallowEqual,
  );

  const modsʼ = useMemo(() => {
    const modules = L.collect(L.values, mods);
    const modsʼʼ = R.sortBy(R.prop('tier'), modules);

    return modsʼʼ.reduceRight(
      (o, x) => L.set([`${x.tier}`, L.appendTo], x, o),
      {},
    );
  }, [mods]);

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
          <button className="button--base __search-clear">
            <BackspaceIcon className="__search-clear-icon" />
          </button>
        </div>
      </div>

      <div>Filter: {state.filterText}</div>

      <div>
        {Object.entries(modsʼ).map(([n, v], i) => (
          <div key={i}>
            <header>Tier {n}</header>

            <ul>
              {v.map((x, ix) => (
                <li key={ix}>{t(`game:module.${x.id}`)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

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
                className="border border-gray-200 shadow hover:shadow-lg px-2 py-1 font-mono flex flex-col cursor-pointer"
              >
                <div className="flex-1 font-sans mb-2">
                  {t(`game:module.${moduleObj.id}`)}
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
        </Details>
      ))}
    </Group>
  );
}
