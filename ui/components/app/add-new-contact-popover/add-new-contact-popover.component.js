import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/button';
import Popover from '../../ui/popover';

const AddNewContactPopoverFooter = (props) => {
  const { isOpen } = props;
  return (
    <>
      <Button
        type="secondary"
        className="page-container__footer-button"
        onClick={(e) => {
          e.preventDefault();
          isOpen(false);
        }}
        rounded
      >
        Cancel
      </Button>
      <Button
        type="confirm"
        className="page-container__footer-button"
        onClick={(e) => {
          e.preventDefault();
          isOpen(false);
        }}
        rounded
      >
        Save
      </Button>
    </>
  );
};

const AddNewContactPopover = (props) => {
  const { isOpen } = props;
  return (
    <Popover footer={<AddNewContactPopoverFooter isOpen={isOpen} />}>
      <h1>Test Add New Contact Popover</h1>
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
