import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "favorite contact",
  initialState: {
    favContacts: [],
  },
  reducers: {
    addFavorite: (state, { payload }) => {
        state.favContacts.push (payload) 
    },
  },
});


export const  {addFavorite} = favSlice.actions
export const getFavContact = (state) => state.favContactStore.favContacts
export default favSlice.reducer;
