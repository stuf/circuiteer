import { useTranslation } from 'react-i18next';
import * as R from 'ramda';
import * as P from 'prop-types';

import { shoppingList } from 'core/data/meta/shopping-list';
import { thru } from 'common/util';
import { Group } from 'components';

export function ShoppingList(props) {
  const { t } = useTranslation();

  const { entities } = props;
  const modules = entities.map(it => it.module);
  const list = shoppingList(modules);
  const items = Object.entries(list);

  return (
    <Group title={t('ui:section.shoppingList.title')}>
      <dl className="divide-y-2 divide-dashed text-sm">
        {thru(
          items,
          R.sortBy(R.prop(0)),
          R.map(([material, count]) => (
            <div className="grid grid-cols-4 py-1" key={material}>
              <dt
                id={`shoppinglist-${material}`}
                aria-label={t(`game:material.${material}`)}
                className="font-normal col-span-3"
              >
                {t(`game:material.${material}`)}
              </dt>
              <dd
                aria-labelledby={`shoppinglist-${material}`}
                className="font-mono text-right"
              >
                {count}
              </dd>
            </div>
          )),
        )}
      </dl>
    </Group>
  );
}

ShoppingList.propTypes = {
  entities: P.arrayOf(P.object),
};

ShoppingList.defaultProps = {
  entities: [],
};
