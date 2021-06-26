import { Tier } from 'common/constants';

/**
 *
 * @param {React.DragEvent<HTMLDivElement>} e
 * @param {Data.GameEntityObject} o
 */
// eslint-disable-next-line
const onDragStart = (e, o, fn) => {
  e.dataTransfer.setData('application/json', JSON.stringify(o));
  e.dataTransfer.dropEffect = 'copy';
  fn(o);
};

/**
 *
 * @param {import('components/canvas/EntityPalette').Props} props
 * @returns
 */
export function EntityPalette(props) {
  const { gameObjects, actions } = props;

  const objects = Object.values(gameObjects.entities);

  const uneven = objects.length % 2 === 1;

  return (
    <div className="entity-palette">
      <header className="entity-palette__head">Modules</header>

      <div className="entity-palette__list">
        {objects.map((o, i) => (
          <div
            key={i}
            className="entity-palette__list-item"
            onClick={e => {
              actions.onAddNewEntity(o);
            }}
          >
            {o.id}
            <div className="entity-palette__list-item-stats">
              <span>{o.power}</span>
              <span>{Tier[o.tier]}</span>
            </div>
          </div>
        ))}
        {uneven && <div className="entity-palette__list-item" />}
      </div>
    </div>
  );
}
