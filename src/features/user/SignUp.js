import { useForm } from "react-hook-form"
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import './userCss/login.css';
import { signUpInServer } from "./userApi";
import { useDispatch } from "react-redux";
import { userIn } from "./userSlice";
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';




const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
const SignUp = () => {
    let dispatch = useDispatch();
    const schema = Joi.object({
        userName: Joi.string()
            .min(3).message("שם משתמש חייב להכיל 3 תווים לפחות")
            .max(20).message("שם משתמש-עד 20 תוים")
            .required().messages({ 'string.empty': ' שדה חובה' }),
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).message("סיסמא חייבת להיות בת 8 תווים! מורכבת: מאותיות גדולות,אותיות קטנות ומספרים ")
            .required().messages({ 'string.empty': ' שדה חובה' }),
        email: Joi.string().email({ tlds: { allow: false } }).message("אימייל לא חוקי")
        .required().messages({ 'string.empty': ' שדה חובה' }),
        startEnterDate: Joi.date()
    });

    let { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "all",
        defaultValues: {
            // userName: "sara"
        }
        ,
        resolver: joiResolver(schema)
    });
    ///loading
    const [open, setOpen] = React.useState(false);
    const handleClose2 = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    ////

    const [welcome, setWelcome] = useState(false);
    let navigate = useNavigate();

    const signup = async (data) => {
        console.log(data);
        try {
            handleOpen();
            let res = await signUpInServer(data);
            // alert(res.data+"התחברת  בהצלחה");
            setOpen(false);
            setWelcome(true)
            dispatch(userIn(res.data));
            setTimeout(() => {
                navigate("/");

            }, 3000)
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


    return (<div className="signUp">
        <CacheProvider value={cacheRtl}>
            {welcome &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <img style={{ width: '50%' }} src={'https://kenzisserver.onrender.com/png/welcom.png'} alt='welcome' />
                </div>}

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "85vh" }}>
                <img src={'https://kenzisserver.onrender.com/png/signupLogo.png'} alt='logo' style={{ width: "10%" }} />

                <Box
                    component="form"
                    onSubmit={handleSubmit(signup)}
                    sx={{ mt: 2 }}
                >

                    <TextField sx={{
                        mb: 1
                        // , minWidth: "42%"
                    }}
                        // required
                        id="outlined-start-adornment"
                        label="שם משתמש"
                        error={!!errors.userName}
                        {...register("userName")}

                    />

                    {errors.userName && <span className="errMsg">{errors.userName.message}</span>}
                    <TextField sx={{
                        mb: 1,
                        //  minWidth: "38%"
                    }}
                        // required
                        id="outlined-start-adornment"
                        label="אימייל"
                        type="email"
                        error={!!errors.email}

                        {...register("email")}

                    />
                    {errors.email && <span className="errMsg">{errors.email.message}</span>}
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

                        {...register("password")}

                    />
                    {errors.password && <span className="errMsg">{errors.password.message}</span>}





                    <Button variant="contained"
                        type="submit" sx={{ minWidth: "40%", mb: 3, mt: 2 }}
                    >הרשמה</Button>
                </Box>
                <div >
                    {/* <Link to="/SendMail">שכחתי סיסמא / </Link> */}
                    <Link to="/logIn">כבר נרשמתי בעבר</Link>
                </div>
            </Box >

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose2}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

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
    </div>
    );
}
export default SignUp;



