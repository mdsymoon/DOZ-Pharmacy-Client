import { createSlice } from "@reduxjs/toolkit";

const editContactSlice = createSlice({
  name: "editContact",
  initialState: {
    contact: {},
  },
  reducers: {
    editContact: (state, { payload }) => {
      state.contact = payload;
    },
  },
});

export const { editContact } = editContactSlice.actions;
export const getEditContact = (state) => state.editStore.contact;
export default editContactSlice.reducer;
