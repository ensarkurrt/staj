import { Chart } from "@/components/Chart";
import { trpc } from "@/utils/trpc";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { BankAccount, BankAccountType, CurrencyType, Money } from "@prisma/client";
import type { ApexOptions } from "apexcharts";
import Image from "next/image";
import { useEffect, useState } from "react";

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
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

function AccountBalance() {
  const theme = useTheme();

  const _chartOptions: ApexOptions = {
    title: {
      text: "Hesap Bakiyesi (₺)",
      align: "center",
    },
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
    colors: ["#ff9900", "#1c81c2", "#5c6ac0"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]],
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5,
        },
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5,
      },
    },
    fill: {
      opacity: 1,
    },
    labels: [],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100],
      },
      show: false,
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const [chartOptions, setChartOptions] = useState<ApexOptions>(_chartOptions);

  const [chartSeries, setChartSeries] = useState<number[]>([]);

  const [isInitialized, setIsInitialized] = useState(false);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [changableBalance, setChangableBalance] = useState<number>(0);

  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const accountsQuery = trpc.useQuery(["account.list"]);

  const [currencies, setCurrencies] = useState<Money[]>([]);
  const currenciesQuery = trpc.useQuery(["currency.list"]);

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>(CurrencyType.TRY);

  useEffect(() => {
    if (accountsQuery.status === "success")
      setAccounts(accountsQuery.data.accounts.filter((x) => (x.balance as unknown as number) > 0));
  }, [accountsQuery.isLoading]);

  useEffect(() => {
    if (currenciesQuery.status === "success") setCurrencies(currenciesQuery.data.currencies);
  }, [currenciesQuery.isLoading]);

  useEffect(() => {
    if (accounts.length > 0 && !isInitialized) calculateTotal();
  }, [accounts, currencies]);

  useEffect(() => {
    var addingSeries: number[] = [];
    var addingLabels: string[] = [];
    accounts.forEach((account) => {
      var tryBalance = 0;
      addingLabels.push(account.currency);
      const accountCurrency = currencies.find((currency) => currency.currencyType === account.currency);
      if (accountCurrency)
        tryBalance = (account.balance as unknown as number) * (accountCurrency.amount as unknown as number);

      const series: number = (tryBalance * 100) / totalBalance;
      addingSeries.push(parseFloat(series.toFixed(2)));
    });

    _chartOptions.labels = addingLabels;
    setChartOptions(_chartOptions);
    setChartSeries(addingSeries);
  }, [totalBalance]);

  const calculateTotal = () => {
    var addingBalance: number = 0;

    accounts.forEach((account) => {
      const accountCurrency = currencies.find((currency) => currency.currencyType === account.currency);
      if (accountCurrency)
        addingBalance += (account.balance as unknown as number) * (accountCurrency.amount as unknown as number);
    });

    setTotalBalance(addingBalance);
    setChangableBalance(addingBalance);

    setIsInitialized(true);
  };

  const getAccountTypeLabel = (type: BankAccountType) => {
    switch (type) {
      case BankAccountType.CURRENT:
        return "Cari Hesap";
      case BankAccountType.SAVINGS:
        return "Vadeli Hesap";
    }
  };

  const changeCurrency = (currency: CurrencyType) => {
    console.log(selectedCurrency, currency);
    if (selectedCurrency === currency) return;
    const selected = currencies.find((c) => c.currencyType === currency);
    const calculated = totalBalance / (selected?.amount as unknown as number);
    console.log(calculated, totalBalance, selected?.amount);
    setChangableBalance(calculated);
    setSelectedCurrency(currency);
  };

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
  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3,
              }}
              variant="h4"
            >
              Hesap Bakiyesi
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                {`${changableBalance.toFixed(2)} ${getCurrencyLabel(selectedCurrency)}`}
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4,
                }}
                alignItems="center"
              ></Box>
            </Box>
            <Grid container spacing={3}>
              {/* contained */}
              {currencies.map((currency) => (
                <Grid key={currency.id} sm item>
                  <Button
                    fullWidth
                    onClick={(e) => changeCurrency(currency.currencyType)}
                    variant={selectedCurrency == currency.currencyType ? "contained" : "outlined"}
                  >
                    {currency.currencyType}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: "relative",
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Box
            component="span"
            sx={{
              display: { xs: "none", md: "inline-block" },
            }}
          >
            <Divider absolute orientation="vertical" />
          </Box>
          <Box py={4} pr={4} flex={1}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={5} item display="flex" justifyContent="center" alignItems="center">
                <Chart height={250} options={chartOptions} series={chartSeries} type="donut" />
              </Grid>
              <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List
                  disablePadding
                  sx={{
                    width: "100%",
                  }}
                >
                  {accounts.map((account) => {
                    const accountCurrency = currencies.find((currency) => currency.currencyType === account.currency)!;
                    const converted =
                      account.currency == CurrencyType.TRY
                        ? (account.balance as unknown as number) * 1
                        : (account.balance as unknown as number) * (accountCurrency.amount as unknown as number);
                    return (
                      <ListItem key={account.id} disableGutters>
                        <ListItemAvatarWrapper>
                          <Image
                            alt={account.currency}
                            src={`/static/images/placeholders/logo/${account.currency.toLowerCase()}.png`}
                          />
                        </ListItemAvatarWrapper>
                        <ListItemText
                          primary={getAccountTypeLabel(account.type)}
                          primaryTypographyProps={{ variant: "h5", noWrap: true }}
                          secondary={`${account.currency}`}
                          secondaryTypographyProps={{
                            variant: "subtitle2",
                            noWrap: true,
                          }}
                        />
                        <Box>
                          <Typography align="right" variant="h4" noWrap>
                            {`${account.balance} ${account.currency} `}
                          </Typography>
                          <Typography align="right">{converted.toFixed(2)} TRY</Typography>
                        </Box>
                      </ListItem>
                    );
                  })}
                  {/*
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img alt="XRP" src="/static/images/placeholders/logo/ripple.png" />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="XRP"
                      primaryTypographyProps={{ variant: "h5", noWrap: true }}
                      secondary="Ripple"
                      secondaryTypographyProps={{
                        variant: "subtitle2",
                        noWrap: true,
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        10%
                      </Typography>
                      <Text color="error">-1.22%</Text>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img alt="ADA" src="/static/images/placeholders/logo/cardano.png" />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="ADA"
                      primaryTypographyProps={{ variant: "h5", noWrap: true }}
                      secondary="Cardano"
                      secondaryTypographyProps={{
                        variant: "subtitle2",
                        noWrap: true,
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        40%
                      </Typography>
                      <Text color="success">+10.50%</Text>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img alt="ETH" src="/static/images/placeholders/logo/ethereum.png" />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="ETH"
                      primaryTypographyProps={{ variant: "h5", noWrap: true }}
                      secondary="Ethereum"
                      secondaryTypographyProps={{
                        variant: "subtitle2",
                        noWrap: true,
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        30%
                      </Typography>
                      <Text color="error">-12.38%</Text>
                    </Box>
                  </ListItem> */}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
