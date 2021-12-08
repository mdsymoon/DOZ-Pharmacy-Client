import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componets/Header/Header";
import AddContact from "./pages/AddContact/AddContact";
import EditContact from "./pages/EditContact/EditContact";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PrivateRoute from './componets/PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-contact" element={<PrivateRoute><AddContact /></PrivateRoute>} />
        <Route path="/editContact/:id" element={<EditContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
