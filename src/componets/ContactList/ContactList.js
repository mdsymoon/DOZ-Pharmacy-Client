import React, { useEffect, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
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
  Avatar,
  TablePagination,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllContacts,
  getContactFetch,
} from "../../redux/contactSlice/contactSlice";
import { addNewFav, getFavContact } from "../../redux/favSlice/favSlice";
import { getLoggedInUser } from "../../redux/loginSlice/loginSlice";
import { editContact } from "../../redux/editContactSlice/editContactSlice";
import { useNavigate } from "react-router";

const ContactList = () => {
  const dispatch = useDispatch();
  const { email } = useSelector(getLoggedInUser);
  const favContacts = useSelector(getFavContact);
  console.log(favContacts);
  const navigate = useNavigate();
  const allContact = useSelector(getAllContacts);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => dispatch(getContactFetch()));

  const handleFav = (contact) => {
    const isExit = favContacts.filter(
      (con) => con.contact.name === contact.name
    );
    if (isExit.length === 0) {
      const favContact = {
        image: contact.image,
        name: contact.name,
        position: contact.position,
        status: contact.status,
        location: contact.location,
        tags: contact.tags,
      };
      if (email) {
        fetch("http://localhost:4000/addFavContacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, contactData: favContact }),
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(addNewFav(data));
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("please log in!");
      }
    } else {
      alert("This Contact Already Selected!");
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (contact) => {
    if (email) {
      dispatch(editContact(contact));
      navigate("/editContact");
    } else {
      alert("please log in!");
    }
  };

  const handleDelete = (contact) => {
    if (email) {
      fetch("http://localhost:4000/deleteContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId: contact._id }),
      });
    } else{
      alert("please log in!");
    }
  };

  return (
    <div className="container mx-auto mt-5 mb-20 px-5">
      <h1 className="text-2xl font-semibold text-indigo-700 mb-5 mt-16">
        Contacts List
      </h1>
      <div className="flex justify-center my-10">
        <TextField
          label="Search"
          InputProps={{
            type: "search",
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 md:w-96 my-10"
        />
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, backgroundColor: "#F5F6FB", boxShadow: "none" }}
          aria-label="simple table"
        >
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
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allContact
              .filter((value) => {
                if (searchTerm === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return value;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((contact) => (
                <TableRow
                  key={contact._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Avatar
                      alt=""
                      src={contact.image}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>

                  <TableCell align="left">
                    <div>
                      <h3 className="text-md font-bold">{contact.name}</h3>
                      <p className="text-sm text-gray-400">
                        {contact.position}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell align="left">{contact.status}</TableCell>
                  <TableCell align="left">{contact.location}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={1}>
                      {contact.tags.map((tag, index) => (
                        <Chip
                          label={tag.value}
                          size="small"
                          key={index}
                          color={
                            tag.value === "CLIENT"
                              ? "primary"
                              : tag.value === "WORKSHOP"
                              ? "success"
                              : tag.value === "INTERNAL WORKS"
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
                      variant="outlined"
                      onClick={() => handleFav(contact)}
                    >
                      Favorite
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEdit(contact)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<AiTwotoneDelete />}
                      onClick={() => handleDelete(contact)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={allContact.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ContactList;
