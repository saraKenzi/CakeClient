import { useForm } from "react-hook-form"
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import './userCss/login.css';
import { loginInServer, passwordRecoveryInServer } from "./userApi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { userIn } from "./userSlice";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';





const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const PasswordRecovery = () => {

    ///loading
    const [open, setOpen] = React.useState(false);
    const handleClose2 = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    ////

    let dispatch = useDispatch();

    const schema = Joi.object({
        userName: Joi.string()
            .min(3).message("שם משתמש חייב להכיל 3 תווים לפחות")
            .max(20).message("שם משתמש-עד 20 תוים")
            .required().messages({ 'string.empty': 'שדה זה הוא שדה חובה' }),
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).message("סיסמא חייבת להיות בת 8 תווים! מורכבת: מאותיות גדולות,אותיות קטנות ומספרים ")
            .required().messages({ 'string.empty': 'שדה זה הוא שדה חובה' }),

    });


    let { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "all",

        resolver: joiResolver(schema)
    });

    const [welcome, setWelcome] = useState(false);
    let navigate = useNavigate();
    const passwordRecovery = async (data) => {
        try {
            console.log(data);
            // handleOpen();
            // let res = await passwordRecoveryInServer(data);//מנסה למצוא משהו כזה במערכת
            // setOpen(false);
            // setWelcome(true);
            // dispatch(userIn(res.data));
            // setTimeout(() => {
            //     navigate("/");

            // }, 3000)

        }
        catch (err) {
            setOpen(false);
            handleClick(SlideTransition, err.response.data.message)();

        }
    }
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
        successMessage: "",
    });

    const handleClick = (Transition, message) => () => {
        setState({
            open: true,
            Transition,
            successMessage: message,
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };



    return (
        <>

            <CacheProvider value={cacheRtl}>
                {welcome &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <img style={{ width: '50%' }} src={'../pic/png/welcom.jpg'} alt='welcome' />
                    </div>}

                {!welcome && <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "85vh" }}>
                    <img src={'https://kenzisserver.onrender.com/png/loginLogo.png'} alt='logo' style={{ width: "10%" }} />

                    <Box
                        component="form"
                        onSubmit={handleSubmit(passwordRecovery)}
                        sx={{ mt: 2 }}
                    >

                        <TextField sx={{
                            mb: 1
                            // , minWidth: "42%"
                        }}
                            // required
                            id="outlined-start-adornment"
                            label="שם משתמש"
                            error={!!errors.password}
                            {...register("userName", { required: { value: true, message: "gggg" } })}

                        />

                        {errors.userName && <span className="errMsg">{errors.userName.message}</span>}

                        <Box display="flex" alignItems="center" ml={16}  >
                            <Typography fontSize={12}>להצגת הסיסמא</Typography>
                            <IconButton size="small"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </Box>

                        <TextField sx={{
                            mb: 1,
                            //  minWidth: "38%"
                        }}
                            // required
                            id="outlined-start-adornment"
                            label="סיסמא"
                            type={showPassword ? 'text' : 'password'}
                            error={!!errors.password}

                            // color={errors.password ? "error" : "primary"}
                            {...register("password")}


                        />
                        {errors.password && <span className="errMsg">{errors.password.message}</span>}


                        <Button variant="outlined"
                            type="submit" sx={{ minWidth: "40%", mb: 3, mt: 2 }}
                        >עדכון סיסמא</Button>
                    </Box>
                    <div className="textBelow">
                        <Link to="/logIn">עבור לדף כניסה</Link>
                    </div>


                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={handleClose2}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>

                </Box >}
                <div>
                    {state.open && <Snackbar
                        open={state.open}
                        onClose={handleClose}
                        TransitionComponent={state.Transition}
                        message={state.successMessage}
                        key={state.Transition.name}
                        autoHideDuration={3000}
                    />}
                </div>

            </CacheProvider>





        </>
    );
}

export default PasswordRecovery;