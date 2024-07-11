import { useForm } from "react-hook-form"
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import './userCss/login.css';
import { sendMailForUser, signUpInServer } from "./userApi";
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

const SendMail = () => {

    const sendMail = async (data) => {
        try {
            let x = await sendMailForUser(data);
            console.log("succses!!")
        }
        catch (err) {
            console.log(err);
            alert(":("  + err)
        }
    }

    let { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "all",

        // resolver: joiResolver(schema)
    });

    return (<>
        <Box
            component="form"
            onSubmit={handleSubmit(sendMail)}
            sx={{ mt: 2 }}
        >
            <TextField
                sx={{
                    mb: 1
                }}
                id="outlined-start-adornment"
                label="אימייל"
                type="email"
                // error={!!errors.password}
                {...register("email")}

            />
            {/* {errors.email && <span className="errMsg">{errors.email.message}</span>} */}
            <Button variant="outlined"
                type="submit" sx={{ minWidth: "40%", mb: 3, mt: 2 }}
            >אני רוצה לאפס  את הסיסמא</Button>
        </Box>
    </>);
}

export default SendMail;