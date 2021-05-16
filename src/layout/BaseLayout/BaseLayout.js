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
        <div className="space-x-1">
          <button
            className={`
          bg-purple-500
          text-white
          px-2 py-1
          rounded-lg
          `}
          >
            Thing 1
          </button>
        </div>
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
