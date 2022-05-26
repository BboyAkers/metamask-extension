import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/button';
import Popover from '../../ui/popover';
import TextField from '../../ui/text-field';
import { ENVIRONMENT_TYPE_FULLSCREEN } from '../../../../shared/constants/app';
import { getEnvironmentType } from '../../../../app/scripts/lib/util';

import { I18nContext } from '../../../contexts/i18n';

const environmentType = getEnvironmentType();

const isFullScreen = environmentType === ENVIRONMENT_TYPE_FULLSCREEN;

const AddNewContactPopoverFooter = (props) => {
  const t = useContext(I18nContext);
  const { isOpen } = props;
  return (
    <>
      <Button
        type="secondary"
        className="update-nickname__cancel"
        onClick={(e) => {
          e.preventDefault();
          isOpen(false);
        }}
        rounded
      >
        {t('canel')}
      </Button>
      <Button
        type="primary"
        className="update-nickname__save"
        onClick={(e) => {
          e.preventDefault();
          isOpen(false);
        }}
        rounded
      >
        {t('save')}
      </Button>
    </>
  );
};

const AddNewContactPopover = (props) => {
  const t = useContext(I18nContext);

  const [username, setUsername] = useState('');
  const [ethereumAddress, setEthereumAddress] = useState('');
  const [memo, setMemo] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEthereumAddressChange = (event) => {
    setEthereumAddress(event.target.value);
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  }

  const { isOpen } = props;
  return (
    <Popover footer={<AddNewContactPopoverFooter isOpen={isOpen} />}>
      <div className="add-new-contact-popover__container">
        <h2 className="add-new-contact-popover__header__title">{t('newContact')}</h2>
        <p className="add-new-contact-popover__header__subtitle">Enter contact details.</p>
        <form>
          <div className="add-new-contact-popover__group">
            <label className="address-book__view-contact__group__label">
              {t('username')}
            </label>
            <TextField
              value={username}
              onChange={handleUsernameChange}
              placeholder={isFullScreen ? '' : t('username')}
            />
          </div>

          <div className="add-new-contact-popover__group">
            <label className="address-book__view-contact__group__label">
              {t('addAnEthereumAddress')}
            </label>
            <TextField
              value={ethereumAddress}
              onChange={handleEthereumAddressChange}
              placeholder={isFullScreen ? '' : t('addAnEthereumAddress')}
            />
          </div>

          <div className="add-new-contact-popover__group">
            <label className="address-book__view-contact__group__label">
              {t('addMemo')}
            </label>
            <textarea
              value={memo}
              onChange={handleMemoChange}
              placeholder={isFullScreen ? '' : t('addMemo')}
            />
          </div>
        </form>
      </div>
    </Popover>
  );
};

AddNewContactPopoverFooter.propTypes = {
  isOpen: PropTypes.func,
};
AddNewContactPopover.propTypes = {
  isOpen: PropTypes.func,
};

export default AddNewContactPopover;
