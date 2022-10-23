import Footer from "@/components/Footer";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageHeader from "@/content/Management/Accounts/History/PageHeader";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Container, Grid } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

import AccountHistory from "@/content/Management/Accounts/History/AccountHistory";
import LoadingButton from "@mui/lab/LoadingButton";

function History() {
  const router = useRouter();
  const { id } = router.query;
  console.log("ID", id);
  return (
    <>
      <Head>
        <title>İşlem Geçmişi</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            {!id && (
              <LoadingButton loading={true} variant="contained">
                Yükleniyor...
              </LoadingButton>
            )}
            {id && <AccountHistory accountId={id.toString()} />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

History.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;

export default History;
