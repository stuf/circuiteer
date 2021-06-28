import { useDispatch } from 'react-redux';

import { useAppState } from 'common/hooks/app';
import { toggleMenu } from 'state/app';

export function MenuToggle(props) {
  const update = useDispatch();
  const toggle = () => update(toggleMenu());
  const as = useAppState();

  return (
    <div className="menu-toggle">
      {!as.flags.menuVisible && (
        <button className="menu-toggle__button" onClick={toggle}>
          <svg width={12} height={12} viewBox="0 0 24 24">
            <g className="fill-light">
              <polygon points="0,0 24,0 24,4 0,4" />
              <polygon points="0,10 24,10 24,14 0,14" />
              <polygon points="0,20 24,20 24,24 0,24" />
            </g>
          </svg>
        </button>
      )}
    </div>
  );
}
