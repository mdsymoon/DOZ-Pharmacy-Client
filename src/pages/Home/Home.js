import React from "react";
import ContactList from "../../componets/ContactList/ContactList";
import FavoriteList from "../../componets/FavoriteList/FavoriteList";
const Home = () => {
  return (
    <div>
      <FavoriteList />
      <ContactList />
    </div>
  );
};

export default Home;
