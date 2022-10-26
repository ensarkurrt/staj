import { useAuthContext } from "@/context/AuthContext";
import { Avatar, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function PageHeader() {
  const { user } = useAuthContext();
  const theme = useTheme();

  function getCurrentDate(separator = "") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`;
  }
  return (
    user && (
      <Grid container alignItems="center">
        <Grid item>
          <Avatar
            sx={{
              mr: 2,
              width: theme.spacing(8),
              height: theme.spacing(8),
            }}
            variant="rounded"
            alt={user.name}
          />
        </Grid>
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            Hoşgeldin, {user.name}!
          </Typography>
          <Typography variant="subtitle2">Tarih: {getCurrentDate("/")}</Typography>
        </Grid>
      </Grid>
    )
  );
}

export default PageHeader;
