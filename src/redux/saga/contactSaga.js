import { call, put, takeEvery } from "redux-saga/effects";
import { addContacts } from "../contactSlice/contactSlice";
import axios from "axios";

function* contactFetch() {
  let contacts = [];
  yield call(() =>
    axios
      .get("http://localhost:4000/getUser")
      .then((res) => (contacts = res.data))
  );
  yield put(addContacts(contacts));
}

function* contactSaga() {
  yield takeEvery("contacts/getContactFetch", contactFetch);
}

export default contactSaga;
