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
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  CircularProgress,
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
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";

export const ContractForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (submittedData) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        let cleanedData = {};

        // Remove empty fileds from data
        Object.keys(submittedData).forEach((key) => {
          if (submittedData[key]) cleanedData[key] = submittedData[key];
        });

        try {
          await axios.post("/api/contracts", cleanedData);
          toast.success("Contract submitted successfully.");
        } catch (error) {
          toast.error("Failed to add the contract.");
        }
        // reset();

        resolve();
      }, 1000);
    });
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Instrument Parameters" />
        {/* <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={6}>
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

            <CardHeader
              subheader="Basic Information"
              sx={{ marginTop: "3rem", marginLeft: "-0.75rem" }}
            />

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Name of Instrument"
                  {...register("name", { required: "Required field" })}
                  error={errors?.name}
                  helperText={
                    errors?.name
                      ? errors?.name?.message
                      : "Please fill in the name linked to the individual security "
                  }
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

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Preferred ISIN Country"
                  {...register("country", { required: "Required field" })}
                  error={errors?.country}
                  helperText={
                    errors?.country
                      ? errors?.country?.message
                      : "Please fill in the preferred country. If not specified please proceed with XS (International) or CH (Switzerland)"
                  }
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

              <Grid xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Central Securities Depository"
                  {...register("centralSecuritiesDepository", { required: "Required field" })}
                  required
                  error={errors?.centralSecuritiesDepository}
                  helperText={
                    errors?.centralSecuritiesDepository
                      ? errors?.centralSecuritiesDepository?.message
                      : "Dependent on the choice of ISIN Country the main-CSD may vary"
                  }
                >
                  {centralSecuritiesDepository.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Issue Method"
                  {...register("issueMethod", { required: "Required field" })}
                  required
                  error={errors?.issueMethod}
                  helperText={
                    errors?.issueMethod
                      ? errors?.issueMethod?.message
                      : "Global Certificates need to be send by post to us, while uncertificated securities can be provided by way of board resolution"
                  }
                >
                  {issueMethods.map(({ title, value }) => (
                    <MenuItem key={value} value={value}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <CardHeader
              subheader="Specific Information"
              sx={{ marginTop: "3rem", marginLeft: "-0.75rem" }}
            />

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Denomination Currency"
                  {...register("denominationCurrency", { required: "Required field" })}
                  required
                  error={errors?.denominationCurrency}
                  helperText={
                    errors?.denominationCurrency
                      ? errors?.denominationCurrency?.message
                      : "Please choose the currency of choice for the instrument"
                  }
                >
                  {denominationCurrencies.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={12} md={6}>
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
                  helperText={
                    errors?.nominalValue
                      ? errors?.nominalValue?.message
                      : "Please fill in the unit size of this individual security"
                  }
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minimum Investment Size"
                  {...register("minInvestmentSize")}
                  error={errors?.minInvestmentSize}
                  helperText={
                    errors?.minInvestmentSize
                      ? "Required field"
                      : "Please fill in the minimum investment size (in cases where the multiple units make the minimum investment size"
                  }
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

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maximum Amount to be Issued"
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
                  helperText={
                    errors?.maxAmount
                      ? errors?.maxAmount?.message
                      : "Please fill in the total issue size of this individual security"
                  }
                />
              </Grid>
            </Grid>

            <Grid xs={12} md={6}>
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

            <CardHeader
              subheader="Date Information"
              sx={{ marginTop: "3rem", marginLeft: "-0.75rem" }}
            />

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
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
                          helperText={
                            errors?.issueDate
                              ? errors?.issueDate?.message
                              : "Please choose the first date of trading for this instrument"
                          }
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <Controller
                  name="maturityDate"
                  control={control}
                  rules={{ required: "Required field" }}
                  style={{ width: "100%" }}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Maturity Date"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          required
                          error={errors?.maturityDate}
                          helperText={
                            errors?.maturityDate
                              ? errors?.maturityDate?.message
                              : "Please choose the redemption date for this instrument"
                          }
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <CardHeader
              subheader="Interest Information"
              sx={{ marginTop: "3rem", marginLeft: "-0.75rem" }}
            />

            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
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
                  helperText={
                    errors?.interestRate
                      ? errors?.interestRate?.message
                      : "Please enter the value of the interest rate in percentages"
                  }
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid xs={12} md={6}>
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

              <Grid xs={12} md={6}>
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
            </Grid>

            <CardHeader
              // subheader="Optional Information"
              sx={{ marginTop: "3rem", marginLeft: "-0.75rem" }}
            />

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Optinal Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <Controller
                      name="firstCouponDate"
                      control={control}
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
                              error={errors?.firstCouponDate}
                              helperText={
                                errors?.firstCouponDate && errors?.firstCouponDate?.message
                              }
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <Controller
                      name="lastCouponDate"
                      control={control}
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
                              error={errors?.lastCouponDate}
                              helperText={errors?.lastCouponDate && errors?.lastCouponDate?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <TextField
                      select
                      fullWidth
                      label="Coupon Dates"
                      {...register("couponDates")}
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

                  <Grid xs={12} md={6}>
                    <TextField
                      select
                      fullWidth
                      label="Day Count Fraction"
                      {...register("dayCountFraction")}
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

                  <Grid xs={12} md={6}>
                    <TextField
                      select
                      fullWidth
                      label="Redemption"
                      {...register("redemption")}
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

                  <Grid xs={12} md={6}>
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
                      })}
                      type="number"
                      error={errors?.redemptionPrice}
                      helperText={errors?.redemptionPrice && errors?.redemptionPrice?.message}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </CardContent> */}

        <Divider />

        <input {...register("name")} />

        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress /> : "SUBMIT"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
