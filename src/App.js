import { AutosizeCanvas } from 'containers/Canvas/index';
import { Sidebar, Infobar } from 'containers';
import { BaseLayout } from 'layout';

function App() {
  return (
    <BaseLayout>
      <div className="flex h-full relative">
        <div className="flex-1 flex flex-col">
          <Infobar />

          <div className="flex-1 relative">
            <AutosizeCanvas />
          </div>
        </div>
        <div className="border-l-2 w-72 divide-y-2 h-full overflow-auto">
          <Sidebar />
        </div>
      </div>
    </BaseLayout>
  );
}

export default App;
