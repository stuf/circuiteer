const sequence = [
  // Default starting action
  { action: null, x: 0, y: 0, width: 0, height: 0 },

  // We start dragging an element, set action, position and size of element being
  // dragged.
  { action: 'drag', x: 100, y: 100, width: 100, height: 100 },

  // While dragging, we update the state in the same way as if starting a drag,
  // we just update the position and possibly size
  { action: 'drag', x: 120, y: 120, width: 100, height: 100 },

  // We've finished dragging, reset the state
  { action: null, x: 0, y: 0, width: 0, height: 0 },
];
