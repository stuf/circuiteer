export function Root(props) {
  return (
    <div>
      <h1>Root</h1>
      {JSON.stringify(props.match)}
    </div>
  );
}
