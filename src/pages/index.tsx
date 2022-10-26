import { Box, Button, Card, Container, styled, Typography } from "@mui/material";
import type { ReactElement } from "react";
import BaseLayout from "src/layouts/BaseLayout";

import Head from "next/head";
import Link from "src/components/Link";

import Hero from "src/content/Overview/Hero";

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Head>
        <title>Tokyo Free White NextJS Typescript Admin Dashboard</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" justifyContent="space-between" flex={1}>
              <Box />
              <Box>
                <Button component={Link} href="/dashboard" variant="contained" sx={{ ml: 2 }}>
                  Uygulamaya geç
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography textAlign="center" variant="subtitle1">
          Ensar KURT tarafından Düzce Üniversitesi Yaz Stajı Projesi olarak geliştirilmiştir.
        </Typography>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
