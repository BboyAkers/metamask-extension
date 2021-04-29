import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ContactList from '../../../components/app/contact-list';
import { showModal } from '../../../store/actions';
import {
  CONTACT_ADD_ROUTE,
  CONTACT_VIEW_ROUTE,
} from '../../../helpers/constants/routes';
import EditContact from './edit-contact';
import AddContact from './add-contact';
import ViewContact from './view-contact';

function AddressBookAddButton(props) {
  const { label } = props;
  const dispatch = useDispatch();

  return (
    <div
      className="address-book-add-button__button button btn-secondary btn--rounded"
      onClick={() => {
        dispatch(showModal({ name: 'DEPOSIT_ETHER' }));
      }}
    >
      <p>{label}</p>
    </div>
  );
}

export default class ContactListTab extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    addressBook: PropTypes.array,
    history: PropTypes.object,
    selectedAddress: PropTypes.string,
    viewingContact: PropTypes.bool,
    editingContact: PropTypes.bool,
    addingContact: PropTypes.bool,
    showContactContent: PropTypes.bool,
    hideAddressBook: PropTypes.bool,
  };

  renderAddresses() {
    const { addressBook, history, selectedAddress } = this.props;
    const contacts = addressBook.filter(({ name }) => Boolean(name));
    const nonContacts = addressBook.filter(({ name }) => !name);

    return (
      <div>
        <ContactList
          searchForContacts={() => contacts}
          searchForRecents={() => nonContacts}
          selectRecipient={(address) => {
            history.push(`${CONTACT_VIEW_ROUTE}/${address}`);
          }}
          selectedAddress={selectedAddress}
        />
      </div>
    );
  }

  renderAddButton() {
    const { history } = this.props;

    return (
      <div
        className="address-book-add-button__button button btn-secondary btn--rounded"
        onClick={() => {
          history.push(CONTACT_ADD_ROUTE);
        }}
      >
        <p>Test button</p>
      </div>
    );
  }

  renderMyAccountsButton() {
    const { history } = this.props;
    const { t } = this.context;

    if (addressBook.length) {
      return (
        <div>
          <ContactList
            searchForContacts={() => contacts}
            searchForRecents={() => nonContacts}
            selectRecipient={(address) => {
              history.push(`${CONTACT_VIEW_ROUTE}/${address}`);
            }}
            selectedAddress={selectedAddress}
          />
        </div>
      );
    }
    return (
      <div className="address-book__container">
        <div>
          <img src="/images/address-book.svg" alt="Address book icon" />
          <h4 className="address-book__title">{t('builContactList')}</h4>
          <p className="address-book__sub-title">
            {t('addFriendsAndAddresses')}
          </p>
          <button
            className="address-book__link"
            onClick={() => {
              history.push(CONTACT_ADD_ROUTE);
            }}
          >
            + {t('addContact')}
          </button>
        </div>
      </div>
    );
  }

  renderContactContent() {
    const {
      viewingContact,
      editingContact,
      addingContact,
      showContactContent,
    } = this.props;

    if (!showContactContent) {
      return null;
    }

    let ContactContentComponent = null;
    if (viewingContact) {
      ContactContentComponent = ViewContact;
    } else if (editingContact) {
      ContactContentComponent = EditContact;
    } else if (addingContact) {
      ContactContentComponent = AddContact;
    }

    return (
      ContactContentComponent && (
        <div className="address-book-contact-content">
          <ContactContentComponent />
        </div>
      )
    );
  }

  renderAddressBookContent() {
    const { hideAddressBook } = this.props;

    if (!hideAddressBook) {
      return <div className="address-book">{this.renderAddresses()}</div>;
    }
    return null;
  }

  render() {
    return (
      <div className="address-book-wrapper">
        {this.renderAddressBookContent()}
        {this.renderContactContent()}
        {!addingContact && (
          <div className="address-book-add-button">
            <AddressBookAddButton label={this.context.t('addAccount')} />
            <p>{this.renderAddButton()}</p>
          </div>
        )}
      </div>
    );
  }
}
