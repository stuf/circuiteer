import * as L from 'partial.lenses';
import { useSelector } from 'react-redux';

/**
 * @return {Hooks.Canvas.UseCanvasStateHook}
 */
export function useCanvasState() {
  const { adding, drag, external } = useSelector(
    L.get([
      'canvas',
      L.pickIn({
        adding: L.valueOr(null),
        drag: L.valueOr(null),
        external: L.valueOr(null),
      }),
    ]),
  );

  const flags = {
    isAddingNew: !!adding,
    isDragging: !!drag,
    isAddingExternal: !!external,
  };

  return {
    adding,
    drag,
    external,
    flags,
  };
}
