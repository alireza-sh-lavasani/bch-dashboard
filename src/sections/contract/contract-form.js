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
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

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
  const { register, handleSubmit, reset, control } = useForm();

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
    // reset();
  };

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
                <Controller
                  name="issueDate"
                  control={control}
                  rules={{ required: true }}
                  style={{ width: "100%" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Issue Date"
                      slotProps={{ textField: { fullWidth: true, required: true } }}
                    />
                  )}
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
                <TextField
                  select
                  fullWidth
                  label="Issue Method"
                  {...register("issueMethod")}
                  required
                >
                  <MenuItem key={1} value="test">
                    Test
                  </MenuItem>
                  <MenuItem key={2} value="test2">
                    Test 02
                  </MenuItem>
                </TextField>
              </Grid>
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
