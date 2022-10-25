import { trpc } from "@/utils/trpc";
import { Card } from "@mui/material";
import { BankAccount, Money } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import BankAccountsTable from "./BankAccountsTable";

interface BankAccountProps {}

const BankAccounts: FC<BankAccountProps> = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [currencies, setCurrencies] = useState<Money[]>([]);
  const data = trpc.useQuery(["account.list"]);
  const currencyData = trpc.useQuery(["currency.list"]);

  useEffect(() => {
    if (data.status == "success" && data.isSuccess) {
      if (data.data.accounts.length <= 0) toast.error("Hesap bulunamadı.");
      setAccounts(data.data.accounts);
    }
  }, [data.isLoading]);

  useEffect(() => {
    if (currencyData.status == "success" && currencyData.isSuccess) {
      if (currencyData.data.currencies.length <= 0) return;
      setCurrencies(currencyData.data.currencies);
    }
  }, [currencyData.isLoading]);

  return (
    <Card>
      {data.isLoading && currencyData.isLoading ? (
        <div>Yükleniyor...</div>
      ) : (
        <BankAccountsTable bankAccounts={data.data?.accounts!} currencyData={currencyData.data?.currencies!} />
      )}
    </Card>
  );
};

export default BankAccounts;
