import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { FC } from "react";

import Label from "@/components/Label";
import Link from "@/components/Link";
import { Visibility } from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import { BankAccount, BankAccountType, CurrencyType, Money } from "@prisma/client";

interface BankAccountsTableProps {
  className?: string;
  bankAccounts: BankAccount[];
  currencyData: Money[];
}

const getAccountTypeString = (type: BankAccountType) => {
  switch (type) {
    case BankAccountType.CURRENT:
      return "Cari";
    case BankAccountType.SAVINGS:
      return "Vadeli";
  }
};

const getStatusLabel = (isDeleted: boolean) => {
  if (isDeleted) {
    return <Label color="error">Kapalı</Label>;
  } else {
    return <Label color="success">Aktif</Label>;
  }
};

const BankAccountsTable: FC<BankAccountsTableProps> = ({ bankAccounts, currencyData }) => {
  const theme = useTheme();

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hesap</TableCell>
              <TableCell>IBAN</TableCell>
              <TableCell align="right">Bakiye</TableCell>
              <TableCell align="right">Durum</TableCell>
              <TableCell align="right">İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bankAccounts.length > 0 &&
              bankAccounts.map((account) => {
                const currency: Money = currencyData.find((c) => c.currencyType == account.currency)!;
                const balanceTRY =
                  account.currency == CurrencyType.TRY
                    ? account.balance
                    : ((account.balance as unknown as number) * (currency.amount as unknown as number)).toFixed(2);
                /* account.balance = new Prisma.Decimal(account.balance.toNumber() * currency.amount.toNumber()); */
                return (
                  <TableRow hover key={account.id}>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                        {`${getAccountTypeString(account.type)} Hesap`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {`${account.currency} Hesabı`}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Tooltip title={account.iban} arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <Label color="info">
                            <Visibility fontSize="small" /> IBAN Göster
                          </Label>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                        {`${account.balance} ${account.currency}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {`${balanceTRY} TRY`}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{getStatusLabel(account.deletedAt != null)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Hesap Özeti" arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <Link href={`/management/accounts/${account.id}`}>
                            <HistoryIcon fontSize="small" />
                          </Link>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

BankAccountsTable.propTypes = {
  bankAccounts: PropTypes.array.isRequired,
};

BankAccountsTable.defaultProps = {
  bankAccounts: [],
};

export default BankAccountsTable;
