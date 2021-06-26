export function Ghost(props) {
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
      {id}
    </div>
  );
}
