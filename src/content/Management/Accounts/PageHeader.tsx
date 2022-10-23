import { Button, Grid, Typography } from "@mui/material";

import { useAuthContext } from "@/context/AuthContext";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useState } from "react";
import OpenAccountDialog from "./OpenAccountDialog";

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
          Hesaplarım
        </Typography>
        <Typography variant="subtitle2">{user?.name}, size ait olan tüm hesapları buradan yönetebilirsiniz.</Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={handleClickOpen}
        >
          Hesap Aç
        </Button>

        <OpenAccountDialog isOpen={addAccountOpen} onClose={handleClose} />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
