import './productCss/AddProduct.css';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { Box, Grid, TextField, Button } from '@mui/material';
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import { addProduct } from './productApi';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';


// import '../user/userCss/login.css';




const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});




const AddProduct = () => {
    const schema = Joi.object({
        productName: Joi.string()
            .max(30).message('מקסימום 30  תווים')
            .required().messages({ 'string.empty': ' שדה חובה' }),

        allergens: Joi.string()
            .min(5).message("מינימום 5 תווים")
            .required().messages({ 'string.empty': ' שדה חובה' }),

        price: Joi.number()
            .min(10).message("מחיר מינימלי 10 שקל")
            .max(350).message('מחיר מקסימלי 350 שקל')
            .required().messages({
                'number.base': 'צריך להכיל מספר ',
                'any.required': '  שדה חובה'
            }),

        imgUrl: Joi.array().items(Joi.string()),

        description: Joi.string()
            .min(12).message("מינימום 12 תווים")
            .required().messages({ 'string.empty': ' שדה חובה' }),

        heatOrCoolInstructions: Joi.string()
            .min(12).message("מינימום 12 תווים")
            .max(100).message("מקסימום 100 תווים")
            .required().messages({ 'string.empty': ' שדה חובה' }),

        madeInDate: Joi.date()
            .required().messages({
                'date.base': '    תבנית תאריך לא חוקית',
                'any.required': ' נא להזין תאריך יצירה'
            }),

        category: Joi.string().valid('cakes', 'dessert', 'sweets')
            .required().messages({
                'string.empty': ' שדה חובה',
                'any.only': ' הקטגוריה חייבת להיות מתוך: cakes, dessert או sweets'

            }),
    })

    let { register, handleSubmit, formState: { errors } } = useForm({
        mode: "all",
        defaultValues: {
            // userName: "sara"
        }
        ,
        resolver: joiResolver(schema)
    });
    const [imgUrls, setImgUrls] = useState([]);

    // Function to handle changes in the image URLs
    const handleImgUrlChange = (index, value) => {
        const newUrls = [...imgUrls];
        newUrls[index] = value;
        setImgUrls(newUrls);
    };

    // Function to add a new image URL field
    const addImgUrlField = () => {
        setImgUrls([...imgUrls, ""]);
    };

    // Function to remove an image URL field
    const removeImgUrlField = (index) => {
        const newUrls = [...imgUrls];
        newUrls.splice(index, 1);
        setImgUrls(newUrls);
    };
    const user = useSelector(state => state.user.currentUser);
    const sendProduct = async (data) => {
        try {
            let token = user.token;
            console.log(token)
            let newProduct = { ...data, imgUrl: imgUrls };
            let addProductToDB = await addProduct(newProduct, token);
            if (addProductToDB)
                handleClick(SlideTransition, 'המוצר נוסף בהצלחה!')();
        }
        catch (err) {
            console.log(err.response.data.message)
            handleClick(SlideTransition, err.response.data.message)();

        }
    }


    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    const [state, setState] = useState({
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
    return (<div
        style={{ margin: "auto", marginTop: "1%", maxWidth: "400px" }}>

        <CacheProvider value={cacheRtl}>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <img src={'https://kenzisserver.onrender.com/png/addProduct.png'} alt='logo' style={{ width: "30%" }} />
            </div>
            <Box
                component="form"
                onSubmit={handleSubmit(sendProduct)}
                sx={{ width: 400 }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            style={{ textAlign: "center", direction: "rtl" }} margin='normal'
                            id="outlined-start-adornment"
                            label="שם המוצר"
                            placeholder="הקש שם מוצר"
                            {...register("productName")}
                            error={!!errors.productName}
                            helperText={errors.productName && errors.productName.message}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth

                            id="outlined-search"
                            label="מחיר"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">₪</InputAdornment>,
                            }}
                            {...register("price")}
                            error={!!errors.price}
                            helperText={errors.price && errors.price.message}

                        />
                    </Grid>

                    <Grid item xs={8}>
                        <TextField
                            fullWidth
                            id="outlined-search"
                            label="אלרגניים"
                            {...register("allergens")}
                            error={!!errors.allergens}
                            helperText={errors.allergens && errors.allergens.message}
                        />
                    </Grid>
                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            id="outlined-search"
                            label="תאור מוצר "
                            {...register("description")}
                            error={!!errors.description}
                            helperText={errors.description && errors.description.message}

                        />
                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            fullWidth
                            id="outlined-search"
                            label="הוראות חימום/קרור"
                            {...register("heatOrCoolInstructions")}
                            error={!!errors.heatOrCoolInstructions}
                            helperText={errors.heatOrCoolInstructions && errors.heatOrCoolInstructions.message}

                        />
                    </Grid>

                    <Grid item xs={6}>

                        <TextField
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            id="outlined-search"
                            {...register("madeInDate")}
                            label=" יוצר בתאריך"
                            type='date'
                            error={!!errors.madeInDate}
                            helperText={errors.madeInDate && errors.madeInDate.message}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-search"
                            label="קטגוריה"
                            {...register("category")}
                            error={!!errors.category}
                            helperText={errors.category && errors.category.message}
                        />
                    </Grid>


                    <Grid item xs={6}>
                        <TextField
                            fullWidth

                            id="outlined-search"
                            label="קישור לתמונה"
                            // {...register("imgUrl")}
                            // type='file'
                            // For handling array of image URLs
                            value={imgUrls[0]}
                            onChange={(e) => handleImgUrlChange(0, e.target.value)}
                            error={!!errors.imgUrl}
                            helperText={errors.imgUrl && errors.imgUrl.message}
                        />
                    </Grid>

                    {imgUrls.slice(1).map((url, index) => (
                        <div key={index}>
                            <Box sx={{ display: "flex" }}>
                                <Button className="xBtnStyle" aria-label="clear" onClick={() => removeImgUrlField(index)}>
                                    <ClearIcon fontSize="small" />
                                </Button>
                                <Grid item xs={12} width={332} ml={2} mt={2}>
                                    <TextField
                                        fullWidth
                                        id={`outlined-search-${index}`}
                                        label="קישור נוסף לתמונה"
                                        // type='file'
                                        value={url}
                                        onChange={(e) => handleImgUrlChange(index + 1, e.target.value)}
                                    />
                                </Grid>
                            </Box>

                        </div>
                    ))}
                </Grid>
                <div>
                    <Button onClick={addImgUrlField}>הוסף עוד תמונה</Button>
                </div>
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{ minWidth: "40%", mb: 3, mt: 2 }}
                >הוספת מוצר</Button>
            </Box>
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

    </div >);
}

export default AddProduct;