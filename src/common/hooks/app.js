import * as R from 'ramda';
import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';

import { toggleMenu } from 'state/app';

/**
 *
 * @returns {Hooks.App.UseAppStateHook}
 */
export function useAppState() {
  const update = useDispatch();
  const app = useSelector(L.get(['app', L.props('menu')]));

  return {
    flags: {
      menuVisible: app.menu.visible,
    },
    actions: {
      toggleMenu: R.compose(update, toggleMenu),
    },
  };
}
