export function State(props) {
  const { state = {} } = props;
  const { origin = {} } = state;

  return (
    <aside className="debug-state">
      <dl>
        <dt>Action</dt>
        <dd className="font-narrow">{state.action ?? 'none'}</dd>

        <dt>ID</dt>
        <dd className="font-narrow">{state.id ?? 'none'}</dd>

        <dt>Position</dt>
        <dd className="font-narrow">
          {origin.x && origin.y && (
            <>
              {origin.x}, {origin.y}
              <br />
            </>
          )}
          {state.x}, {state.y}
        </dd>

        <dt>Size</dt>
        <dd className="font-narrow">
          {state.width} &times; {state.height}
        </dd>
      </dl>
    </aside>
  );
}
