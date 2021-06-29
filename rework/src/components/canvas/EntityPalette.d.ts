import { FunctionComponent } from 'react';

export interface Props {
  gameObjects: Hooks.GameEntities.UseGameEntitiesHook;
  isCurrentlyAdding: boolean;
  actions: {
    onAddNewEntity: Callback.Entity.AddNew;
  };
}

export const EntityPalette: FunctionComponent<Props>;
