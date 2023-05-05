// eslint-disable-next-line
import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../../../../node_modules/axios/index';
import { Table, Tag } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Carousel from 'react-material-ui-carousel';

//helmet
import { Helmet } from 'react-helmet';

import { Grid, Typography, Button } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import Creditcard from 'components/BankCards/CreditCard';
import MainCard from 'components/MainCard';

const DebitUse = () => {
    const { Column } = Table;

    //List Cards

    const [cards, setCards] = useState([]);
    const [selectedCard, setselectedCard] = useState([]);
    const [reCard, setRecard] = useState(0);
    

    useEffect(() => {
        try {
            axios.get(`http://localhost:8080/api/accounts/debit/getByCustomerId?id=${localStorage.getItem('id')}`).then((resp) => {
                setCards(resp.data);
            });
        } catch (error) {
            console.error(err.message);
        }
    }, [reCard]);

    // Select Card

    const [id, setAccountId] = useState(0);

   

    useEffect(() => {
        toast.success('Debit Card is selected !');
    }, [id]);

   

    const onClickAppeal = async (price, name, type, id ) => {
        //e.preventDefault();
        setselectedCard(cards.filter((item) => item.accountId == id));
        
        try {
    

            const body = {
                destinationId: id,
                accountId: selectedCard[0],
                amount: price,
                transactionName: name,
                typeId: type
            };

            
                axios.post('http://localhost:8080/api/accounts/transaction/add', body).then((resp) => {
                    if (resp.data.status) {
                        toast.success('Card is used !');
                    } else {
                        toast.error('Error !');
                    }
                    setRecard(reCard + 1);
                });
           
        } catch (err) {
            console.error(err.message);
        }
    };

    // initial values

    const initialValues = [
        {
            id: 1,
            name: 'Get Salery',
            price: 5000,
            type: {
                typeId: 1,
                typeName: "+"
            }
        },
        {
            id: 2,
            name: 'Passive Income',
            price: 1000,
            type: {
                typeId: 1,
                typeName: "+"
            }
        },
        {
            id: 3,
            name: 'Buy Mobile Phone',
            price: 350,
            type: {
                typeId: 2,
                typeName: "-"
            }
        },
        {
            id: 4,
            name: 'Pay Bills',
            price: 1000,
            type: {
                typeId: 2,
                typeName: "-"
            }
        },
        {
            id: 5,
            name: 'Market',
            price: 100,
            type: {
                typeId: 2,
                typeName: "-"
            }
        },
        {
            id: 6,
            name: 'Hobies',
            price: 500,
            type: {
                typeId: 2,
                typeName: "-"
            }
        }
    ];

    return (
        <>
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
                            <Typography variant="h5">Use Debit Card</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <Table dataSource={initialValues}>
                            <Column title="Transaction No" dataIndex="id" key="id" />
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column title="Amount ($)" dataIndex="price" key="price" />
                            <Column
                                title="Type"
                                render={(_, record) => {
                                    if (record.type.typeId == 1) {
                                        return <Tag color="success">+</Tag>;
                                    } else {
                                        return <Tag color="error">-</Tag>;
                                    }
                                }}
                            />
                            <Column
                                title="Manage"
                                render={(_, record) => (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => {
                                            onClickAppeal(record.price, record.name, record.type, id);
                                        }}
                                    >
                                        Use
                                    </Button>
                                )}
                            />
                        </Table>
                    </MainCard>
                </Grid>

                <Helmet>
                    <title>E-Bank ✦ Use Debit Card ✦</title>
                </Helmet>
            </Grid>
            <ToastContainer />
        </>
    );
};

export default DebitUse;
