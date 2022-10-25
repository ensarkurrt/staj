import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/content/Management/PayBill/PageHeader";
import PayBillContainer from "@/content/Management/PayBill/PayBillContainer";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Container, Grid } from "@mui/material";
import Head from "next/head";
function PayBill() {
  return (
    <>
      <Head>
        <title>Fatura Öde</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <PayBillContainer />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

PayBill.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;

export default PayBill;
