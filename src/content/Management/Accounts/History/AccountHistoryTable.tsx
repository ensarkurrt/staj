import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { FC, useEffect, useState } from "react";

import { trpc } from "@/utils/trpc";

import Label from "@/components/Label";
import { BankAccount, Transfer } from "@prisma/client";
import toast from "react-hot-toast";

interface AccountHistoryTableProps {
  className?: string;
  account: BankAccount;
}

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

const getStatusLabel = (isSent: boolean) => {
  if (isSent) {
    return <Label color="error">Gönderildi</Label>;
  } else {
    return <Label color="success">Alındı</Label>;
  }
};
const AccountHistoryTable: FC<AccountHistoryTableProps> = ({ account }) => {
  const theme = useTheme();

  const [transactions, setTransactions] = useState<Transfer[]>([]);
  const data = trpc.useQuery(["transaction.list", { accountId: account.id }]);
  useEffect(() => {
    if (data.status == "success" && data.isSuccess) {
      if (data.data.transactions.length <= 0) toast.error("Geçmiş herhangi bir işlem bulunamadı.");
      setTransactions(data.data.transactions);
    }
  }, [data.isLoading]);

  const amountLabel = (transaction: Transfer) => {
    return transaction.currency == account.currency ? (
      <>
        <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
          {`${transaction.amount} ${getCurrencyLabel(transaction.currency)}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {`${transaction.convertedAmount} ${getCurrencyLabel(transaction.toCurrency)}`}
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
          {`${transaction.convertedAmount} ${getCurrencyLabel(transaction.toCurrency)}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {`${transaction.amount} ${getCurrencyLabel(transaction.currency)}`}
        </Typography>
      </>
    );
  };
  return (
    <Card>
      {!data.isLoading && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gönderen</TableCell>
                <TableCell>Alıcı</TableCell>
                <TableCell>Miktar</TableCell>
                <TableCell>Açıklama</TableCell>
                <TableCell>İşlem Sonrası Bakiye</TableCell>
                <TableCell>İşlem Tipi</TableCell>
                <TableCell>İşlem Tarihi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 &&
                transactions.map((transaction) => {
                  const isSent = transaction.fromId === account.id;
                  return (
                    <TableRow hover key={transaction.id}>
                      <TableCell>
                        <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                          {transaction.fromName}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                          {transaction.toName}
                        </Typography>
                      </TableCell>
                      <TableCell>{amountLabel(transaction)}</TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="bold" color="text.primary" noWrap>
                          {`${transaction.description.substring(0, 50)} ${
                            transaction.description.length > 50 ? "..." : ""
                          }`}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color={`text.${isSent ? "error" : "success"}`}
                          gutterBottom
                          noWrap
                        >
                          {`${isSent ? transaction.fromAfterBalance : transaction.toAfterBalance} ${getCurrencyLabel(
                            account.currency
                          )}`}
                        </Typography>
                      </TableCell>

                      <TableCell>{getStatusLabel(isSent)}</TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                          {`${transaction.createdAt.toString().split("G")[0]}`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

AccountHistoryTable.propTypes = {
  account: PropTypes.any.isRequired,
};

export default AccountHistoryTable;
