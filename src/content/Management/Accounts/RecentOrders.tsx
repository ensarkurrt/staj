import { trpc } from "@/utils/trpc";
import { Card } from "@mui/material";
import { BankAccount } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BankAccountsTable from "./BankAccountsTable";

function RecentOrders() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const data = trpc.useQuery(["account.list"]);
  useEffect(() => {
    if (data.status == "success" && data.isSuccess) {
      setAccounts(data.data.accounts);
    }
  }, [data.status]);

  return (
    <Card>
      {data.isLoading && <center>Yükleniyor...</center>}
      {accounts.length > 0 && <BankAccountsTable bankAccounts={accounts} />}
    </Card>
  );
}

export default RecentOrders;
