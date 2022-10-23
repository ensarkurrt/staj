import {Grid, Typography} from "@mui/material";

import {useAuthContext} from "@/context/AuthContext";

function PageHeader() {
    const {user} = useAuthContext();

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    İşlem Geçmişi
                </Typography>
                <Typography variant="subtitle2">{user?.name}, size ait olan hesabın işlem geçmişini buradan görüntüleyebilirsiniz.</Typography>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
