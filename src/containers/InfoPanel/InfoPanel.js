import { useGameLocations } from 'common/hooks/locations';
import { useOptionFlags } from 'common/hooks/options';
import { usePowerBreakdown } from 'common/hooks/derived';
import { ShowInfo, Checkbox, Block, Content, Flex } from 'components/ui';

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
  const { power } = props;

  const solarBonus =
    (power.breakdown.solar?.adjusted ?? 0) - (power.breakdown.solar?.raw ?? 0);
  const windBonus =
    (power.breakdown.wind?.adjusted ?? 0) - (power.breakdown.wind?.raw ?? 0);

  return (
    <Flex vertical>
      <Block>
        <Content>
          <ShowInfo label="powerBreakdown" narrow>
            <dl>
              {power.breakdown.constant && (
                <>
                  <dt>constant</dt>
                  <dd>{withSign(power.breakdown.constant?.adjusted)}</dd>
                </>
              )}

              {power.breakdown.solar && (
                <>
                  <dt>solar</dt>
                  <dd>{withSign(power.breakdown.solar?.adjusted)}</dd>
                </>
              )}

              {power.breakdown.wind && (
                <>
                  <dt>wind</dt>
                  <dd>{withSign(power.breakdown.wind?.adjusted)}</dd>
                </>
              )}

              {power.breakdown.powered && (
                <>
                  <dt>powered</dt>
                  <dd>{withSign(power.breakdown.powered?.adjusted)}</dd>
                </>
              )}

              <hr />
              <dt>location adj.</dt>
              <dd></dd>

              <dt>solar</dt>
              <dd>{withSign(solarBonus)}</dd>

              <dt>wind</dt>
              <dd>{withSign(windBonus)}</dd>

              <hr />

              <dt>production</dt>
              <dd>{withSign(power.sum.production.adjusted)}</dd>

              <dt>usage</dt>
              <dd>{withSign(power.sum.usage.adjusted)}</dd>

              <hr />

              <dt>sum</dt>
              <dd>
                {withSign(
                  power.sum.production.adjusted + power.sum.usage.adjusted,
                )}
              </dd>
            </dl>
          </ShowInfo>
        </Content>
      </Block>
    </Flex>
  );
}

export function InfoPanel(props) {
  const locations = useGameLocations();
  const flags = useOptionFlags();

  const currentLocation = locations.entities[locations.current];
  const pwr = usePowerBreakdown();
  console.log(show({ pwr }));

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
              <ShowInfo label="Name" narrow size="12">
                Circuiteer<sub>&omega;</sub>
              </ShowInfo>
            </Content>
          </Block>
          <Block>
            <Content>
              <ShowInfo label="Location" narrow size="08" content="poo poo">
                {locations.current}
              </ShowInfo>
            </Content>
          </Block>
          <Block>
            <Flex center cross divide>
              <Block flex={1}>
                <Content>
                  <ShowInfo
                    {...number}
                    label="Solar efficiency"
                    content={locationEff.solar}
                  />
                </Content>
              </Block>
              <Block flex={1}>
                <Content>
                  <ShowInfo
                    {...number}
                    label="Wind efficiency"
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
                    label="Production"
                    content={`${pwr.sum.production.adjusted} U/s`}
                  />
                </Content>
              </Block>
              <Block flex={1}>
                <Content>
                  <ShowInfo
                    {...number}
                    className="nowrap"
                    label="Usage"
                    content={`${pwr.sum.usage.adjusted} U/s`}
                  />
                </Content>
              </Block>
            </Flex>
          </Block>
        </Flex>
        <Block>
          <Content>
            <ShowInfo narrow label="Options">
              <ul className="space-y mt-03">
                {optionFlags.map(({ label, key }, i) => (
                  <li key={`option-${i}`}>
                    <Checkbox
                      invert
                      label={label}
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
