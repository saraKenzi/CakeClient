import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


import { useSelector, useDispatch } from 'react-redux';
import ItemSmallBasket from './ItemSmallBasket';
import './orderCss/smallBasket.css';
import { useState, useEffect } from 'react';
import { setShowSmallBasket } from './orderSlice'

const SmallBasket = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true);

    const toggleDrawer = (newOpen) => () => {
        if (!newOpen)
            dispatch(setShowSmallBasket(false))
        setOpen(newOpen);
    };

    let basket = useSelector(state => state.order.basket);
    let finalPrice = useSelector(state => state.order.finalPrice);

    const DrawerList = (
        <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
            {/* <IconButton onClick={toggleDrawer(false)}><ClearIcon /></IconButton> */}

            <List>
                <h4 className='h3Style'>🛒 עגלת קניות</h4>
                {basket?.map(item =>
                    <ListItem key={item._id} disablePadding>
                        <ItemSmallBasket one={item} />
                    </ListItem>
                )}
               
            </List>
            <Divider />
            <h5 className='h3Style'>סה"כ מוצרים: {basket.length} </h5>
            <h4 className='h3Style'>סה"כ לתשלום: {(+finalPrice).toFixed(2)} ₪</h4>
        </Box>
    );
    // useEffect(() => {
    //     if (false)
    //         dispatch(setShowSmallBasket(false))
    // }, [open])
    return (
        <div>
            <IconButton aria-label="cart" onClick={toggleDrawer(true)} color="default">
                <ShoppingCartIcon />
            </IconButton>

            {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default SmallBasket;
