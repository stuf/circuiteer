import * as P from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { toggleFlag } from 'state/options';
import { Modal, Toggle, Button, Group, Input } from 'components';

import './Settings.css';
import { setGridSize, toggleGrid } from 'state/grid';

export function SettingsModal(props) {
  const flags = useSelector(s => s.options.flags);
  const grid = useSelector(s => s.grid);
  const update = useDispatch();
  const { open = false } = props;
  const { t } = useTranslation();

  return (
    <Modal
      title={t('ui:modal.settings.title')}
      open={open}
      className="modal--settings"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <Group title={t('ui:section.settings.grid')}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="grid-width"
                label={t('common:width')}
                type="number"
                value={grid.size[0]}
                onChange={e =>
                  update(setGridSize([+e.target.value, grid.size[1]]))
                }
              />
              <Input
                id="grid-height"
                label={t('common:height')}
                type="number"
                value={grid.size[1]}
                onChange={e =>
                  update(setGridSize([grid.size[0], +e.target.value]))
                }
              />
            </div>

            <Toggle
              label={t('ui:option.showGrid.name')}
              help={t('ui:option.showGrid.help')}
              checked={grid.show}
              onChange={() => update(toggleGrid())}
            />
          </Group>

          <Group title={t('ui:section.settings.application')}>
            <Toggle
              label={t('ui:option.persistEditorState.name')}
              help={t('ui:option.persistEditorState.help')}
              checked={false}
              disabled
            />
          </Group>
        </div>

        <Group title="Options">
          <div className="space-y-2">
            {Object.entries(flags).map(([k, v], i) => (
              <div key={i}>
                <Toggle
                  label={t(`ui:option.${k}.name`)}
                  help={t(`ui:option.${k}.help`)}
                  checked={v}
                  onChange={() => update(toggleFlag(k))}
                />
              </div>
            ))}
          </div>
        </Group>
      </div>

      <footer className="mt-4 pt-4 text-right">
        {/* TODO Add closing logic */}
        <Button onClick={() => {}}>{t('common:close')}</Button>
      </footer>
    </Modal>
  );
}

SettingsModal.propTypes = {
  open: P.bool,
};
