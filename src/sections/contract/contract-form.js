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
                      message: "Value must be in range of 0 - 100",
                    },
                    max: {
                      value: 100,
                      message: "Value must be in range of 0 - 100",
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

              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Issue Method"
                  {...register("issueMethod", { required: "Required field" })}
                  required
                  error={errors?.issueMethod}
                  helperText={errors?.issueMethod && errors?.issueMethod?.message}
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
                  {...register("denominationCurrency", { required: "Required field" })}
                  required
                  error={errors?.denominationCurrency}
                  helperText={errors?.denominationCurrency && errors?.denominationCurrency?.message}
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
                  {...register("maxAmount", {
                    min: {
                      value: 0,
                      message: "Input should be a positive number",
                    },
                    valueAsNumber: true,
                    required: "Required field",
                  })}
                  required
                  type="number"
                  error={errors?.maxAmount}
                  helperText={errors?.maxAmount && errors?.maxAmount?.message}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Specified Denomination"
                  {...register("nominalValue", {
                    min: {
                      value: 0,
                      message: "Input should be a positive number",
                    },
                    valueAsNumber: true,
                    required: "Required field",
                  })}
                  required
                  type="number"
                  error={errors?.nominalValue}
                  helperText={errors?.nominalValue && errors?.nominalValue?.message}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Central Securities Depository"
                  {...register("centralSecuritiesDepository", { required: "Required field" })}
                  required
                  error={errors?.centralSecuritiesDepository}
                  helperText={
                    errors?.centralSecuritiesDepository &&
                    errors?.centralSecuritiesDepository?.message
                  }
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
                  rules={{ required: "Required field" }}
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
                          // error={errors?.scheduledMaturityDate}
                          // helperText={errors?.scheduledMaturityDate && errors?.scheduledMaturityDate?.message}
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
                  {...register("redemptionPrice", {
                    min: {
                      value: 0,
                      message: "Value must be in range of 0 - 100",
                    },
                    max: {
                      value: 100,
                      message: "Value must be in range of 0 - 100",
                    },
                    valueAsNumber: true,
                    required: "Required field",
                  })}
                  required
                  type="number"
                  error={errors?.redemptionPrice}
                  helperText={errors?.redemptionPrice && errors?.redemptionPrice?.message}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Redemption"
                  {...register("redemption", { required: "Required field" })}
                  required
                  error={errors?.redemption}
                  helperText={errors?.redemption && errors?.redemption?.message}
                >
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
                  {...register("interestType", { required: "Required field" })}
                  required
                  error={errors?.interestType}
                  helperText={errors?.interestType && errors?.interestType?.message}
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
                  {...register("interestRate", {
                    min: {
                      value: 0,
                      message: "Value must be in range of 0 - 100",
                    },
                    max: {
                      value: 100,
                      message: "Value must be in range of 0 - 100",
                    },
                    valueAsNumber: true,
                    required: "Required field",
                  })}
                  required
                  type="number"
                  error={errors?.interestRate}
                  helperText={errors?.interestRate && errors?.interestRate?.message}
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
                  {...register("dayCountFraction", { required: "Required field" })}
                  required
                  error={errors?.dayCountFraction}
                  helperText={errors?.dayCountFraction && errors?.dayCountFraction?.message}
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
                  {...register("interestPaymentFrequency", { required: "Required field" })}
                  required
                  error={errors?.interestPaymentFrequency}
                  helperText={
                    errors?.interestPaymentFrequency && errors?.interestPaymentFrequency?.message
                  }
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
                  {...register("couponDates", { required: "Required field" })}
                  required
                  error={errors?.couponDates}
                  helperText={errors?.couponDates && errors?.couponDates?.message}
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
                  rules={{ required: "Required field" }}
                  style={{ width: "100%" }}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="First Coupon Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          required
                          error={errors?.firstCouponDate}
                          helperText={errors?.firstCouponDate && errors?.firstCouponDate?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <Controller
                  name="lastCouponDate"
                  control={control}
                  rules={{ required: "Required field" }}
                  style={{ width: "100%" }}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Last Coupon Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          required
                          error={errors?.lastCouponDate}
                          helperText={errors?.lastCouponDate && errors?.lastCouponDate?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>
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
