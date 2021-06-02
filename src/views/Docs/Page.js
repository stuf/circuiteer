import * as L from 'partial.lenses';
import { Markdown } from 'components/Markdown';

import { Switch, Route } from 'react-router-dom';

import * as docs from 'docs';

export function Page(props) {
  const { path, url } = props.match;

  const file = L.get([L.log(), L.pointer(url)], { docs });

  return (
    <div className="prose mx-auto mt-6 pt-6">
      <pre>{JSON.stringify({ a: props.match, file }, null, 2)}</pre>
      <Switch>
        <Route path={`${path}/schema`} render={() => <div>schema</div>} />
        <Route path={`${path}`} render={() => <Markdown text={file} />} />
      </Switch>
    </div>
  );
}
