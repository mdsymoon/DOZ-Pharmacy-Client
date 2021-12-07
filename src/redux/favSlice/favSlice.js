import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "favorite contact",
  initialState: {
    favContacts: [],
  },
  reducers: {
    addFavorite: (state, { payload }) => {
        state.favContacts =  payload 
    },
    addNewFav: (state, { payload }) => {
      state.favContacts = [...state.favContacts, payload]
    }
  },
});


export const  {addFavorite, addNewFav} = favSlice.actions
export const getFavContact = (state) => state.favContactStore.favContacts
export default favSlice.reducer;
