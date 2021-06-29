import { ShowInfo, Flex, Block, Content } from 'components/ui';

export function State(props) {
  const { state = {} } = props;
  const { origin = {} } = state;

  return (
    <aside className="debug-state">
      <Flex divide vertical>
        <Block>
          <Content>
            <ShowInfo label="action" narrow size={'08'} content="none">
              {state.action}
            </ShowInfo>
          </Content>
        </Block>
        <Block>
          <Content>
            <ShowInfo label="id" narrow size={'08'} content="none">
              {state.id}
            </ShowInfo>
          </Content>
        </Block>
        <Block>
          <Content>
            <ShowInfo label="origin" narrow size="08">
              {origin.x ?? 0}, {origin.y ?? 0}
            </ShowInfo>
          </Content>
        </Block>
        <Block>
          <Content>
            <ShowInfo label="pos" narrow size="08">
              {state.x}, {state.y}
            </ShowInfo>
          </Content>
        </Block>
        <Block>
          <Content>
            <ShowInfo label="size" narrow size="08">
              {state.width} &times; {state.height}
            </ShowInfo>
          </Content>
        </Block>
      </Flex>
    </aside>
  );
}
