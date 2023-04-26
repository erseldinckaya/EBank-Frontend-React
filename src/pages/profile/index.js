// eslint-disable-next-line
import React from 'react';



//helmet
import { Helmet } from 'react-helmet';

import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
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
                                    <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                                    <OutlinedInput
                                        id="firstname-login"
                                        type="firstname"
                                        disabled
                                        name="firstname"
                                        placeholder="John"
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                       
                                        id="lastname-signup"
                                        type="lastname"
                                        
                                        name="lastname"
                                        placeholder="Doe"
                                        disabled
                                       
                                    />
                                    
                                </Stack>
                            </Grid>
                           
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                       
                                        id="email-login"
                                        type="email"
                                        
                                        name="email"
                                        
                                        placeholder="demo@company.com"
                                        disabled
                                        
                                    />
                                  
                                </Stack>
                            </Grid>
                           
                            
                            
                        </Grid>
                    </form>
                </MainCard>
            </Grid>
           
          

            <Helmet>
                <title>E-Bank ✦ Debit Card ✦</title>
            </Helmet>
        </Grid>
    );
};

export default ProfileDefault;
