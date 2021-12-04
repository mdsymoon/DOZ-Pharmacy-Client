import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componets/Header/Header";
import AddContact from "./pages/AddContact/AddContact";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-contact" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
