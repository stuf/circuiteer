import { Switch, Route } from 'react-router-dom';

import { BaseLayout } from 'layout';
import { Root } from './Root';
import { Page } from './Page';
import { Schema } from './Schema';

export function Docs(props) {
  const { match } = props;

  return (
    <BaseLayout>
      <pre>{JSON.stringify(match, null, 2)}</pre>

      <Switch>
        <Route path={`${match.path}`} exact component={Root} />
        <Route path={`${match.path}/schema`} component={Schema} />
        <Route path={`${match.path}/*`} component={Page} />
      </Switch>
    </BaseLayout>
  );
}
