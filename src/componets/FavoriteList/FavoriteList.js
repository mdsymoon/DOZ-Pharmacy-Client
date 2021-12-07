import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { addFavorite, getFavContact } from "../../redux/favSlice/favSlice";
import { BiMessage } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { Button, Avatar, IconButton } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";
import { getLoggedInUser } from "../../redux/loginSlice/loginSlice";
import { useDispatch } from "react-redux";

const FavoriteList = () => {
  const favContact = useSelector(getFavContact);
  const { email } = useSelector(getLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!email) return
    fetch("http://localhost:4000/getFavContacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(addFavorite(data)));
  }, [email, dispatch]);

  return (
    <>
   
      {favContact.length > 0 && (
        <div className="container mx-auto px-5">
          <h1 className="text-2xl font-semibold text-indigo-700 my-8">
            Favorite
          </h1>

          <Scrollbars style={{ width: "100%", height: 250 }}>
            <div className="flex gap-8">
              {favContact.map((contact) => (
                <div
                  key={contact?._id}
                  className="shadow-sm rounded-2xl p-5 w-72 bg-white"
                >
                  {/* top section */}
                  <div className="flex items-center pb-3 gap-2">
                    <Avatar
                      alt=""
                      src={contact?.contact?.image}
                      sx={{ width: 50, height: 50 }}
                    />
                    <div className="flex items-start justify-between w-full">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {contact?.contact?.name}
                        </h3>
                        <p className="text-gray-400">
                          {contact?.contact?.position}
                        </p>
                      </div>
                      <IconButton className="bg-gray-100 p-2 rounded-full ">
                        <AiFillStar className="text-yellow-400" />
                      </IconButton>
                    </div>
                  </div>

                  {/* bottom section */}
                  <div className="border-t-2 pt-3">
                    <p className="font-semibold">{contact?.contact?.status}</p>
                    <p className="font-semibold">
                      {contact?.contact?.location}
                    </p>
                    <div className="mt-2 flex gap-5">
                      <Button size="small" className="flex">
                        <BiMessage className="text-md mr-2" />
                        message
                      </Button>
                      <Button size="small" className="flex">
                        <FiPhoneCall className="text-md mr-2" />
                        message
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Scrollbars>
        </div>
      )}
    </>
  );
};

export default FavoriteList;
