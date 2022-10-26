import { Box, Button, Container, OutlinedInput, styled, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import type { ReactElement } from "react";
import BaseLayout from "src/layouts/BaseLayout";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

function Status404() {
  return (
    <>
      <Head>
        <title>404 : Not Found</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center">
              <Image alt="404" height={180} src="/static/images/status/404.svg" />
              <Typography variant="h2" sx={{ my: 2 }}>
                Ulaşmaya çalıştığınız sayfa bulunamadı.
              </Typography>
            </Box>
            <Container maxWidth="sm" sx={{ textAlign: "center", mt: 1, p: 2 }}>
              <Button href="/" variant="outlined">
                Anasayfa
              </Button>
            </Container>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default Status404;

Status404.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
