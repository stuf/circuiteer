import './AppHeader.css';

export function AppHeader() {
  return (
    <>
      <header className="app-header">
        <div className="app-header__brand">
          <div>Circuiteer</div>
          <div className="text-xxs font-normal pl-2">Experimental</div>
        </div>

        <nav className="app-header__menu">
          <ul>
            <li>Settings</li>

            <li>Options</li>

            <li>Game</li>
          </ul>
        </nav>
      </header>
    </>
  );
}
