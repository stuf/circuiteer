export function State(props) {
  const { state = {} } = props;

  return (
    <aside className="debug-state">
      <dl>
        <dt>Action</dt>
        <dd>{state.action ?? 'none'}</dd>

        <dt>ID</dt>
        <dd>{state.id ?? 'none'}</dd>

        <dt>Position</dt>
        <dd>
          {state.x}, {state.y}
        </dd>

        <dt>Size</dt>
        <dd>
          {state.width} &times; {state.height}
        </dd>
      </dl>
    </aside>
  );
}
