import clsx from 'clsx';
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { setCurrentTier } from 'state/tier';
import { addingNew } from 'state/canvas';

import { actions, withSign } from 'common/util';
import { useCurrentTierModules } from 'common/hooks/derived';

import { Dropdown, Flex, Block, ShowInfo, Content } from 'components/ui';

export function EntityPalette(props) {
  const { className } = props;

  const update = useDispatch();
  const currentTier = useSelector(L.get(['tier', 'current']));
  const tiers = useSelector(L.get(['tier', L.log(), 'tiers']));
  const { t } = useTranslation();

  console.log(tiers);

  const currentTierObjects = useCurrentTierModules();
  const shouldPadList = currentTierObjects.length % 2 === 1;
  console.log({ shouldPadList });

  return (
    <section className={clsx('entity-palette divide-y', className)}>
      <Flex vertical divide>
        <Block>
          <Content>
            <ShowInfo label="Tier" narrow>
              <Dropdown
                value={currentTier}
                choices={tiers}
                onChange={e => {
                  console.log({ e, val: e.target.value });
                  update(setCurrentTier(e.target.value));
                }}
                renderChoice={({ item, i }) => (
                  <option key={item.id} value={item.id}>
                    {t(`game:tier.${item.name}`)}
                  </option>
                )}
              />
            </ShowInfo>
          </Content>
        </Block>
        <Block>
          <Content>
            <ShowInfo label="Modules" noPadContent>
              <ul className="entity-palette__list">
                {currentTierObjects.map((o, i) => (
                  <li
                    key={o.id}
                    className="entity-palette__list-item"
                    onClick={actions(R.compose(update, addingNew, R.always(o)))}
                  >
                    <div>{t(`game:entity.${o.id}`)}</div>
                    <div>
                      {t('ui:unit.perSec', { value: withSign(o.power) })}
                    </div>
                  </li>
                ))}
                {shouldPadList && (
                  <li className="entity-palette__list-item --filler"></li>
                )}
              </ul>
            </ShowInfo>
          </Content>
        </Block>
      </Flex>
    </section>
  );
}
