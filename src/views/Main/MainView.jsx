import {
  AutosizeCanvasElement,
  InfoPanel,
  Menu,
  MenuToggle,
  EntityPalette,
} from 'containers';
import { Patterns } from 'components/svg';

import { getLogger } from 'common/logger';

import { useNormalizedGameObjects } from 'common/hooks/derived';

import { useCanvasState } from 'common/hooks/canvas';

const logger = getLogger('app'); // eslint-disable-line

export function MainView() {
  const canvasState = useCanvasState();

  const gameObjects = useNormalizedGameObjects();

  return (
    <main className="view">
      <Patterns />
      <AutosizeCanvasElement />
      <InfoPanel />
      <EntityPalette
        isAdding={canvasState.flags.isAddingNew}
        gameObjects={gameObjects}
        isCurrentlyAdding={false}
      />

      <MenuToggle />
      <Menu />
    </main>
  );
}

export default MainView;
