import { trpc } from "@/utils/trpc";
import { Card } from "@mui/material";
import { BankAccount } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BankAccountsTable from "./BankAccountsTable";

function BankAccounts() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const data = trpc.useQuery(["account.list"]);
  useEffect(() => {
    if (data.status == "success" && data.isSuccess) {
      if (data.data.accounts.length <= 0) toast.error("Hesap bulunamadı.");
      setAccounts(data.data.accounts);
    }
  }, [data.isLoading]);

  return (
    <Card>
      {data.isLoading && <div>Yükleniyor...</div>}
      {!data.isLoading && <BankAccountsTable bankAccounts={accounts} />}
    </Card>
  );
}

export default BankAccounts;
