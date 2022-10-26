import { Box, Button, Container, Grid, styled, Typography } from "@mui/material";

import Link from "src/components/Link";

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const NextJsAvatar = styled(Box)(
  ({ theme }) => `
  width: ${theme.spacing(8)};
  height: ${theme.spacing(8)};
  border-radius: ${theme.general.borderRadius};
  background-color: #dfebf6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center" }}>
      <Grid spacing={{ xs: 6, md: 10 }} justifyContent="center" alignItems="center" container>
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 1.0.0</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Minimalize Banka Simülasyonu
          </TypographyH1>
          <TypographyH2 sx={{ lineHeight: 1.5, pb: 4 }} variant="h4" color="text.secondary" fontWeight="normal">
            Bir banka uygulamasında temel olarak yer alan istenilen döviz ile hesap açma, para transferi (Havale),
            fatura ödeme gibi işlemler yer almaktadır.
          </TypographyH2>
          <Button component={Link} href="/dashboard" size="large" variant="contained">
            Uygulamaya geç
          </Button>

          <Grid container spacing={3} mt={5}>
            <Grid item md={3}>
              <MuiAvatar>
                <img src="/static/images/logo/planet-scale.svg" alt="Planet Scale" />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>PlanetScale (MySQL) Veritabanı</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  Hızlı ve güvenli veritabanı çözümü olduğunu için tercih edilmiştir.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={3}>
              <MuiAvatar>
                <img src="/static/images/logo/prisma.svg" alt="Planet Scale" />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Prisma ORM</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  Veritabanı modellerinizi hızlı ve basit bir şekilde oluşturup, veritabanı işlemlerini kolaylıkla
                  yapmanızı sağlar.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={3}>
              <NextJsAvatar>
                <img src="/static/images/logo/next-js.svg" alt="NextJS" />
              </NextJsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Next.js ile geliştirildi</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  Next.js, üretim için ihtiyaç duyduğunuz tüm özelliklerle size en iyi geliştirici deneyimini sunar.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={3}>
              <TsAvatar>
                <img src="/static/images/logo/typescript.svg" alt="Typescript" />
              </TsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Typescript ile geliştirildi</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  Typescript, güvenli bir şekilde JavaScript uygulamaları geliştirmenize yardımcı olur.
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
