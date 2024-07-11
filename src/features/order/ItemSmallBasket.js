import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItemButton';
import * as React from 'react';

import { Button } from '@mui/material';
import './orderCss/smallItemBasket.css';



const ItemSmallBasket = ({ one }) => {


    const textSecondry=()=>{
        return `כמות: ${one.qty} `
    }
    return (<div>

        <ListItem className="listItemStyle" sx={{ width: "300px" }}>

            <Button>
                <img src={one.imgUrl[0]} alt={one.productName}  className='imgStyle' />
            </Button>
            <ListItemText
                primary={one.productName}
                // secondary= {one.qty}
                secondary={textSecondry()}
            />
            <div> {one.price * one.qty} ₪</div>




        </ListItem>
    </div>);
}

export default ItemSmallBasket;