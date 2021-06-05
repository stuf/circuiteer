import * as P from 'prop-types';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'components';

import schema from 'schema/app/import.json';
import { SchemaForm } from './components/SchemaForm';
import { useModal } from 'common/hooks';
import { debounce, actions } from 'common/util';

export function ImportModal(props) {
  const { open = false } = props;
  const { t } = useTranslation();
  const { visible, hide, show } = useModal('import');
  const [state, setState] = useState({
    data: {
      version: '0.1.0',
      entities: [],
    },
    errors: [],
  });

  const onChange = ({ data, errors }) => {
    console.log('importModal onChange', { data, errors });
    setState({ data, errors });
  };

  const onChangeFn = useCallback(e => actions(debounce(onChange, 100))(e), []);

  return (
    <Modal title={t('ui:modal.import.title')} open={open} onClose={hide}>
      <div>
        Data must conform to an import schema. They are available{' '}
        <a href="help/schema">here</a>.
      </div>

      <SchemaForm schemaName="import" data={state.data} onChange={onChangeFn} />

      <footer className="text-right">
        <Button
          onClick={() => {}}
          icon="upload"
          disabled={!!state.errors.length}
        >
          {t('common:import')}
        </Button>
      </footer>
    </Modal>
  );
}

ImportModal.propTypes = {
  open: P.bool,
};
