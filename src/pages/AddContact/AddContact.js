import React from "react";
import { Button, TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import Header from "./../../componets/Header/Header";

const AddContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <main>
      <Header />

      {/* contact add form */}
      <div className="flex justify-center mt-20 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          
            <TextField
            fullWidth
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            {...register("name", { required: true })}
          />
          <TextField
          fullWidth
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            {...register("name", { required: true })}
          />
          <TextField
          fullWidth
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            {...register("name", { required: true })}
          />
         
          
          <br />
          <Button type="submit" variant="contained">
            Add Contact
          </Button>
        </form>
      </div>
    </main>
  );
};

export default AddContact;
