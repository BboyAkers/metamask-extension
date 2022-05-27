import React, { useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/button';
import Popover from '../../ui/popover';
import TextField from '../../ui/text-field';
import { ENVIRONMENT_TYPE_FULLSCREEN } from '../../../../shared/constants/app';
import { getEnvironmentType } from '../../../../app/scripts/lib/util';
import { isValidAddress } from 'ethereumjs-util';
import { providers } from 'ethers';
import { debounce } from 'lodash';

import { I18nContext } from '../../../contexts/i18n';
import { isValidDomainName } from '../../../helpers/utils/util';
import { isBurnAddress } from '../../../../shared/modules/hexstring-utils';

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
        {t('cancel')}
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
  const [ethereumAddressError, setEthereumAddressError] = useState('');
  const [memo, setMemo] = useState('');

  const validateAddress = async (address) => {
    const ethAddress = address.trim();
    const validEthAddress = isValidAddress(ethAddress);
    const validEnsAddress =
      isValidDomainName(ethAddress) && /\.eth$/u.test(ethAddress);

    if (validEthAddress) {
      if (isBurnAddress(ethAddress)) {
        setEthereumAddress(address);
        setEthereumAddressError(t('burnAddress'));
      } else {
        setEthereumAddress(address);
        setEthereumAddressError('');
      }
    } else if (validEnsAddress) {
      const provider = new providers.Web3Provider(global.ethereumProvider);
      try {
        const ensHexAddress = await provider.resolveName(ethAddress);
        setEthereumAddressError('');
        setEthereumAddress(ensHexAddress);
        setUsername((name) => name || ethAddress);
      } catch (error) {
        setEthereumAddressError(error.message);
      }
    } else {
      setEthereumAddressError(t('invalidAddress'));
      setEthereumAddress(address);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEthereumAddressChange = (event) => {
    validateAddress(event.target.value);
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const { isOpen } = props;
  return (
    <Popover footer={<AddNewContactPopoverFooter isOpen={isOpen} />}>
      <div className="add-new-contact-popover__container">
        <h2 className="add-new-contact-popover__header__title">
          {t('newContact')}
        </h2>
        <p className="add-new-contact-popover__header__subtitle">
          {t('newContactSubtitle')}
        </p>
        <form>
          <div className="add-new-contact-popover__group">
            <label className="address-book__view-contact__group__label">
              {t('userName')}
            </label>
            <TextField
              value={username}
              onChange={handleUsernameChange}
              placeholder={isFullScreen ? '' : t('userName')}
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
            {ethereumAddressError && (
              <div className="address-book__add-contact__error">
                {ethereumAddressError}
              </div>
            )}
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
