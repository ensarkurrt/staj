import { Grid, Typography } from "@mui/material";

import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";

function PageHeader() {
  const { user } = useAuthContext();

  const [addAccountOpen, setAddAccountOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setAddAccountOpen(true);
  };

  const handleClose = () => {
    setAddAccountOpen(false);
    /* Refresh the data */
  };

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
