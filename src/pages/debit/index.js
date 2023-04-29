// eslint-disable-next-line
import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';

import Carousel from 'react-material-ui-carousel';

//helmet
import { Helmet } from 'react-helmet';

import { Grid, Typography, Button, Stack } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import Creditcard from 'components/BankCards/CreditCard';
import MainCard from 'components/MainCard';
import OrdersTable from './OrdersTable';

const DebitDefault = () => {

    //List Cards

    const [cards, setCards] = useState([]);

    useEffect(() => {
        try {
            axios.get(`http://localhost:8080/api/accounts/debit/getByCustomerId?id=${localStorage.getItem('id')}`).then((resp) => {
                setCards(resp.data);
            });
        } catch (error) {
            console.error(err.message);
        }
    }, []);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">My Debit Card</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Carousel cycleNavigation={false} autoPlay={false}>
                    {
                        cards.map((item) => (
                            <Creditcard 
                            firstname={item.customer.firstName}
                            lastname={item.customer.lastName}
                            balance={item.balance}
                            number={item.cardNumber}
                            />
                        ))
                    }

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


            <Helmet>
                <title>E-Bank ✦ Debit Card ✦</title>
            </Helmet>
        </Grid>
    );
};

export default DebitDefault;
