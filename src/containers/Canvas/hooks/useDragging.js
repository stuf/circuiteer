import * as L from 'partial.lenses';
// import { useState } from 'react';
import { useSelector } from 'react-redux';

// export function useDragging() {
//   const [width, height] = useSelector(L.get(['drag', 'size']));
//   const [state, setState] = useState({ pos: [0, 0] });
// }

export function useIsDragging() {
  const isDragging = useSelector(L.get(['drag', 'dragging']));
  return isDragging;
}

export function useDragSize() {
  const dragSize = useSelector(L.get(['drag', 'size']));
  return dragSize;
}
