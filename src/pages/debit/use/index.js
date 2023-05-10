// eslint-disable-next-line
import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../../../../node_modules/axios/index';
import { Table, Tag } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Carousel from 'react-material-ui-carousel';

import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';

//helmet
import { Helmet } from 'react-helmet';

import { Grid, Typography, Button, Stack, InputLabel, OutlinedInput, FormControl, Box, FormHelperText } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import Creditcard from 'components/BankCards/CreditCard';
import MainCard from 'components/MainCard';

const DebitUse = () => {
    const { Column } = Table;

    //List Cards

    const [cards, setCards] = useState([]);
    const [selectedCard, setselectedCard] = useState([]);
    const [reCard, setRecard] = useState(0);
    const [values, setValues] = useState([]);
    // Select Card

    const [id, setAccountId] = useState(0);

    useEffect(() => {
        try {
            axios.get(`http://localhost:8080/api/accounts/debit/getByCustomerId?id=${localStorage.getItem('id')}`).then((resp) => {
                setCards(resp.data);
            });
        } catch (error) {
            console.error(err.message);
        }
    }, [reCard]);

    useEffect(() => {
        toast.success('Debit Card is selected !');
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cardvalue/getById?id=${id}`).then((resp) => {
            setValues(resp.data);
        });
    }, [id, reCard]);

    const onClickAppeal = async (price, name, type, id) => {
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
                typeName: '+'
            }
        },
        {
            id: 2,
            name: 'Passive Income',
            price: 1000,
            type: {
                typeId: 1,
                typeName: '+'
            }
        },
        {
            id: 3,
            name: 'Buy Mobile Phone',
            price: 350,
            type: {
                typeId: 2,
                typeName: '-'
            }
        },
        {
            id: 4,
            name: 'Pay Bills',
            price: 1000,
            type: {
                typeId: 2,
                typeName: '-'
            }
        },
        {
            id: 5,
            name: 'Market',
            price: 100,
            type: {
                typeId: 2,
                typeName: '-'
            }
        },
        {
            id: 6,
            name: 'Hobies',
            price: 500,
            type: {
                typeId: 2,
                typeName: '-'
            }
        }
    ];

    // Send Money

    const [cardNo, setcardNo] = useState(0);
    const [inputs, setInputs] = useState({
        transactionName:'',
        cardNumber: '',
        amount: '',
        type: {
            typeId: 2,
            typeName: '-'
        }
    });

    const { cardNumber, amount, transactionName, type } = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitForm = async (e) => {
        //e.preventDefault();
    
        try {
            const no = cardNumber.substring(0,4) + "%20" + cardNumber.substring(4,8) + "%20" + cardNumber.substring(8,12) + "%20" + cardNumber.substring(12,16);
            

            await axios.get(`http://localhost:8080/api/accounts/debit/getDebitAccountByCardNumber?cardNumber=${no}`).then((resp) => {
                setcardNo(resp.data);
            });

            setselectedCard(cards.filter((item) => item.accountId == id));


            const body = {
                destinationId: cardNo.accountId,
                accountId: selectedCard[0],
                amount: amount,
                transactionName: transactionName,
                typeId: type
            };

            

            await axios.post('http://localhost:8080/api/accounts/transaction/add', body).then((resp) => {
                if (resp.data.status) {
                    toast.success('Process is success !');
                } else {
                    toast.error('Error !');
                }
                setRecard(reCard + 1);
            });


        } catch (err) {
          console.error(err.message);
        }
      };

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

                <Grid item xs={12} md={7} lg={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Send Money</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={true}>
                        <Formik
                            initialValues={{
                                cardNumber: '',
                                amount: '',
                                transactionName: '',
                                submit: null
                            }}
                            validationSchema={Yup.object().shape({
                                cardNumber: Yup.string().max(255).required('First Name is required'),
                                amount: Yup.string().max(255).required('Last Name is required'),
                                transactionName: Yup.string().max(255).required('Title is required')
                            })}
                            onSubmit={async (inputs, { setErrors, setStatus, setSubmitting }) => {
                                try {
                                    setStatus({ success: false });
                                    setSubmitting(false);
                                    onSubmitForm();
                                } catch (err) {
                                    console.error(err);
                                    setStatus({ success: false });
                                    setErrors({ submit: err.message });
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="cardNumber-signup">Card Number*</InputLabel>
                                                <OutlinedInput
                                                    id="cardNumber-login"
                                                    type="number"
                                                    value={cardNumber}
                                                    name="cardNumber"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        onChange(e);
                                                    }}
                                                    placeholder="8168908484829972"
                                                    fullWidth
                                                    error={Boolean(touched.cardNumber && errors.cardNumber)}
                                                />
                                                {touched.cardNumber && errors.cardNumber && (
                                                    <FormHelperText error id="helper-text-cardNumber-signup">
                                                        {errors.cardNumber}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="amount-signup">Amount*</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.amount && errors.amount)}
                                                    id="amount-signup"
                                                    type="amount"
                                                    value={amount}
                                                    name="amount"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        onChange(e);
                                                    }}
                                                    placeholder="100"
                                                    inputProps={{}}
                                                />
                                                {touched.amount && errors.amount && (
                                                    <FormHelperText error id="helper-text-amount-signup">
                                                        {errors.amount}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="transactionName-signup">Title*</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.transactionName && errors.transactionName)}
                                                    id="transactionName-signup"
                                                    type="text"
                                                    value={transactionName}
                                                    name="transactionName"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        onChange(e);
                                                    }}
                                                    placeholder="My Debit"
                                                    inputProps={{}}
                                                />
                                                {touched.transactionName && errors.transactionName && (
                                                    <FormHelperText error id="helper-text-transactionName-signup">
                                                        {errors.transactionName}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>

                                        {errors.submit && (
                                            <Grid item xs={12}>
                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                            </Grid>
                                        )}

                                        <Grid item xs={12}>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Send Money
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </form>
                            )}
                        </Formik>
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
