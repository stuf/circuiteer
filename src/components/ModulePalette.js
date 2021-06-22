import clsx from 'clsx';

const modules = [
  {
    id: 'one',
    label: 'One',
    size: { width: 64, height: 64 },
    tier: 2,
  },
  {
    id: 'two',
    label: 'Two',
    size: { width: 64, height: 64 },
    tier: 2,
  },
  {
    id: 'three',
    label: 'Three',
    size: { width: 128, height: 128 },
    tier: 3,
  },
];

export function ModulePalette(props) {
  const { className } = props;

  const cns = {
    root: ['module-palette', className],
    items: ['module-palette__items'],
  };

  return (
    <div className={clsx(cns.root)}>
      <header>Modules</header>

      <div>
        <ul className={clsx(cns.items)}>
          {modules.map((m, mi) => {
            return (
              <li key={`item-${mi}`} draggable onDragStart={() => {}}>
                {m.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ModulePalette;
