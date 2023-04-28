import React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../node_modules/axios/index';

// material-ui
import {
    Button,
    Checkbox,
    FormControlLabel,
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

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
//import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    let navigate = useNavigate();
    const [login, isLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            navigate('/dashboard/default');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login]);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            navigate('/dashboard/default');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [checked, setChecked] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const { username, password } = inputs;

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
                username,
                password
            };

            const response = await fetch('http://localhost:8080/api/auth/authenticate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const parseRes = await response.text();

            if (response.ok) {
                toast.success('Welcome to EBank !');
                localStorage.setItem('token', parseRes);
                isLogin(true);

                //Get user informations
                axios.get(`http://localhost:8080/api/customer/getByUsername?username=${body.username}`).then((resp) => {
                    const data = resp.data.data;
                    localStorage.setItem('id', data.customerId);
                    localStorage.setItem('firstname', data.firstName);
                    localStorage.setItem('lastname', data.lastName);
                    localStorage.setItem('phone', data.phone);
                    localStorage.setItem('address', data.address);
                    localStorage.setItem('mail', data.mail);
                    localStorage.setItem('creditpoint', data.creditPoint);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('role', data.role);
                });
            } else {
                toast.error('Something is wrong !');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(255).required('Username is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        onSubmitForm();
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="username">Username*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.username && errors.username)}
                                        id="username"
                                        type="text"
                                        value={username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            onChange(e);
                                        }}
                                        placeholder="Username"
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
                                    <InputLabel htmlFor="password">Password*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            onChange(e);
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
                            </Grid>

                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={(event) => setChecked(event.target.checked)}
                                                name="checked"
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label={<Typography variant="h6">Keep me sign in</Typography>}
                                    />
                                    <Link variant="h6" component={RouterLink} to="" color="text.primary">
                                        Forgot Password?
                                    </Link>
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
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption"> Login with</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid> */}
                        </Grid>
                    </form>
                )}
            </Formik>
            <ToastContainer />
        </>
    );
};

export default AuthLogin;
