import { BaseLayout } from 'layout';
import { BuildInfo } from 'components/misc';
import { Infobar, Sidebar, AutosizeCanvas } from 'containers';

export function Editor() {
  return (
    <BaseLayout>
      <section className="flex h-full">
        <section className="flex flex-col flex-grow">
          <Infobar />

          <div className="relative h-full">
            <AutosizeCanvas className="h-full" />
          </div>
        </section>

        <Sidebar className="w-72 border-l-2 overflow-auto" />
      </section>

      <BuildInfo />
    </BaseLayout>
  );
}
