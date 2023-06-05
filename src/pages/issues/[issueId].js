import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const IssueInfoPage = () => {
  const { query } = useRouter();

  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/issues/${query.issueId}`);
      if (data) setData(data);
    };

    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Issue Info | Bond Capital House</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4">At a glance</Typography>

            <Card>
              <CardHeader subheader="Instrument Parameters" />
              <Divider />

              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body">ISIN</Typography>
                    <Typography variant="h6">{data.isin}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body">CFI</Typography>
                    <Typography variant="h6">{data.cfi}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body">FISN</Typography>
                    <Typography variant="h6">{data.fisn}</Typography>
                  </Grid>
                </Grid>

                <CardHeader
                  subheader="Basic Information"
                  sx={{ mt: "3rem", marginLeft: "-1.5rem" }}
                />
                <Divider sx={{ mb: "1.5rem" }} />

                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Name of Instrument</Typography>
                    <Typography variant="h6">{data.name}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Preferred ISIN Country</Typography>
                    <Typography variant="h6">{data.country}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Central Securities Depository</Typography>
                    <Typography variant="h6">{data.centralSecuritiesDepository}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Issue Method</Typography>
                    <Typography variant="h6">{data.issueMethod}</Typography>
                  </Grid>
                </Grid>

                <CardHeader
                  subheader="Specific Information"
                  sx={{ mt: "3rem", marginLeft: "-1.5rem" }}
                />
                <Divider sx={{ mb: "1.5rem" }} />

                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Denomination Currency</Typography>
                    <Typography variant="h6">{data.denominationCurrency}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Specified Denomination</Typography>
                    <Typography variant="h6">{data.nominalValue}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Minimum Investment Size</Typography>
                    <Typography variant="h6">{data.minInvestmentSize}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Maximum Amount to be Issued</Typography>
                    <Typography variant="h6">{data.maxAmount}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Issue Price</Typography>
                    <Typography variant="h6">{data.issuePrice}</Typography>
                  </Grid>
                </Grid>

                <CardHeader
                  subheader="Date Information"
                  sx={{ mt: "3rem", marginLeft: "-1.5rem" }}
                />
                <Divider sx={{ mb: "1.5rem" }} />

                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Issue Date</Typography>
                    <Typography variant="h6">
                      {dayjs(data.issueDate).format("DD MMM YYYY")}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Maturity Date</Typography>
                    <Typography variant="h6">
                      {dayjs(data.maturityDate).format("DD MMM YYYY")}
                    </Typography>
                  </Grid>
                </Grid>

                <CardHeader
                  subheader="Interest Information"
                  sx={{ mt: "3rem", marginLeft: "-1.5rem" }}
                />
                <Divider sx={{ mb: "1.5rem" }} />

                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Interest Rate</Typography>
                    <Typography variant="h6">{data.interestRate}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Interest Type</Typography>
                    <Typography variant="h6">{data.interestType}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Frequency of Interest Payments</Typography>
                    <Typography variant="h6">{data.interestPaymentFrequency}</Typography>
                  </Grid>
                </Grid>

                <CardHeader
                  subheader="Optional Information"
                  sx={{ mt: "3rem", marginLeft: "-1.5rem" }}
                />
                <Divider sx={{ mb: "1.5rem" }} />

                <Grid container spacing={6}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body">First Coupon Date</Typography>
                    <Typography variant="h6">
                      {data.firstCouponDate
                        ? dayjs(data.firstCouponDate).format("DD MMM YYYY")
                        : "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Last Coupon Date</Typography>
                    <Typography variant="h6">
                      {data.lastCouponDate ? dayjs(data.lastCouponDate).format("DD MMM YYYY") : "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Coupon Dates</Typography>
                    <Typography variant="h6">
                      {data.couponDates ? data.couponDates : "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Day Count Fraction</Typography>
                    <Typography variant="h6">
                      {data.couponDates ? data.dayCountFraction : "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Redemption</Typography>
                    <Typography variant="h6">{data.couponDates ? data.redemption : "-"}</Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="body">Redemption Price</Typography>
                    <Typography variant="h6">
                      {data.couponDates ? data.redemptionPrice : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

IssueInfoPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default IssueInfoPage;
