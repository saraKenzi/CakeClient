import React from 'react';
import { Typography, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Joi, { number } from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form"
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, validateAddress } from './orderSlice';
import { addOrder } from './orderApi';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';




const AddressStep = () => {

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    const schema = Joi.object({
        city: Joi.string()
            .required().messages({ 'string.empty': ' שדה חובה' }),

        street: Joi.string().required().messages({ 'string.empty': ' שדה חובה' }),

        streetNum: Joi.number()
            .required()
            .required().messages({
                'number.base': 'צריך להכיל מספר ',
                'any.required': '  שדה חובה'
            }),
        zip: Joi.number()
            .required().messages({
                'number.base': 'צריך להכיל מספר ',
                'any.required': '  שדה חובה'
            }),
        apartmentNum: Joi.number()
            .required().messages({
                'number.base': 'צריך להכיל מספר ',
                'any.required': '  שדה חובה'
            }),
        floorNum: Joi.number()
            .required().messages({
                'number.base': 'צריך להכיל מספר ',
                'any.required': '  שדה חובה'
            })
    })

    let { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "all"
        ,
        resolver: joiResolver(schema)
    });

    let dispatch = useDispatch();
    let order = useSelector(state => state.order);
    let basket = useSelector(state => state.order.basket);
    let userFromRedux = useSelector(state => state.user.currentUser);
    // let user = localStorage.getItem("currentUser");


    const sendOrder = async (data) => {
        console.log(data);
        try {
            dispatch(addAddress(data));
            console.log(userFromRedux);

            let userToken = userFromRedux.token;
            console.log("token: " + userToken + "/n order: " + order.address);
            console.log(order);
            let deliveryDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
            let ordertoServer = { address: data, products: basket, deliveryDate }
            console.log(ordertoServer);
            let addOrderFromClient = await addOrder(ordertoServer, userToken);
            if (addOrderFromClient) {
                handleClick(SlideTransition, "יש! ההזמנה תקינה לחץ על המשך הזמנה!")();
                dispatch(validateAddress())
            }


        }
        catch (err) {
            handleClick(SlideTransition, err.response.data.message)();
        }
    }


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
        <div
            style={{ margin: "auto", marginTop: "1%", maxWidth: "400px" }}>
            <CacheProvider value={cacheRtl}>
                <div>
                    <Typography variant="h5" gutterBottom>
                        הזן כתובת למשלוח:
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(sendOrder)}
                        sx={{ width: 400 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    label="עיר"
                                    placeholder="הכנס את שם העיר"
                                    {...register("city")}
                                    error={!!errors.city}
                                    helperText={errors.city && errors.city.message}

                                />
                            </Grid>

                            <Grid item xs={8}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    label="רחוב"
                                    placeholder="הכנס שם הרחוב"
                                    {...register("street")}
                                    error={!!errors.street}
                                    helperText={errors.street && errors.street.message}

                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    label="מספר רחוב"
                                    placeholder="הכנס מספר רחוב"
                                    {...register("streetNum")}
                                    error={!!errors.streetNum}
                                    helperText={errors.streetNum && errors.streetNum.message}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    label="מספר דירה"
                                    placeholder="הכנס מספר דירה"
                                    {...register("apartmentNum")}
                                    error={!!errors.apartmentNum}
                                    helperText={errors.apartmentNum && errors.apartmentNum.message}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    label="קומה"
                                    placeholder="הכנס מספר קומה"
                                    {...register("floorNum")}
                                    error={!!errors.floorNum}
                                    helperText={errors.floorNum && errors.floorNum.message}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    label="מיקוד"
                                    placeholder="הכנס מיקוד"
                                    {...register("zip")}
                                    error={!!errors.zip}
                                    helperText={errors.zip && errors.zip.message}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth
                                    variant='outlined'
                                    type='submit'
                                >בדיקת משלוח לכתובת שצויינה</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
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
};

export default AddressStep;
