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
            Minimalize Banka Sim??lasyonu
          </TypographyH1>
          <TypographyH2 sx={{ lineHeight: 1.5, pb: 4 }} variant="h4" color="text.secondary" fontWeight="normal">
            Bir banka uygulamas??nda temel olarak yer alan istenilen d??viz ile hesap a??ma, para transferi (Havale),
            fatura ??deme gibi i??lemler yer almaktad??r.
          </TypographyH2>
          <Button component={Link} href="/dashboard" size="large" variant="contained">
            Uygulamaya ge??
          </Button>

          <Grid container spacing={3} mt={5}>
            <Grid item md={3}>
              <MuiAvatar>
                <img src="/static/images/logo/planet-scale.svg" alt="Planet Scale" />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>PlanetScale (MySQL) Veritaban??</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  H??zl?? ve g??venli veritaban?? ????z??m?? oldu??unu i??in tercih edilmi??tir.
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
                  Veritaban?? modellerinizi h??zl?? ve basit bir ??ekilde olu??turup, veritaban?? i??lemlerini kolayl??kla
                  yapman??z?? sa??lar.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={3}>
              <NextJsAvatar>
                <img src="/static/images/logo/next-js.svg" alt="NextJS" />
              </NextJsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Next.js ile geli??tirildi</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  Next.js, ??retim i??in ihtiya?? duydu??unuz t??m ??zelliklerle size en iyi geli??tirici deneyimini sunar.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={3}>
              <TsAvatar>
                <img src="/static/images/logo/typescript.svg" alt="Typescript" />
              </TsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Typescript ile geli??tirildi</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  Typescript, g??venli bir ??ekilde JavaScript uygulamalar?? geli??tirmenize yard??mc?? olur.
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
