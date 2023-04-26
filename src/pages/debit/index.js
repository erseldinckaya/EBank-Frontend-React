// eslint-disable-next-line
import React from 'react';

import Carousel from 'react-material-ui-carousel';

//helmet
import { Helmet } from 'react-helmet';

import { Grid, Typography, Button, Stack } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import Creditcard from 'components/BankCards/CreditCard';
import MainCard from 'components/MainCard';
import OrdersTable from './OrdersTable';

const DebitDefault = () => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">My Debit Card</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Carousel cycleNavigation={false} autoPlay={false}>
                    <Creditcard />
                    <Creditcard />
                    <Creditcard />
                </Carousel>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Balance" count="$3000" percentage={27.4} extra="character" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Incomes" count="$5000" percentage={70.5} color="success" extra="character" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Expense" count="$2000" percentage={27.4} isLoss color="error" extra="character" />
            </Grid>

            <Grid item xs={12} md={7} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Transaction History</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable />
                </MainCard>
            </Grid>

            <Grid item xs={12} md={7} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Remove Debit Card</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={true}>
                    <Stack spacing={2}>
                        <Typography variant="body">To remove a debit card, first select the card you want above.</Typography>
                        <Button variant="contained" color="error">
                            Remove Card
                        </Button>
                    </Stack>
                </MainCard>
            </Grid>

            <Helmet>
                <title>E-Bank ✦ Debit Card ✦</title>
            </Helmet>
        </Grid>
    );
};

export default DebitDefault;
