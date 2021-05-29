import * as P from 'prop-types';
import { Header } from './components';

export function BaseLayout(props) {
  const { children, header } = props;

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
        {header && <div className="space-x-1">{header}</div>}
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

BaseLayout.propTypes = {
  children: P.oneOfType([P.node, P.elementType, P.string]),
  header: P.oneOfType([P.node, P.elementType, P.string]),
};
