import * as P from 'prop-types';
import { EntityObj } from 'common/proptypes';

function CanvasEntities(props) {
  return <></>;
}

export default CanvasEntities;

CanvasEntities.propTypes = {
  items: P.arrayOf(EntityObj),
};
