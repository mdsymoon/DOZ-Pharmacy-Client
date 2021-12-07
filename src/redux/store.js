import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import contactReducer from "./contactSlice/contactSlice";
import favoritesReducer from "./favSlice/favSlice";
import editReducer from "./editContactSlice/editContactSlice"
import loginReducer from "./loginSlice/loginSlice";
import contactSaga from "./saga/contactSaga";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    contactStore: contactReducer,
    favContactStore: favoritesReducer,
    editStore: editReducer,
    loginStore: loginReducer,
  },
  middleware: [saga],
});
saga.run(contactSaga);
