import { useEffect, useState } from "react";
import OneProduct from './OneProduct'
import { getAllProducts, checkNumOfProduct, deleteProductById } from './productApi';
import SmallBasket from '../order/SmallBasket'
import './productCss/allProduct.css';
import { useSelector, useDispatch } from "react-redux";
//alert-successes-style
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
//pagination-style
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Typography from '@mui/material/Typography';

import ImageList from '@mui/material/ImageList';
//progress-style
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
//oneProduct-style
import Grid from '@mui/material/Grid'
import { setShowSmallBasket } from "../order/orderSlice";

const AllProducts = () => {
    let showSmallBasket = useSelector(state => state.order.showSmallBasket);


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


    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };


    const [arrProducts, setArrProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 12;
    let [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        checkNumOfProduct()
            .then(res => {
                let count = res.data.cntProducts;
                setTotalPages(Math.ceil(count / itemsPerPage));
            })
            .catch((err) => {
                handleClick(SlideTransition, 'לא מצליח לחשב מספר דפים!')();
                // console.log("can't to count total pages!");
            })
    }
    )


    useEffect(() => {
        // setLoading(true);
        setTimeout(() => {
            getAllProducts(page, itemsPerPage, "")
                .then(res => {
                    setArrProducts(res.data);
                    setLoading(false);
                    handleClick(SlideTransition, "The connection to the server was successful")();
                })
                .catch((err) => {
                    // console.log(`can't get product from server --> ${err}`);
                    setLoading(false);
                    handleClick(SlideTransition, "לא מצליח להתתחבר לשרת")();
                });
        }, 2000)

    }, [page]);



    return (
        <div className="product-grid">
            {/* <div style={{ width: "100%" }}>
                <img src="https://kenzisserver.onrender.com/BG/A.jpg" alt="headerPic" style={{ width: "100%", height: "auto" , opacity:0.2 }} />
            </div> */}
            <Grid container mt={1}>

                {arrProducts.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item._id}>
                        <OneProduct one={item} arr={arrProducts} setArr={setArrProducts} />
                    </Grid>
                ))}
            </Grid>


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

            {/* {loading && <Box >
                <CircularProgress color="primary" />
            </Box>} */}

            <br />

            {loading && (
                <div className="div-logo-loading">
                    <div className="logo-gif">
                        <img src="https://kenzisserver.onrender.com/png/kenzisLogo.gif" alt="logo-gif" className="img-logo" />
                    </div>
                </div>
            )}
            {!loading &&
                <Stack className="footer" alignItems="center" spacing={2}>
                    <Pagination sx={{ zIndex: 1200 }}
                        count={totalPages}
                        // color="primary"
                        onChange={handleChange}
                        page={page}


                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowForwardIcon, next: ArrowBackIcon }}
                                {...item}
                            />
                        )}
                    />
                </Stack>}
            {showSmallBasket && <SmallBasket />}
        </div>
    );
}

export default AllProducts;
