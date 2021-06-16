import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { Button, Group, Input, Modal } from 'components';
import { hideModal } from 'state/modal';
import { peekInFade } from 'common/motion';
import { useModal } from 'common/hooks';

export function ExportModal(props) {
  const { open = false } = props;
  const update = useDispatch();
  const editor = useSelector(s => s.editor);
  const { t } = useTranslation();
  const [state, setState] = useState({ copied: false });
  const timer = useRef(null);
  const ref = useRef(null);
  const { hide } = useModal('export');

  const exportableData = {
    version: '0.1.0',
    entities: editor.entities,
  };

  // TODO Use `useTimeout` hook instead
  useEffect(() => {
    if (state.copied) {
      timer.current = setTimeout(() => {
        setState(s => ({ ...s, copied: false }));
      }, 2500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [state.copied]);

  /**
   * Copy the textarea's content to clipboard
   */
  function copyContent() {
    ref.current.select();
    document.execCommand('copy');
    setState(s => ({ ...s, copied: true }));
  }

  return (
    <Modal title={t('ui:modal.export.title')} open={open} onClose={hide}>
      <Group title="Editor state" className="relative">
        <div>{t('ui:modal.export.explanationText')}</div>
        <div className="relative">
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            <AnimatePresence>
              {/* Extract motion stuff to a reusable location */}
              {state.copied && (
                <motion.div
                  variants={peekInFade}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.25 }}
                  className="bg-white px-4 py-2 shadow-md rounded-md border-2"
                >
                  {t('common:copiedToClipboard')}
                </motion.div>
              )}
            </AnimatePresence>

            <Button onClick={copyContent} icon="content_copy">
              {t('common:copy')}
            </Button>
          </div>

          <Input
            id="state-export"
            className="text-xs"
            type="textarea"
            rows={15}
            ref={ref}
            readOnly
            value={JSON.stringify(exportableData, null, 2)}
          />
        </div>
      </Group>

      <footer className="mt-4">
        <Button onClick={() => update(hideModal('export'))}>Close</Button>
      </footer>
    </Modal>
  );
}
