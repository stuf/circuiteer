import * as P from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'components';

import schema from 'schema/app/import.json';
import { SchemaForm } from './components/SchemaForm';
import { useModal } from 'common/hooks';

export function ImportModal(props) {
  const { open = false } = props;
  const { t } = useTranslation();
  const { visible, hide, show } = useModal('import');

  return (
    <Modal title={t('ui:modal.import.title')} open={open} onClose={hide}>
      <div>
        Data must conform to an import schema. They are available{' '}
        <a href="help/schema">here</a>.
      </div>

      <SchemaForm schema={schema} />

      <footer className="text-right">
        <Button onClick={() => {}} icon="upload">
          {t('common:import')}
        </Button>
      </footer>
    </Modal>
  );
}

ImportModal.propTypes = {
  open: P.bool,
};
