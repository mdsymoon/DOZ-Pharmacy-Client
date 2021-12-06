import React, { useEffect, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import {
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllContacts,
  getContactFetch,
} from "../../redux/contactSlice/contactSlice";
import { addFavorite } from "../../redux/favSlice/favSlice";

const ContactList = () => {
  const dispatch = useDispatch();
  const allContact = useSelector(getAllContacts);

  useEffect(() => dispatch(getContactFetch()), [dispatch]);

  const handleFav = (contact) => {
    const favContact = {
      image : contact.image,
      name: contact.name,
      status: contact.status,
      location: contact.location,
      tags: contact.tags,
    }
    dispatch(addFavorite(favContact))
  }

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-semibold text-purple-700 my-3">
        Contacts List
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <p className="text-gray-400">IMAGE</p>
              </TableCell>
              <TableCell align="left">
                <p className="text-gray-400">NAME</p>
              </TableCell>
              <TableCell align="left">
                <p className="text-gray-400">STATUS</p>
              </TableCell>
              <TableCell align="left">
                <p className="text-gray-400">LOCATION</p>
              </TableCell>
              <TableCell align="left">
                <p className="text-gray-400">TAGS</p>
              </TableCell>
              <TableCell align="left">
                <p className="text-gray-400">ACTIONS</p>
              </TableCell>
              <TableCell align="left">
                <p className="text-gray-400"></p>
              </TableCell>
              <TableCell align="left">
               
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allContact.map((contact) => (
              <TableRow
                key={contact._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <img
                    src={contact.image}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                </TableCell>

                <TableCell align="left">
                  <div>
                    <h3 className="text-md font-bold">{contact.name}</h3>
                    <p className="text-sm text-gray-400">{contact.position}</p>
                  </div>
                </TableCell>
                <TableCell align="left">{contact.status}</TableCell>
                <TableCell align="left">{contact.location}</TableCell>
                <TableCell align="left">
                  <Stack direction="row" spacing={1}>
                    {contact.tags.map((tag, index) => (
                      <Chip
                        label={tag}
                        size="small"
                        key={index}
                        color={
                          tag === "CLIENT"
                            ? "primary"
                            : tag === "WORKSHOP"
                            ? "success"
                            : tag === "INTERNAL WORKS"
                            ? "error"
                            : "default"
                        }
                      />
                    ))}
                  </Stack>
                </TableCell>

                <TableCell align="left">
                  <Button size="small" className="flex">
                    <BiMessage className="text-xl mr-2" />
                    message
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button size="small" className="flex">
                    <FiPhoneCall className="text-xl mr-2" />
                    call
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button 
                  size="small" 
                  variant="contained"
                  onClick={() => handleFav(contact)}
                  >Favorite</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactList;