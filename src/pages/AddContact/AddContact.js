import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Box,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { AiOutlineUpload } from "react-icons/ai";

const AddContact = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = (data) => {
    if (image === null) return;
    const formData = new FormData();
    formData.append("file", data.image);
    formData.append("upload_preset", "contactsImages");
    fetch("https://api.cloudinary.com/v1_1/dua2fn3m2/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const contactData = {
          name: data.name,
          position: data.position,
          status: data.status,
          location: data.location,
          tags: data.tags,
          image: imgData.secure_url,
        };
        fetch("http://localhost:4000/add_contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        })
          .then((res) => res.json())
          .then((contactData) => reset());
      });
  };

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
      {/* contact add form */}
      <div className="flex justify-center mt-20 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Name"
            variant="outlined"
            margin="normal"
            {...register("name", { required: true })}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Position"
            variant="outlined"
            margin="normal"
            {...register("position", { required: true })}
          />

          <TextField
            fullWidth
            id="outlined-basic"
            label="Location"
            variant="outlined"
            margin="normal"
            {...register("location", { required: true })}
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                defaultValue="Active"
                {...register("status", { required: true })}
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Inactive"}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Autocomplete
            multiple
            options={categoryList}
            getOptionLabel={(option) => option.value}
            filterSelectedOptions
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField {...params} label="Select tags" margin="normal" />
            )}
            onChange={(e, value) =>
              setValue("tags", value, { shouldValidate: true })
            }
          />

          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setValue("image", e.target.files[0]);
              }}
            />
            <Button variant="outlined" component="span" fullWidth>
              {image !== null ? (
                image.name
              ) : (
                <>
                  <AiOutlineUpload className="text-xl mr-2" /> Upload Image
                </>
              )}
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
