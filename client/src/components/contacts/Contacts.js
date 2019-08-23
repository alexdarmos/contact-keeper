import React, { Fragment, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';
const Contacts = () => {
	//gives us access to methods in ContactContext
	const contactContext = useContext(ContactContext);

	const { contacts } = contactContext;
	return (
		<div>
			<Fragment>
				{contacts.map(contact => (
					<ContactItem key={contact.id} contact={contact} />
				))}
			</Fragment>
		</div>
	);
};

export default Contacts;
