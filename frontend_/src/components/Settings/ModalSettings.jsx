import { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
} from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import LanguageSelector from '../Shared/LangSelector';
import { useTranslation } from 'react-i18next';

const ModalSettings = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className="flex items-center hover:text-blue-500 transition-colors"
        onClick={openModal}
        type="button"
      >
        <FontAwesomeIcon icon={faGear} />
      </button>
      <Dialog handler={closeModal} open={isOpen}>
        <DialogHeader>{t('settings')}</DialogHeader>
        <DialogBody>
          <Card className="p-4">
            <LanguageSelector />
          </Card>
        </DialogBody>
        <DialogFooter>
          <button
            className="btn btn-primary"
            onClick={closeModal}
            type="button"
          >
            Close
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalSettings;
