import { useTranslation } from 'react-i18next';
import { Button } from 'components';
import { useModal } from 'common/hooks';

const noop = () => {};

export function Toolbar() {
  const { t } = useTranslation();
  const importModal = useModal('import');
  const exportModal = useModal('export');

  return (
    <>
      <ul
        id="canvas-toolbar"
        role="menu"
        aria-label={t('ui:toolbar.canvas.label')}
        className="flex items-stretch space-x-1"
      >
        <li role="menuitem">
          <Button
            label={t('ui:button.power.label')}
            icon="bolt"
            onClick={noop}
            disabled
            pressed
          >
            {t('ui:button.power.body')}
          </Button>
        </li>

        <li role="separator" className="relative border-r-2 border-dashed" />

        <li role="menuitem">
          <Button
            label={t('ui:button.import.label')}
            icon="file_upload"
            pressed={importModal.visible}
            onClick={importModal.show}
          >
            {t('ui:button.import.body')}
          </Button>
        </li>

        <li role="menuitem">
          <Button
            label={t('ui:button.export.label')}
            icon="file_download"
            pressed={exportModal.visible}
            onClick={exportModal.show}
          >
            {t('ui:button.export.body')}
          </Button>
        </li>
      </ul>
    </>
  );
}
