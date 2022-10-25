import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Card, CardContent, CardHeader, Divider, Grid, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import FormInput from "@/components/FormInput/FormInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import { trpc } from "@/utils/trpc";
import { BankAccount, BankAccountType, CurrencyType } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type Inputs = {
  bill_number: string;
  amount: number;
  accountId: string;
};

function PayBillContainer() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const data = trpc.useQuery(["account.list"]);
  useEffect(() => {
    if (data.status == "success" && data.isSuccess) {
      if (data.data.accounts.length <= 0) {
        toast.error("Fatura Ödeyebilmek için öncelikle bir banka hesabı açmalısınız.");
        setTimeout(() => {
          router.push("/management/accounts");
        }, 3000);
        return;
      }
      const _accounts = data.data.accounts
        .filter((account) => account.deletedAt == null)
        .filter((account) => account.type == BankAccountType.CURRENT);

      setAccounts(_accounts);

      if (_accounts.length <= 0) {
        toast.error("Fatura Ödeyebilmek için cari ve açık bir hesabınız bulunamadı!");
        setTimeout(() => {
          router.push("/management/accounts");
        }, 3000);
      }
    }
  }, [data.isLoading]);

  const currencies = [
    {
      value: CurrencyType.USD,
      label: "$",
    },
    {
      value: CurrencyType.EUR,
      label: "€",
    },
    {
      value: CurrencyType.TRY,
      label: "₺",
    },
  ];

  const getCurrencyLabel = (currency: CurrencyType) => {
    return currencies.filter((currencyItem) => currencyItem.value == currency)[0].label;
  };

  const methods = useForm<Inputs>();
  const transactionMutation = trpc.useMutation("transaction.create");
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      data.amount = parseFloat(data.amount.toString());
      const response = await transactionMutation.mutateAsync({
        description: `${data.bill_number} NO'lu fatura ödemesi yapıldı.`,
        toIban: "TR000000000000000000000000",
        ...data,
        name: "Fatura Kurumu",
      });
      toast.success(response.message);
      setTimeout(() => {
        router.push("/management/accounts").then(() => router.reload());
      }, 3000);
    } catch (error: Error | any) {
      if (error instanceof TRPCClientError) {
        try {
          toast.error(JSON.parse(error.message)[0].message);
        } catch {
          toast.error(error.message);
        }
      }
    }
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title="Input Fields" />
        <Divider />
        <CardContent>
          {data.isLoading && (
            <LoadingButton loading={true} variant="contained">
              Loading
            </LoadingButton>
          )}
          {accounts.length > 0 && (
            <FormProvider {...methods}>
              <Grid item container justifyContent="center" rowSpacing={5}>
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={methods.handleSubmit(onSubmit)}
                  >
                    <SelectInput
                      label={"Hesap Seçin"}
                      name={"accountId"}
                      mt={2}
                      onChanged={(val) => {
                        const account = accounts.filter((account) => account.id == val)[0];
                        setMaxAmount(parseFloat(account.balance.toString()));
                        console.log(account.balance);
                      }}
                      required
                    >
                      {accounts.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {`Cari Hesap - ${option.currency} Hesabı | ${option.balance} ${getCurrencyLabel(
                            option.currency
                          )}`}
                        </MenuItem>
                      ))}
                    </SelectInput>

                    <FormInput name={"bill_number"} label={"Fatura No"} type={"text"} required />
                    <FormInput name={"amount"} label={"Tutar"} type={"number"} max={maxAmount} required />

                    <LoadingButton
                      loading={methods.formState.isSubmitting}
                      type="submit"
                      variant="contained"
                      sx={{
                        py: "0.8rem",
                        mt: 2,
                        width: "80%",
                        marginInline: "auto",
                      }}
                    >
                      Gönder
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </FormProvider>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PayBillContainer;
