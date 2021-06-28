import clsx from 'clsx';

import { useGameLocations } from 'common/hooks/locations';
import { useOptionFlags } from 'common/hooks/options';
import { Checkbox, Block, Content, Flex } from 'components/ui';

function ShowInfo(props) {
  const { size = null, narrow, label, content, children } = props;

  return (
    <>
      <div className="font-02">{label}</div>
      <div
        className={clsx(
          size && `font-${size}`,
          'font-italic',
          narrow && 'font-narrow',
        )}
      >
        {children || content}
      </div>
    </>
  );
}

export function InfoPanel(props) {
  const locations = useGameLocations();
  const flags = useOptionFlags();

  const toggleFlag = name => () => flags.actions.toggleFlag(name);

  const number = { narrow: true, size: '08' };

  return (
    <div className="info-panel">
      <Flex divide>
        <Flex vertical center main divide>
          <Block>
            <Content>
              <ShowInfo label="Name" narrow size="12">
                Circuiteer<sub>&eta;</sub>
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
                    content="175%"
                  />
                </Content>
              </Block>
              <Block flex={1}>
                <Content>
                  <ShowInfo {...number} label="Wind efficiency" content="75%" />
                </Content>
              </Block>
            </Flex>
          </Block>
          <Block>
            <Flex center cross divide>
              <Block flex={1}>
                <Content>
                  <ShowInfo {...number} label="Production" content="12 U/s" />
                </Content>
              </Block>
              <Block flex={1}>
                <Content>
                  <ShowInfo {...number} label="Usage" content="10 U/s" />
                </Content>
              </Block>
            </Flex>
          </Block>
        </Flex>
        <Block>
          <Content>
            <ShowInfo narrow label="Options">
              <ul className="space-y mt-03">
                <li>
                  <Checkbox
                    invert
                    label="Location efficiency"
                    checked={flags.flags.locationEfficiency}
                    onChange={toggleFlag('locationEfficiency')}
                  />
                </li>
                <li>
                  <Checkbox
                    invert
                    label="Power breakdown"
                    checked={flags.flags.powerBreakdown}
                    onChange={toggleFlag('powerBreakdown')}
                  />
                </li>
                <li>
                  <Checkbox
                    invert
                    label="State debug"
                    checked={flags.flags.stateDebug}
                    onChange={toggleFlag('stateDebug')}
                  />
                </li>
              </ul>
            </ShowInfo>
          </Content>
        </Block>
      </Flex>
    </div>
  );
}
