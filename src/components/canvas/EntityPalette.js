import { Tier } from 'common/constants';

/**
 *
 * @param {import('components/canvas/EntityPalette').Props} props
 * @returns
 */
export function EntityPalette(props) {
  const { gameObjects, actions } = props;

  const objects = Object.values(gameObjects.entities);

  return (
    <div className="entity-palette">
      <header className="entity-palette__head">Modules</header>

      <div className="entity-palette__list">
        {objects.map((o, i) => (
          <div
            key={i}
            className="entity-palette__list-item"
            draggable
            onDragStart={e => {
              e.dataTransfer.setData('application/json', JSON.stringify(o));
              actions.onModulePaletteDragStart(o);
            }}
          >
            {o.id}
            <div className="entity-palette__list-item-stats">
              <span>{o.power}</span>
              <span>{Tier[o.tier]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
