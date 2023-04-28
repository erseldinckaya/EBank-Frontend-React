// eslint-disable-next-line
import React from 'react';

//helmet
import { Helmet } from 'react-helmet';

import {
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import MainCard from 'components/MainCard';

const ProfileDefault = () => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">My Profile</Typography>

                <MainCard>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">First Name</InputLabel>
                                    <OutlinedInput
                                        id="firstname-login"
                                        type="firstname"
                                        name="firstname"
                                        value={localStorage.getItem('firstname')}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup">Last Name</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="lastname-signup"
                                        type="lastname"
                                        value={localStorage.getItem('lastname')}
                                        name="lastname"
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email Address</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="email-login"
                                        type="email"
                                        name="email"
                                        value={localStorage.getItem('mail')}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone">Phone</InputLabel>
                                    <OutlinedInput fullWidth id="phone" type="phone" name="phone" value={localStorage.getItem('phone')} />
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="address">Address</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={localStorage.getItem('address')}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>

                    <Stack sx={{mt:5}}>
                        <Typography variant="h5">Your credit point is : {localStorage.getItem('creditpoint')}</Typography>
                    </Stack>
                </MainCard>
            </Grid>

            <Helmet>
                <title>E-Bank ✦ Profile ✦</title>
            </Helmet>
        </Grid>
    );
};

export default ProfileDefault;
