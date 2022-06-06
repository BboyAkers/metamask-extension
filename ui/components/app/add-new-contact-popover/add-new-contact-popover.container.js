import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToAddressBook } from '../../../store/actions';
import AddNewContactPopover from './add-new-contact-popover.component';

const mapDispatchToProps = (dispatch) => {
  return {
    addToAddressBook: (recipient, nickname, memo) =>
      dispatch(addToAddressBook(recipient, nickname, memo)),
  };
};

export default compose(
  withRouter,
  connect(mapDispatchToProps),
)(AddNewContactPopover);
