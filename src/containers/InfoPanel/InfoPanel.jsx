import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { setCurrent } from 'state/location';
import { useGameLocations } from 'common/hooks/locations';
import { useOptionFlags } from 'common/hooks/options';
import { usePowerBreakdown } from 'common/hooks/derived';
import {
  ShowInfo,
  Checkbox,
  Block,
  Content,
  Flex,
  Dropdown,
} from 'components/ui';

import { percent, show, withSign } from 'common/util';
import { EfficiencyI } from 'common/constants';

const optionFlags = [
  {
    label: 'locationEfficiency',
    key: 'locationEfficiency',
  },
  {
    label: 'powerBreakdown',
    key: 'powerBreakdown',
  },
  {
    label: 'stateDebug',
    key: 'stateDebug',
  },
];

/**
 *
 * @param {object} props
 * @param {Hooks.Derived.UsePowerBreakdownHook} props.power
 * @returns
 */
function Breakdown(props) {
  const { t } = useTranslation();
  const { power } = props;

  const getDiff = k => {
    const vals = power?.breakdown[k];
    if (!vals) return null;

    return vals.adjusted - vals.raw;
  };

  const solarBonus = getDiff('solar');
  const windBonus = getDiff('wind');

  return (
    <Flex vertical>
      <Block>
        <Content>
          <ShowInfo label={t('ui:powerBreakdown')} narrow>
            <dl className="mt-02">
              {power.breakdown.constant && (
                <div className="row">
                  <dt>{t('ui:powerType.constant')}</dt>
                  <dd>{withSign(power.breakdown.constant?.adjusted)}</dd>
                </div>
              )}

              {power.breakdown.solar && (
                <div className="row">
                  <dt>{t('ui:powerType.solar')}</dt>
                  <dd>{withSign(power.breakdown.solar?.adjusted)}</dd>
                </div>
              )}

              {power.breakdown.wind && (
                <div className="row">
                  <dt>{t('ui:powerType.wind')}</dt>
                  <dd>{withSign(power.breakdown.wind?.adjusted)}</dd>
                </div>
              )}

              {power.breakdown.powered && (
                <div className="row">
                  <dt>{t('ui:powerType.powered')}</dt>
                  <dd>{withSign(power.breakdown.powered?.adjusted)}</dd>
                </div>
              )}

              {(solarBonus || windBonus) && (
                <>
                  <hr />

                  <div className="row">
                    <dt>{t('ui:locationAdjusted')}</dt>
                    <dd></dd>
                  </div>

                  {solarBonus && (
                    <div className="row">
                      <dt>{t('ui:powerType.solar')}</dt>
                      <dd>{withSign(solarBonus)}</dd>
                    </div>
                  )}

                  {windBonus && (
                    <div className="row">
                      <dt>{t('ui:powerType.wind')}</dt>
                      <dd>{withSign(windBonus)}</dd>
                    </div>
                  )}
                </>
              )}

              <hr />

              <div className="row">
                <dt>{t('ui:production')}</dt>
                <dd>{withSign(power.sum.production.adjusted)}</dd>
              </div>

              <div className="row">
                <dt>{t('ui:usage')}</dt>
                <dd>{withSign(power.sum.usage.adjusted)}</dd>
              </div>

              <hr />

              <div className="row">
                <dt>{t('ui:sum')}</dt>
                <dd>
                  {withSign(
                    power.sum.production.adjusted + power.sum.usage.adjusted,
                  )}
                </dd>
              </div>
            </dl>
          </ShowInfo>
        </Content>
      </Block>
    </Flex>
  );
}

export function InfoPanel(props) {
  const update = useDispatch();
  const { t } = useTranslation();
  const locations = useGameLocations();
  const flags = useOptionFlags();

  const currentLocation = locations?.entities[locations?.current] || {};
  const pwr = usePowerBreakdown();

  const showEffFn = flags.flags.locationEfficiency
    ? percent
    : v => EfficiencyI[v];

  const locationEff = {
    solar: showEffFn(currentLocation.solar),
    wind: showEffFn(currentLocation.wind),
  };

  const toggleFlag = name => () => flags.actions.toggleFlag(name);

  const number = { narrow: true, size: '08' };

  return (
    <div className="info-panel">
      <Flex divide>
        {flags.flags.powerBreakdown && <Breakdown power={pwr} />}

        <Flex vertical center main divide>
          <Block>
            <Content>
              <ShowInfo label={t('ui:name')} narrow size="12">
                Circuiteer₀
              </ShowInfo>
            </Content>
          </Block>
          <Block>
            <Content>
              <ShowInfo
                label={t('ui:location')}
                narrow
                size="08"
                content="poo poo"
              >
                <Dropdown
                  id="asd"
                  value={locations.current}
                  choices={Object.values(locations.entities)}
                  onChange={e => {
                    update(setCurrent(e.target.value));
                  }}
                  renderChoice={({ item, i }) => (
                    <option value={item.id}>
                      {t(`game:location.${item.id}`)}
                    </option>
                  )}
                />
              </ShowInfo>
            </Content>
          </Block>
          <Block>
            <Flex center cross divide>
              <Block flex={1}>
                <Content>
                  <ShowInfo
                    {...number}
                    label={t('ui:efficiency.solar')}
                    content={locationEff.solar}
                  />
                </Content>
              </Block>
              <Block flex={1}>
                <Content>
                  <ShowInfo
                    {...number}
                    label={t('ui:efficiency.wind')}
                    content={locationEff.wind}
                  />
                </Content>
              </Block>
            </Flex>
          </Block>
          <Block>
            <Flex divide>
              <Block flex={1}>
                <Content>
                  <ShowInfo
                    {...number}
                    className="nowrap"
                    label={t('ui:production')}
                    content={t('ui:unit.perSec', {
                      value: pwr.sum.production.adjusted,
                    })}
                  />
                </Content>
              </Block>
              <Block flex={1}>
                <Content>
                  <ShowInfo
                    {...number}
                    className="nowrap"
                    label={t('ui:usage')}
                    content={`${pwr.sum.usage.adjusted} U/s`}
                  />
                </Content>
              </Block>
            </Flex>
          </Block>
        </Flex>
        <Block>
          <Content>
            <ShowInfo narrow label={t('ui:options')}>
              <ul className="space-y mt-03">
                {optionFlags.map(({ children, label, key }, i) => (
                  <li key={`option-${i}`}>
                    <Checkbox
                      invert
                      label={t(`ui:option.${label}`)}
                      checked={flags.flags[key]}
                      onChange={toggleFlag(key)}
                    />
                  </li>
                ))}
              </ul>
            </ShowInfo>
          </Content>
        </Block>
      </Flex>
    </div>
  );
}
