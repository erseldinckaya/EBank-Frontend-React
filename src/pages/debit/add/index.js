import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../node_modules/axios/index';
import {  Table } from 'antd';

// material-ui
import {
    Button,
    Grid,
    Stack,
    Typography
} from '@mui/material';

//helmet
import { Helmet } from 'react-helmet';


import MainCard from 'components/MainCard';

const DebitAdd = () => {
    const { Column, ColumnGroup } = Table;
    let navigate = useNavigate();

    //Create Card
    const onClickAppeal = async () => {
        //e.preventDefault();

        try {
            const body = {
                customerId: `${localStorage.getItem('id')}`
            };

            axios.post('http://localhost:8080/api/accounts/debit/add', body).then((resp) => {
                const data = resp.data;
                if (data.status) {
                    toast.success('Debit Card is created !');
                    setTimeout(() => {
                        navigate('/debit/main');
                    }, 1000);
                } else {
                    toast.error('Something is wrong !');
                }
            });
        } catch (err) {
            console.error(err.message);
        }
    };

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

    // Delete Card

    const deleteCard = async (id) => {
        axios.delete("http://localhost:8080/api/accounts/debit/delete?id="+id).then((resp) => {
            setCards(data => data.filter(item => item.accountId !== id))
            const data = resp.data;
            if (data.status) {
                toast.success('Debit Card is removed !');
            } else {
                toast.error('Something is wrong !');
            }
        })
    }

    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} md={7} lg={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Appeal Debit Card</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={true}>
                        <Stack spacing={2}>
                            <Typography variant="body">To appeal a debit card, press the button.</Typography>
                            <Button variant="contained" color="success" onClick={onClickAppeal}>
                                Appeal Card
                            </Button>
                        </Stack>
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
                            <Table dataSource={cards}>
                                <Column title="Card Number" dataIndex="cardNumber" key="cardNumber" />
                                <Column title="Card Expiration" dataIndex="expDate" key="expDate" />
                                <Column title="Created Date" dataIndex="openningDate" key="openningDate" />
                                <Column
                                    render={(_, record) => (
                                        <Button variant="contained" color="error" onClick={() => {deleteCard(record.accountId)}}>
                                        Remove Card
                                    </Button>
                                    )}
                                />
                            </Table>
                           
                        </Stack>
                    </MainCard>
                </Grid>

                <Helmet>
                    <title>E-Bank ✦ Debit Card Appeal ✦</title>
                </Helmet>
            </Grid>
            <ToastContainer />
        </>
    );
};

export default DebitAdd;
