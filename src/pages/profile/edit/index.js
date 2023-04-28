import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../../node_modules/axios/index';
//import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';


//helmet
import { Helmet } from 'react-helmet';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
//import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
//import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';


const ProfileEdit = () => {

    const [inputs, setInputs] = useState({
        firstname: '',
        lastName: '',
        mail: '',
        phone: '',
        address: '',
        username: ''
    });

    const { firstName, lastName, mail, phone, address, username } = inputs;

    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitForm = async () => {
        //e.preventDefault();

        try {

            const body = {
                customerId : `${localStorage.getItem("id")}`,
                firstName,
                lastName,
                mail,
                phone,
                address,
                username
            };

            axios.put("http://localhost:8080/api/customer/update", body).then((resp) => {
                const data = resp.data;
                if (data.status) {
                    toast.success('Your profile is updated !');
                    console.log("çalıştı");
                } else {
                    toast.error('Somethin is wrong !')
                }
            });

        
        } catch (err) {
            console.error(err.message);
        }
    };






    return (
        <>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            
            <Grid item xs={12} md={7} lg={12}>
                <Grid item>
                    <Typography variant="h5">Edit Profile</Typography>
                </Grid>
                <MainCard sx={{ mt: 2 }} content={true}>
                <Formik
                initialValues={{
                    firstName: `${localStorage.getItem("firstname")}`,
                    lastname: `${localStorage.getItem("lastname")}`,
                    mail: `${localStorage.getItem("mail")}`,
                    phone: `${localStorage.getItem("phone")}`,
                    address: `${localStorage.getItem("address")}`,
                    username: `${localStorage.getItem("username")}`,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().max(255).required('First Name is required'),
                    lastname: Yup.string().max(255).required('Last Name is required'),
                    mail: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    phone: Yup.string().max(255).required('Phone is required'),
                    address: Yup.string().max(255).required('Address is required'),
                    username: Yup.string().max(255).required('Username is required'),
                })}
                onSubmit={async ({ setErrors, setStatus, setSubmitting }) => {
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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstName-signup">First Name*</InputLabel>
                                    <OutlinedInput
                                        id="firstName-signup"
                                        type="firstName"
                                        value={firstName}
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange;
                                            onChange(e);
                                        }}
                                        placeholder="John"
                                        fullWidth
                                        error={Boolean(touched.firstName && errors.firstName)}
                                    />
                                    {touched.firstName && errors.firstName && (
                                        <FormHelperText error id="helper-text-firstName-signup">
                                            {errors.firstName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastName-signup">Last Name*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        id="lastName-signup"
                                        type="lastName"
                                        value={lastName}
                                        name="lastName"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange;
                                            onChange(e);
                                        }}
                                        placeholder="Doe"
                                        inputProps={{}}
                                    />
                                    {touched.lastName && errors.lastName && (
                                        <FormHelperText error id="helper-text-lastName-signup">
                                            {errors.lastName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Company</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.company && errors.company)}
                                        id="company-signup"
                                        value={values.company}
                                        name="company"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Demo Inc."
                                        inputProps={{}}
                                    />
                                    {touched.company && errors.company && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.company}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid> */}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="mail-signup">Email Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.mail && errors.mail)}
                                        id="mail-login"
                                        type="mail"
                                        value={mail}
                                        name="mail"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange;
                                            onChange(e);
                                        }}
                                        placeholder="demo@company.com"
                                        inputProps={{}}
                                    />
                                    {touched.mail && errors.mail && (
                                        <FormHelperText error id="helper-text-mail-signup">
                                            {errors.mail}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone">Phone*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.phone && errors.phone)}
                                        id="phone"
                                        type="text"
                                        value={phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange;
                                            onChange(e);
                                        }}
                                        placeholder="12345678907"
                                        inputProps={{}}
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error id="helper-text-phone-signup">
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="username-signup">Username*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.username && errors.username)}
                                        id="username-signup"
                                        type="username"
                                        value={username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange;
                                            onChange(e);
                                        }}
                                        placeholder="Doe"
                                        inputProps={{}}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText error id="helper-text-username-signup">
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="address">Address*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.address && errors.address)}
                                        id="address"
                                        type="text"
                                        value={address}
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange;
                                            onChange(e);
                                        }}
                                        placeholder="Demetevler"
                                        inputProps={{}}
                                    />
                                    {touched.address && errors.address && (
                                        <FormHelperText error id="helper-text-address-signup">
                                            {errors.address}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </Grid> */}
                           
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Update
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
                <title>E-Bank ✦ Edit Profil ✦</title>
            </Helmet>
        </Grid>
        <ToastContainer />
        </>
    );
};

export default ProfileEdit;
