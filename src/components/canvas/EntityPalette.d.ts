import { FunctionComponent } from 'react';

export interface Props {
  gameObjects: Hooks.GameEntities.UseGameEntitiesHook;
  actions: {
    onModulePaletteDragStart: Callback.Drag.OnExternalDrag;
  };
}

export const EntityPalette: FunctionComponent<Props>;
