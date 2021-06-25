/**
 * @param {object} props
 * @param {Data.PopulatedCanvasObject} props.object
 */
export function Entity(props) {
  const { object } = props;

  return (
    <div className="entity">
      <div className="entity__label">{object.entity?.id}</div>
      <div className="entity__stats">{object.entity?.power} U/s</div>
      <div className="entity__power-type">{object.entity?.powerType}</div>
    </div>
  );
}
