import { Canvas } from 'components/Canvas';

export function MainView(props) {
  return (
    <main className="view">
      <Canvas />

      <div className="toolbar absolute bottom-right">
        <header>Modules</header>

        <div>
          <ul className="toolbar__items">
            <li>one</li>
            <li>two</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default MainView;
