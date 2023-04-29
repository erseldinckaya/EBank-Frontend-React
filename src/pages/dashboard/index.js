import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//helmet
import { Helmet } from 'react-helmet';

// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token") == null){
            navigate("/login");
        }
    }, [])
    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                {/* row 1 */}
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Latest Status</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Balance" count="$3000" percentage={59.3} extra="character" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Incomes" count="$5000" percentage={70.5} color="success" extra="character" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Expense" count="$2000" percentage={27.4} isLoss color="error" extra="character" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Debit" count="$35,078" percentage={27.4} isLoss color="warning" extra="character" />
                </Grid>

                <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

                {/* row 3 */}
                <Grid item xs={12} md={7} lg={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">All Transaction History</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <OrdersTable />
                    </MainCard>
                </Grid>

                <Helmet>
                    <title>E-Bank ✦ Dashboard ✦</title>
                </Helmet>
            </Grid>
        </>
    );
};

export default DashboardDefault;
