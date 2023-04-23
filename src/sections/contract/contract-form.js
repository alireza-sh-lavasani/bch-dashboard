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
  InputAdornment,
  Icon,
  SvgIcon,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import {
  centralSecuritiesDepository,
  couponDates,
  dayCountFraction,
  denominationCurrencies,
  interestPaymentFrequency,
  interestType,
  issueMethods,
  redemption,
} from "./contract-constants";
import { PencilIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";

export const ContractForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // axios.post('/api/contract', data)
    // reset();
  };

  console.log(errors);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
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

            <Grid xs={12}>
              <TextField
                fullWidth
                label="Title"
                {...register("title")}
                error={errors?.title}
                helperText={errors?.title ? "Required field" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SvgIcon>
                        <PencilIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <Controller
                  name="issueDate"
                  control={control}
                  rules={{ required: "Required field" }}
                  style={{ width: "100%" }}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Issue Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          required
                          error={errors?.issueDate}
                          helperText={errors?.issueDate && errors?.issueDate?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Issue Price"
                  {...register("issuePrice", {
                    min: {
                      value: 0,
                      message: "Issue price must be in range of 0 - 100"
                    },
                    max: {
                      value: 100,
                      message: "Issue price must be in range of 0 - 100"
                    },
                    valueAsNumber: true,
                    required: "Required field",
                  })}
                  required
                  type="number"
                  error={errors?.issuePrice}
                  helperText={errors?.issuePrice && errors?.issuePrice?.message}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>

              {/* <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Issue Method"
                  {...register("issueMethod")}
                  required
                >
                  {issueMethods.map(({ title, value }) => (
                    <MenuItem key={value} value={value}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Denomination Currency"
                  {...register("denominationCurrency")}
                  required
                >
                  {denominationCurrencies.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Maximum Amount to be Created"
                  {...register("maxAmount", { min: 0, valueAsNumber: true })}
                  required
                  type="number"
                  error={errors?.maxAmount}
                  helperText={errors?.maxAmount ? "Input should be a positive number" : ""}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Specified Denomination"
                  {...register("nominalValue", { min: 0, valueAsNumber: true })}
                  required
                  type="number"
                  error={errors?.nominalValue}
                  helperText={
                    errors?.nominalValue ? "Input should be a positive number" : "Nominal Value"
                  }
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Central Securities Depository"
                  {...register("centralSecuritiesDepository")}
                  required
                >
                  {centralSecuritiesDepository.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={4}>
                <Controller
                  name="scheduledMaturityDate"
                  control={control}
                  rules={{ required: true }}
                  style={{ width: "100%" }}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Scheduled Maturity Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          required
                          error
                          helperText="We have to discuss about this one"
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Redemption Price"
                  {...register("redemptionPrice", { min: 0, max: 100, valueAsNumber: true })}
                  required
                  type="number"
                  error={errors?.redemptionPrice}
                  helperText={
                    errors?.redemptionPrice ? "Redemption price must be in range of 0 - 100" : ""
                  }
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField select fullWidth label="Redemption" {...register("redemption")} required>
                  {redemption.map(({ title, value }) => (
                    <MenuItem key={value} value={value}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Interest Type"
                  {...register("interestType")}
                  required
                >
                  {interestType.map(({ title, value }) => (
                    <MenuItem key={value} value={value}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Interest Rate"
                  {...register("interestRate", { min: 0, max: 100, valueAsNumber: true })}
                  required
                  type="number"
                  error={errors?.interestRate}
                  helperText={
                    errors?.interestRate ? "Interest rate must be in range of 0 - 100" : ""
                  }
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Day Count Fraction"
                  {...register("dayCountFraction")}
                  required
                >
                  {dayCountFraction.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Frequency of Interest Payments"
                  {...register("interestPaymentFrequency")}
                  required
                >
                  {interestPaymentFrequency.map(({ title, value }) => (
                    <MenuItem key={value} value={value}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Coupon Dates"
                  {...register("couponDates")}
                  required
                >
                  {couponDates.map(({ title, value }) => (
                    <MenuItem key={value} value={value}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={4}>
                <Controller
                  name="firstCouponDate"
                  control={control}
                  rules={{ required: true }}
                  style={{ width: "100%" }}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="First Coupon Date"
                      renderInput={(params) => <TextField {...params} fullWidth required />}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <Controller
                  name="lastCouponDate"
                  control={control}
                  rules={{ required: true }}
                  style={{ width: "100%" }}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Last Coupon Date"
                      renderInput={(params) => <TextField {...params} fullWidth required />}
                    />
                  )}
                />
              </Grid> */}
            </Grid>
          </Box>
        </CardContent>

        <Divider />

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
