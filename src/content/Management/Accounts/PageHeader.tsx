import { Button, Grid, Typography } from "@mui/material";

import { useAuthContext } from "@/context/AuthContext";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

function PageHeader() {
  const { user } = useAuthContext();
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Hesaplarım
        </Typography>
        <Typography variant="subtitle2">{user?.name}, size ait olan tüm hesapları buradan yönetebilirsiniz.</Typography>
      </Grid>
      <Grid item>
        <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained" startIcon={<AddTwoToneIcon fontSize="small" />}>
          Hesap Aç
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
