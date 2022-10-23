import AccountHistoryTable from "@/content/Management/Accounts/History/AccountHistoryTable";
import { trpc } from "@/utils/trpc";
import { Card } from "@mui/material";
import { BankAccount } from "@prisma/client";
import PropTypes from "prop-types";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
interface AccountHistoryProps {
  accountId: string;
}

const AccountHistory: FC<AccountHistoryProps> = ({ accountId }) => {
  const [account, setAccount] = useState<BankAccount>();

  const accountsData = trpc.useQuery(["account.list"]);

  useEffect(() => {
    if (accountsData.status == "success" && accountsData.isSuccess) {
      if (accountsData.data.accounts.length <= 0) toast.error("Hesap Bulunamadı.");
      console.log(accountId);
      const account = accountsData.data.accounts.filter((account) => account.id == accountId)[0];
      console.log(account);
      setAccount(account);
    }
  }, [accountsData.isLoading]);
  return (
    <Card>
      {accountsData.isLoading && <div>Yükleniyor...</div>}
      {!accountsData.isLoading && account && <AccountHistoryTable account={account} />}
    </Card>
  );
};

AccountHistory.propTypes = {
  accountId: PropTypes.string.isRequired,
};

export default AccountHistory;
