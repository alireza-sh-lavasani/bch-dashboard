import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
  {
    value: "los-angeles",
    label: "Los Angeles",
  },
];

export const ContractForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const [values, setValues] = useState({
    firstName: "Anika",
    lastName: "Visser",
    email: "demo@devias.io",
    phone: "",
    state: "los-angeles",
    country: "USA",
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Instrument Parameters" title="Contract Form" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={6} xs={12}>
              <Grid xs={4} md={4}>
                <TextField variant="standard" fullWidth label="ISIN" disabled value="XXX" />
              </Grid>

              <Grid xs={4} md={4}>
                <TextField variant="standard" fullWidth label="CFI" disabled value="XXX" />
              </Grid>

              <Grid xs={4} md={4}>
                <TextField variant="standard" fullWidth label="FISN" disabled value="XXX" />
              </Grid>
            </Grid>

            <Divider sx={{ margin: "1.5rem 0", borderColor: "#aaa" }} />

            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Issue Date"
                  {...register("issueDate")}
                  required
                  type="date"
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Issue Price"
                  {...register("issuePrice")}
                  required
                  type="number"
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField fullWidth label="Issue Method" {...register("issueMethod")} required />
              </Grid>

              {/* <Grid xs={12} md={6}>
                <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                />
                </Grid>
                <Grid xs={12} md={6}>
                <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                />
                </Grid>
                <Grid xs={12} md={6}>
                <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                />
                </Grid>
                <Grid xs={12} md={6}>
                <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                  {option.label}
                  </option>
                  ))}
                </TextField>
              </Grid> */}
            </Grid>
          </Box>
        </CardContent>

        <Divider />

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
