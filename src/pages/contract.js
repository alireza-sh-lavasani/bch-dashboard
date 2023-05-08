import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ContractUpload } from "src/sections/contract/contract-upload";
import { ContractForm } from "src/sections/contract/contract-form";

const Page = () => (
  <>
    <Head>
      <title>Bond Capital House | New Issuance</title>
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
          <div>
            <Typography variant="h4">New Issue</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12}>
                <ContractForm />
              </Grid>
              <Grid xs={12}>
                <ContractUpload />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
