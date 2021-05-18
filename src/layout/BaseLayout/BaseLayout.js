import { Header } from './components';

export function BaseLayout(props) {
  const { children } = props;

  return (
    <main
      className={`
    h-full
    flex flex-col
    `}
    >
      <Header
        className={`
         h-12
      `}
      >
        <div className="space-x-1"></div>
      </Header>

      {/* Main content area */}
      <div
        className={`
        flex-grow
        overflow-auto
      `}
      >
        {children}
      </div>
    </main>
  );
}
