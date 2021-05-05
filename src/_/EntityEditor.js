import { useSelector, useDispatch } from 'react-redux';
import * as L from 'partial.lenses';
import Toggle from './Toggle';
import { toggleEntity } from 'state/editor';

function EntityEditor(props) {
  const update = useDispatch();

  const currentId = useSelector(L.get(['editor', 'current']));
  const current = useSelector(
    L.get(['editor', 'entities', L.find(o => o.id === currentId)]),
  );

  return (
    <>
      <div className="px-4 py-2">
        <section>
          <header className="font-bold">{currentId}</header>

          <div className="space-y-2">
            <div>
              <Toggle
                checked={current.enabled}
                label="Enabled"
                onChange={() => {
                  update(toggleEntity({ id: currentId }));
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default EntityEditor;
