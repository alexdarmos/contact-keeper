import React, { useReducer } from 'react';
import axios from 'axios';
// import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACTS,
	CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null
		// contacts: [
		// 	{
		// 		id: 1,
		// 		name: 'Jill Johnson',
		// 		email: 'jill@gmail.com',
		// 		phone: '111-111-1111',
		// 		type: 'personal'
		// 	},
		// 	{
		// 		id: 2,
		// 		name: 'Sarah Watson',
		// 		email: 'sarah@gmail.com',
		// 		phone: '222-222-2222',
		// 		type: 'personal'
		// 	},
		// 	{
		// 		id: 3,
		// 		name: 'Harry White',
		// 		email: 'harry@gmail.com',
		// 		phone: '333-333-3333',
		// 		type: 'professional'
		// 	}
		// ],
	};

	//state allows us to access anything in our state
	//dispatch allows us to dispatch to reducer
	const [state, dispatch] = useReducer(contactReducer, initialState);


	//Get Contacts
	const getContacts = async () => {

		try {
			const res = await axios.get('/api/contacts')

			dispatch({ 
				type: GET_CONTACTS, 
				payload: res.data 
			});
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR, 
				payload: error.response.msg
			})
		}
	};


	//Add Contact
	const addContact = async contact => {
		// contact.id = uuid.v4();

		const config = {
			headres: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.post('/api/contacts', contact, config)
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR, 
				payload: error.response.msg
			})
		}

		
	};
	//Delete Contact
	const deleteContact = id => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	//Clear Contacts
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};

	//Set Current Contact
	const setCurrent = contact => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};
	//Clear Current COntact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};
	//Update Contact
	const updateContact = contact => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};
	//Filter Contacts
	const filterContacts = text => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	//Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};
	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContacts,
				clearContacts
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
