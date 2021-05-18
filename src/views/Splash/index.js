import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as L from 'partial.lenses';

import { Logo } from './Logo';
import { BuildInfo } from 'components/misc';

export function Splash(props) {
  const history = useHistory();
  const splash = useSelector(L.get(['application', 'splash']));

  const appName = process.env.REACT_APP_appName;

  useEffect(() => {
    const id = setTimeout(() => {
      history.replace('/editor');
    }, splash.delay);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <>
      <BuildInfo />
      <div className="h-full w-full relative text-center">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col space-y-4">
            <Logo className="w-64" />
            <div>{appName}</div>
          </div>
        </div>
      </div>
    </>
  );
}
