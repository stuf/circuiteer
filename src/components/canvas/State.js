import { useTranslation } from 'react-i18next';
import { ShowInfo, Flex, Block, Content } from 'components/ui';

export function State(props) {
  const { t } = useTranslation();
  const { state = {} } = props;
  const { origin = {} } = state;

  return (
    <aside className="debug-state">
      <Flex divide>
        <Block>
          <Content>
            <ShowInfo
              label={t('ui:debug.action')}
              narrow
              size={'08'}
              content="none"
            >
              {state.action}
            </ShowInfo>
          </Content>
        </Block>
        <Block>
          <Content>
            <ShowInfo
              label={t('ui:debug.id')}
              narrow
              size={'08'}
              content="none"
            >
              {state.id}
            </ShowInfo>
          </Content>
        </Block>
        <Block>
          <Content>
            <ShowInfo label={t('ui:debug.origin')} narrow size="08">
              {origin.x ?? 0}, {origin.y ?? 0}
            </ShowInfo>
          </Content>
        </Block>
        <Block>
          <Content>
            <ShowInfo label={t('ui:debug.pos')} narrow size="08">
              {state.x}, {state.y}
            </ShowInfo>
          </Content>
        </Block>
        <Block>
          <Content>
            <ShowInfo label={t('ui:debug.size')} narrow size="08">
              {state.width} &times; {state.height}
            </ShowInfo>
          </Content>
        </Block>
      </Flex>
    </aside>
  );
}
