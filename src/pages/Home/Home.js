import React from "react";
import ContactList from "../../componets/ContactList/ContactList";
import FavoriteList from "../../componets/FavoriteList/FavoriteList";
import Header from "../../componets/Header/Header";
const Home = () => {
  return (
    <div>
      <Header />
      <FavoriteList />
      <ContactList />
    </div>
  );
};

export default Home;
