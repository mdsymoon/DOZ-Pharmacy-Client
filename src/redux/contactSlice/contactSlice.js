import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    isLoading: false,
  },
  reducers: {
      getContactFetch: (state) => {
        state.isLoading = true;
      },
    addContacts: (state, { payload }) => {
      state.contacts = payload;
    },
  },
});

export const { addContacts, getContactFetch } = contactSlice.actions;
export const getAllContacts = (state) => state.contactStore.contacts;

export default contactSlice.reducer;
