import { Link, Outlet } from "react-router-dom";
import './productCss/oneProduct.css';
import { deleteProductById } from './productApi';

import * as React from 'react';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';


//dialog
import Slide from '@mui/material/Slide';
import { useEffect, useState } from "react";


import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";
import { addProductToBasket, finalPriceFunc } from "../order/orderSlice";

import Badge from '@mui/material/Badge';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 10,
        top: 11,
        border: `2px solid ${theme.palette.background.paper}`,
        background: `${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));
const OneProduct = ({ one, arr, setArr }) => {
    const user = useSelector(state => state.user.currentUser);

    const [open, setOpen] = React.useState(false);
    const [productFromBasket, setProductFromBasket] = useState(0);
    const basket = useSelector(state => state.order.basket);
    let dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };



    const addOneToBasket = () => {
        dispatch(addProductToBasket({ product: one, qty: 1 }))
    }

    useEffect(() => {
        let index = basket.findIndex(product => product._id === one._id)
        // console.log(index)
        if (index !== -1) {
            let qtyProductFromBasket = basket[index].qty;
            setProductFromBasket(qtyProductFromBasket)
        }

        let finalPrice = 0;
        for (let i = 0; i < basket.length; i++) {
            finalPrice += basket[i].price * basket[i].qty;
        }
        dispatch(finalPriceFunc({ finalPrice: finalPrice.toFixed(2) }));


    }, [basket])
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

    const deleteFromServer = async () => {
        try {

            handleCloseD();

            let token = user.token;
            let productId = one._id;
            let res = await deleteProductById(one._id, token);
            if (res) {
                alert("המחיקה הצליחה");
                // handleClick(SlideTransition, "!המחיקה הצליחה")();

                const updatedProducts = arr.filter(product => product._id !== productId);
                setArr(updatedProducts);
            }


        }
        catch (err) {
            console.log(err)
            // handleClick(SlideTransition, err.response.data.message)();

        }
    }
    const [openD, setOpenD] = React.useState(false);

    const handleClickOpenD = () => {
        setOpenD(true);
    };

    const handleCloseD = () => {
        setOpenD(false);
    };

    return (<div>
        <React.Fragment>

            <Dialog
                open={openD}
                onClose={handleCloseD}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"אזהרה!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        האם אתה בטוח שברצונך למחוק את המוצר?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleCloseD();
                    }}>לא, בטעות לחצתי</Button>
                    <Button onClick={() => {
                        deleteFromServer();
                    }
                    } autoFocus>
                        כן, מאשר מחיקה          </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

        <Box
            sx={{ display: "flex", flexDirection: "column" }}
        >

            <Link to={"" + one._id} state={one} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ImageListItem className="picStyle" sx={{ mt: 1, mr: 2 }} key={one.imgUrl}>
                    <img
                        // srcSet={`${one.imgUrl[1]}`}
                        src={`${one.imgUrl[0]}`}
                        alt="cakeImgUrl"
                    />
                    <div style={{ cursor: 'pointer' }}>
                        <ImageListItemBar
                            title={`${one.productName}`}
                            subtitle={`${(one.price).toFixed(2)} ₪`}
                        />
                    </div>
                </ImageListItem>
            </Link>
            <Box sx={{ mt: 1, mr: 2 }}>
                <Grid container display="flex">

                    {(user === null || user.role === 'user') &&
                        <Grid item xs={2} sm={2} md={2} lg={2}  >
                            <StyledBadge badgeContent={productFromBasket}>
                                <IconButton
                                    aria-label="add to cart"
                                    onClick={addOneToBasket}
                                >
                                    <ShoppingCartIcon />
                                </IconButton>
                            </StyledBadge>
                        </Grid>}
                    {(user !== null && user.role === 'admin') &&

                        <Grid item xs={2} sm={2} md={2} lg={2}  >
                            <IconButton > 
                                <Link to={'/editProduct'} state={one}>
                                    <EditNoteIcon color="action" />
                                </Link>
                            </IconButton>
                        </Grid>}
                    {(user !== null && user.role === 'admin') &&
                        <Grid item xs={2} sm={2} md={2} lg={2}>
                            <IconButton 
                                aria-label="delete"
                                onClick={handleClickOpenD}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Grid>}
                </Grid>
            </Box>
        </Box>

        <Outlet />

    </div>);
}

export default OneProduct;