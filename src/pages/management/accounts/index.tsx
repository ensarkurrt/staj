import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/content/Management/Accounts/PageHeader";
import RecentOrders from "@/content/Management/Accounts/RecentOrders";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Container, Grid } from "@mui/material";
import Head from "next/head";
function Accounts() {
  return (
    <>
      <Head>
        <title>Hesaplarım</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Accounts.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;

export default Accounts;
