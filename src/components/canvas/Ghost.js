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
