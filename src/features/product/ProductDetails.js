import { useNavigate, useLocation } from "react-router-dom";
import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

import Box from '@mui/material/Box';

import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import SmallBasket from "../order/SmallBasket";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { addProductToBasket } from "../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
// import Carsole from "./Carsole";
import { Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotFound from '../NotFound';
import Carrousel from "./CarrouselImg";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const ProductDetails = () => {

    let basket = useSelector(store => store.order.basket)
    React.useEffect(() => {
    }, [basket])
    const [open, setOpen] = React.useState(true);

    let navigate = useNavigate();
    let one = useLocation().state;


    const handleClose = () => {
        setOpen(false);
        navigate(-1);
    };

    const [numOfProduct, setNumOfProduct] = useState(1);
    const increase = () => {
        setNumOfProduct(numOfProduct + 1);
    }
    const reduce = () => {
        setNumOfProduct(Math.max(numOfProduct - 1, 0));

    }
    let dispatch = useDispatch();
    const addToBasket = () => {
        dispatch(addProductToBasket({ product: one, qty: numOfProduct }));

    }
    let showSmallBasket = useSelector(state => state.order.showSmallBasket);

    if (!one) {
        return <NotFound />; // ניווט ל-NotFound אם המוצר לא נמצא
    }
    return (

        // <div>
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar color="primary" sx={{ position: 'relative' }} >
                <Toolbar >
                    <img src={'https://kenzisserver.onrender.com/png/kenzisLogo.png'} alt='aaa' style={{ width: "5%" }} />
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h2" component="div">
                    </Typography>

                    <Button autoFocus onClick={handleClose} style={{ color: "black" }}>
                        חזור לכל המוצרים
                    </Button>
                </Toolbar>
            </AppBar>


            <Box p={4} sx={{ m: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={5} md={5}>
                        <Carrousel one={one} />
                    </Grid>

                    <Grid item xs={12} sm={7} md={7}>


                        <Box>
                            <Typography sx={{ ml: 2, flex: 1, textAlign: "center" }} variant="h4" component="div">
                                {one.productName}
                            </Typography>
                            <Typography sx={{ ml: 2, flex: 1, textAlign: "center" }} variant="h6" component="div">
                                {one.description}
                            </Typography>



                            <Typography sx={{ ml: 2, mt: 1, flex: 1, textAlign: "center", fontWeight: "bold" }} variant="h6" component="div">
                                {(one.price).toFixed(2)} ₪
                            </Typography>
                            <div >

                                <ButtonGroup size="medium" aria-label="Medium button group" sx={{ direction: "ltr", mt: 2 }}>
                                    <Button
                                        aria-label="increase"
                                        onClick={increase}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>

                                    <Button>{numOfProduct}</Button>

                                    <Button
                                        aria-label="reduce"
                                        onClick={reduce}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>

                                </ButtonGroup>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                </Typography>
                                <Button variant="outlined" sx={{ mt: 2, mb: 2 }}
                                    onClick={() => {
                                        (addToBasket())
                                    }}
                                    startIcon={<LocalGroceryStoreIcon sx={{ ml: 1 }} />}>
                                    הוספה לסל
                                </Button>

                            </div>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    הוראות קרור/הקפאה
                                </AccordionSummary>
                                <AccordionDetails>
                                    {one.heatOrCoolInstructions}                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    אלרגנים
                                </AccordionSummary>
                                <AccordionDetails>
                                    {one.allergens}
                                </AccordionDetails>
                            </Accordion>


                        </Box>

                        <Box
                        // sx={{color: 'action.active', display: 'flex',flexDirection: 'column',
                        // '& > *': { marginBottom: 2,},
                        // '& .MuiBadge-root': {marginRight: 4,}}}
                        >

                        </Box>
                        {/* </div> */}
                        {/* </Typography> */}
                    </Grid>
                </Grid>
            </Box >
            {showSmallBasket && <SmallBasket />}

        </Dialog>
    );
}

export default ProductDetails;