import * as P from 'prop-types';
import { Modal, Toggle, Button } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toggleFlag } from 'state/options';
import { useModal } from 'common/hooks';

export function OptionsModal(props) {
  const flags = useSelector(s => s.options.flags);
  const update = useDispatch();
  const { open = false } = props;
  const { t } = useTranslation();
  const { hide } = useModal('options');

  return (
    <Modal title={t('ui:modal.options.title')} open={open} onClose={hide}>
      <div className="space-y-2">
        {Object.entries(flags).map(([k, v], i) => (
          <Toggle
            key={i}
            label={t(`ui:option.${k}`)}
            checked={v}
            onChange={() => update(toggleFlag(k))}
          />
        ))}
      </div>

      <footer className="mt-4 pt-4 text-right">
        <Button onClick={() => {}}>Close</Button>
      </footer>
    </Modal>
  );
}

OptionsModal.propTypes = {
  open: P.bool,
};
