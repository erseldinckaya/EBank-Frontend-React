// eslint-disable-next-line
import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { Table, Tag } from 'antd';

import Carousel from 'react-material-ui-carousel';

//helmet
import { Helmet } from 'react-helmet';

import { Grid, Typography, Button, Stack } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import Creditcard from 'components/BankCards/CreditCard';
import MainCard from 'components/MainCard';


const DebitDefault = () => {
    const { Column } = Table;

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

    //State
    const [accountId, setAccountId] = useState();
    const [transactions, setTransactions] = useState([]);
  

    useEffect(() => {
        try {
            axios.get(`http://localhost:8080/api/accounts/transaction/getByAccountId?id=${accountId}`).then((resp) => {
                console.log(resp);
                setTransactions(resp.data);
            });

           
        } catch (error) {
            console.error(err.message);
        }
    }, [accountId]);


    //For sorting
    const numDescending = [...transactions].sort((a, b) => b.transactionId - a.transactionId);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">My Debit Card</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Carousel cycleNavigation={false} autoPlay={false}>
                    {cards.map((item) => (
                        <Creditcard
                            id={item.accountId}
                            firstname={item.customer.firstName}
                            lastname={item.customer.lastName}
                            balance={item.balance}
                            number={item.cardNumber}
                            setAccountId={setAccountId}
                        />
                    ))}
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
                    <Table dataSource={numDescending}>
                        <Column title="Transaction No" dataIndex="transactionId" key="transactionId" />
                        <Column title="Name" dataIndex="transactionName" key="transactionName" />
                        <Column title="Date" dataIndex="transactionDate" key="transactionDate" />
                        <Column
                            title="Type"
                            render={(_, record) => {
                                if (record.typeId.typeId == 1) {
                                    return(
                                        <Tag color="success">+</Tag>
                                    );
                                } else {
                                    return(
                                        <Tag color="error">-</Tag>
                                    );
                                }
                            }}
                        />
                        <Column title="Amount" dataIndex="amount" key="amount" />
                    </Table>
                </MainCard>
            </Grid>

            <Helmet>
                <title>E-Bank ✦ Debit Card ✦</title>
            </Helmet>
        </Grid>
    );
};

export default DebitDefault;
