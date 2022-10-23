import { Grid, Typography } from "@mui/material";

import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

function PageHeader() {
  const { user } = useAuthContext();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Para Gönder
        </Typography>
        <Typography variant="subtitle2">{user?.name}, tüm para gönderme işlemlerinizi buradan yönetebilirsiniz.</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
