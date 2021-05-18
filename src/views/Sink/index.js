import { BaseLayout } from 'layout';

import { Button } from 'components';

export function Sink() {
  return (
    <BaseLayout>
      <section className="px-4 py-2">
        <fieldset className="space-y-2">
          <legend>Buttons</legend>

          <div className="space-x-2">
            <Button label="Default" size="lg" />
            <Button label="Secondary" type="secondary" size="lg" />
            <Button label="Disabled" disabled size="lg" />
            <Button label="Disabled" disabled type="secondary" size="lg" />
          </div>

          <div className="space-x-2">
            <Button label="Default" />
            <Button label="Secondary" type="secondary" />
            <Button label="Disabled" disabled />
            <Button label="Disabled" disabled type="secondary" />
          </div>

          <div className="space-x-2">
            <Button label="Default" size="sm" />
            <Button label="Secondary" type="secondary" size="sm" />
            <Button label="Disabled" disabled size="sm" />
            <Button label="Disabled" disabled type="secondary" size="sm" />
          </div>
        </fieldset>
      </section>
    </BaseLayout>
  );
}
