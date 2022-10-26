import { trpc } from "@/utils/trpc";
import { alpha, Avatar, Box, Card, CardContent, Grid, styled, Typography } from "@mui/material";
import { CurrencyType, Money } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === "dark" ? theme.colors.alpha.trueWhite[30] : alpha(theme.colors.alpha.black[100], 0.07)
    };

    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(["all"])};

        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }

        .MuiTouchRipple-root {
          opacity: .2;
        }

        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

const getCurrencyLabel = (currency: string) => {
  switch (currency) {
    case "TRY":
      return "₺";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    default:
      return "₺";
  }
};

const getCurrencyTextLabel = (currency: string) => {
  switch (currency) {
    case "TRY":
      return "Türk Lirası";
    case "USD":
      return "Dolar";
    case "EUR":
      return "Euro";
    default:
      return "Türk Lirası";
  }
};

function Wallets() {
  const [currencies, setCurrencies] = useState<Money[]>([]);
  const currenciesQuery = trpc.useQuery(["currency.list"]);

  useEffect(() => {
    if (currenciesQuery.status === "success")
      setCurrencies(currenciesQuery.data.currencies.filter((c) => c.currencyType != CurrencyType.TRY));
  }, [currenciesQuery.isLoading]);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3,
        }}
      >
        <Typography variant="h3" noWrap>
          Kur Değerleri
        </Typography>
        <Typography variant="body1" noWrap>
          NOT: Burada yer alan kur değerleri güncel olmayıp, veritabanına kayıtlı sabit değerlerdir.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {currencies.map((currency) => (
          <Grid key={currency.id} xs={12} sm={6} md={3} item>
            <Card
              sx={{
                px: 1,
              }}
            >
              <CardContent>
                <AvatarWrapper>
                  <Image
                    alt={currency.currencyType}
                    src={`/static/images/placeholders/logo/${currency.currencyType.toLowerCase()}.png`}
                  />
                </AvatarWrapper>
                <Typography variant="h5" noWrap>
                  {currency.currencyType}
                </Typography>
                <Typography variant="subtitle1" noWrap>
                  {getCurrencyTextLabel(currency.currencyType)}
                </Typography>
                <Box
                  sx={{
                    pt: 3,
                  }}
                >
                  <Typography variant="h3" gutterBottom noWrap>
                    {`${currency.amount} ${getCurrencyLabel(currency.currencyType)}`}
                  </Typography>
                  <Typography variant="subtitle2" noWrap>
                    1 TRY
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Wallets;
