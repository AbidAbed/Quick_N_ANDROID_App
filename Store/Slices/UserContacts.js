import {createSlice} from '@reduxjs/toolkit';
const userContactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    fetchUserContacts(state, action) {
      return [...action.payload];
    },
    addContact(state, action) {
      const dublicatedContact = state.find(
        contact => contact._id === action.payload._id,
      );
      if (dublicatedContact) return state;
      else {
        return [{...action.payload}, ...state];
      }
    },
    removeContact(state, action) {
      const newContacts = state.filter(
        contact => contact._id !== action.payload._id,
      );
      return [...newContacts];
    },
  },
});
const {fetchUserContacts, removeContact, addContact} =
  userContactsSlice.actions;

export {fetchUserContacts, removeContact, addContact, userContactsSlice};
