import * as P from 'prop-types';
import { useTranslation } from 'react-i18next';

export function Ghost(props) {
  const { t } = useTranslation();
  const { pos, size, id } = props;

  return (
    <div
      className="ghost"
      style={{
        width: size.width,
        height: size.height,
        transform: `translateX(${pos.x}px) translateY(${pos.y}px)`,
      }}
    >
      {t(`game:entity.${id}`)}
    </div>
  );
}

Ghost.propTypes = {
  pos: P.exact({
    x: P.number,
    y: P.number,
  }).isRequired,
  size: P.exact({
    width: P.number,
    height: P.number,
  }).isRequired,
  id: P.string.isRequired,
};
