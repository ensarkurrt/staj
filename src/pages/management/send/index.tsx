import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/content/Management/SendMoney/PageHeader";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Container, Grid } from "@mui/material";
import Head from "next/head";
import SendMoneyContainer from "@/content/Management/SendMoney/SendMoneyContainer";
function SendMoney() {
  return (
    <>
      <Head>
        <title>Para Gönder</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <SendMoneyContainer />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

SendMoney.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;

export default SendMoney;
