import React from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Header from "./../../componets/Header/Header";
import { styled } from "@mui/material/styles";
import { AiOutlineUpload } from "react-icons/ai";

const AddContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const Input = styled("input")({
    display: "none",
  });

  const categoryList = [
    { value: "CLIENT" },
    { value: "WORKSHOP" },
    { value: "INTERNAL WORKS" },
    { value: "BOARD ROOM" },
  ];

  return (
    <main>
      <Header />

      {/* contact add form */}
      <div className="flex justify-center mt-20 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            margin="dense"
            {...register("name", { required: true })}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Position"
            variant="outlined"
            margin="dense"
            {...register("position", { required: true })}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Status"
            variant="outlined"
            margin="dense"
            {...register("status", { required: true })}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Location"
            variant="outlined"
            margin="dense"
            {...register("location", { required: true })}
          />

          <Autocomplete
            multiple
            size="small"
            options={categoryList}
            getOptionLabel={(option) => option.value}
            filterSelectedOptions
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Category" margin="dense" />
            )}
            onChange={(e, value) => setValue("tags", value)}
          />

          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              {...register("image", { required: true })}
            />
            <Button variant="outlined" component="span" size="small">
              <AiOutlineUpload className="text-xl mr-2" /> Upload Image
            </Button>
          </label>
          <br />

          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{ marginTop: 3 }}
            fullWidth
          >
            Add Contact
          </Button>
        </form>
      </div>
    </main>
  );
};

export default AddContact;
