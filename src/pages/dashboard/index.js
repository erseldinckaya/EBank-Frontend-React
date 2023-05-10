import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../../node_modules/axios/index';
import { Table, Tag } from 'antd';
//helmet
import { Helmet } from 'react-helmet';

// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const { Column } = Table;

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate('/login');
        }
    }, []);

    const [values, setValues] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cardvalue/getByCustomerId?customerId=${localStorage.getItem('id')}`).then((resp) => {
            setValues(resp.data);
            console.log(resp.data);
        });

        axios
            .get(`http://localhost:8080/api/accounts/transaction/getByCustomerId?customerId=${localStorage.getItem('id')}`)
            .then((resp) => {
                console.log(resp);
                setTransactions(resp.data);
            });
    }, []);

    //For sorting
    const numDescending = [...transactions].sort((a, b) => b.transactionId - a.transactionId);
    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                {/* row 1 */}
                <Grid item xs={12} sx={{ mb: -2.25 }}>
                    <Typography variant="h5">Latest Status</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce
                        title="Balance"
                        count={'$' + values.balance}
                        percentage={27.4}
                        isLoss={!values.status}
                        extra="character"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce title="Incomes" count={'$' + values.incomes} percentage={70.5} color="success" extra="character" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticEcommerce
                        title="Expense"
                        count={'$' + values.expenses}
                        percentage={27.4}
                        isLoss
                        color="error"
                        extra="character"
                    />
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
                        <Table dataSource={numDescending}>
                            <Column title="Transaction No" dataIndex="transactionId" key="transactionId" />
                            <Column title="Name" dataIndex="transactionName" key="transactionName" />
                            <Column title="Date" dataIndex="transactionDate" key="transactionDate" />
                            <Column
                                title="Type"
                                render={(_, record) => {
                                    if (record.typeId.typeId == 1) {
                                        return <Tag color="success">+</Tag>;
                                    } else {
                                        return <Tag color="error">-</Tag>;
                                    }
                                }}
                            />
                            <Column title="Amount" dataIndex="amount" key="amount" />
                        </Table>
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
