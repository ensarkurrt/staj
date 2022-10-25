import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import BankAccounts from "@/content/Management/Accounts/BankAccounts";
import PageHeader from "@/content/Management/Accounts/PageHeader";
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
            <BankAccounts />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
/*
export async function getServerSideProps() {
  const data = trpc.useQuery(["account.list"]);

  return { props: { data } };
} */

Accounts.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;

export default Accounts;
