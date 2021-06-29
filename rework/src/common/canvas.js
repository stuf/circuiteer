/**
 * @param {Data.PopulatedCanvasObject} obj
 */
export const getCanvasObjectStyle = obj => {
  const size = obj.entity.size;
  const pos = obj.pos;
  const transform = `translateX(${pos.x}px) translateY(${pos.y}px)`;

  return {
    width: size.width,
    height: size.height,
    transform,
  };
};
