import { useMemo } from 'react';
import EntityObject from './EntityObject';

function CanvasContent(props) {
  const { entities } = props;

  const xs = useMemo(
    () => entities.map(it => <EntityObject key={it.id} item={it} />),
    [entities],
  );

  return <>{xs}</>;
}

export default CanvasContent;
