import SelectInput from "@/components/SelectInput/SelectInput";
import { trpc } from "@/utils/trpc";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Dialog, DialogContent, DialogTitle, Grid, MenuItem } from "@mui/material";
import { BankAccountType, CurrencyType } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface OpenAccountDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

type Inputs = {
  type: BankAccountType;
  currency: CurrencyType;
};

const OpenAccountDialog: FC<OpenAccountDialogProps> = ({ onClose, isOpen }) => {
  const utils = trpc.useContext();
  const addAccountMutation = trpc.useMutation(["account.create"]);
  const handleClose = () => {
    onClose();
  };
  const router = useRouter();
  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await addAccountMutation.mutateAsync(data);
      toast.success(response.message);
      const timer = setTimeout(() => {
        router.reload();
        clearTimeout(timer);
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
    handleClose();
  };

  const currencies = [
    {
      value: CurrencyType.USD,
      label: "Dolar",
    },
    {
      value: CurrencyType.EUR,
      label: "Euro",
    },
    {
      value: CurrencyType.TRY,
      label: "Türk Lirası",
    },
    {
      value: CurrencyType.GLD,
      label: "Altın",
    },
  ];

  const account_types = [
    {
      value: BankAccountType.CURRENT,
      label: "Cari Hesap",
    },
    {
      value: BankAccountType.SAVINGS,
      label: "Vadeli Hesap",
    },
  ];

  return (
    <Dialog onClose={handleClose} open={isOpen} fullWidth={true}>
      <DialogTitle>Hesap Aç</DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <Grid
            item
            container
            justifyContent="center"
            rowSpacing={5}
            sx={{
              maxWidth: { sm: "45rem" },
              marginInline: "auto",
            }}
          >
            <Grid item xs={12} sm={6}>
              <Box
                display="flex"
                flexDirection="column"
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <SelectInput label={"Hesap Türü"} name={"type"} mt={2} required>
                  {account_types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </SelectInput>

                <SelectInput label={"Hesap Kuru"} name={"currency"} required>
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </SelectInput>

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
                  Hesap Aç
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

OpenAccountDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default OpenAccountDialog;
