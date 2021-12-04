import { TextField } from "@mui/material";
import React from "react";
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            {...register("name", { required: true })}
          />
          <input type="submit" />
        </form>
      </div>
    </main>
  );
};

export default AddContact;
