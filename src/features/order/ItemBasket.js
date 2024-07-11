import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, updateQty } from "./orderSlice";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { ListItemButton, ListItemText, Button } from '@mui/material';
import './orderCss/itemBasket.css';

const ItemBasket = ({ itemBasket }) => {
    let dispatch = useDispatch();
    const [numOfProduct, setNumOfProduct] = useState(itemBasket.qty);
    let productFromBasket = useSelector(store => store.order.basket).find(x => x._id === itemBasket._id);

    const increase = () => {
        dispatch(updateQty({ productId: itemBasket._id, qty: numOfProduct + 1 }));
        setNumOfProduct(numOfProduct + 1);
    };

    const reduce = () => {
        dispatch(updateQty({ productId: itemBasket._id, qty: numOfProduct - 1 }));
        setNumOfProduct(Math.max(numOfProduct - 1, 1));
    };

    const deleteFromBasket = () => {
        dispatch(removeFromBasket(itemBasket._id));
    };

    return (
        <div className="item-basket-container">
            <ListItemButton className="listItemStyle ">
               <Button className="xBtnStyle" aria-label="clear" onClick={deleteFromBasket}>
                    <ClearIcon fontSize="small" />
                </Button>
                <Button>
                    <img src={itemBasket.imgUrl[0]} alt={itemBasket.productName} className="product-image" />
                </Button>
                <ListItemText
                    primary={itemBasket.productName}
                    secondary={itemBasket.price * productFromBasket.qty}
                />
                <div className="quantity-controls">
                    <Button className="btnStyle" aria-label="increase" onClick={increase}>
                        <AddIcon fontSize="small" />
                    </Button>
                    <Button disabled fontSize="small">{numOfProduct}</Button>
                    <Button className="btnStyle" aria-label="reduce" onClick={reduce}>
                        <RemoveIcon fontSize="small" />
                    </Button>
                </div>
            </ListItemButton>
        </div>
    );
};

export default ItemBasket;
