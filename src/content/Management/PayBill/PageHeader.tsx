import { Grid, Typography } from "@mui/material";

import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

function PageHeader() {
  const { user } = useAuthContext();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Fatura Öde
        </Typography>
        <Typography variant="subtitle2">{user?.name}, tüm fatura ödeme işlemlerinizi buradan yönetebilirsiniz.</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
