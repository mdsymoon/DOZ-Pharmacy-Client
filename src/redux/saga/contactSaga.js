import { call, put, takeEvery} from "redux-saga/effects"
import { addContacts } from "../contactSlice/contactSlice";

function* contactFetch(){
    const res = yield call(() => fetch("http://localhost:4000/getUser")) ;
    const contacts = yield res.json() ;
    yield put(addContacts(contacts))
}

function* contactSaga(){
    yield takeEvery("contacts/getContactFetch",contactFetch);
}

export default contactSaga;