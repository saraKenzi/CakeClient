import { createSlice } from "@reduxjs/toolkit";
import { getProductById } from "../product/productApi";
import { logDOM } from "@testing-library/react";
import { calcFinalPrice } from '../../app/functions'


let initialState = {
    basket: [],
    countTypeOfProducts: 0,
    finalPrice: 0,
    address: {},
    showSmallBasket: false,
    isValideAddress: false
}

let orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addProductToBasket: (state, action) => {
            const { product, qty } = action.payload;
            const searchIndexProduct = state.basket.findIndex(item => item._id === product._id);
            if (searchIndexProduct !== -1) {
                state.basket[searchIndexProduct].qty += qty;
            } else {
                state.basket.push({ ...product, qty })
                state.countTypeOfProducts++;
                state.showSmallBasket = true;
            }
            state.finalPrice = calcFinalPrice(state.basket)

        },
        removeFromBasket: (state, action) => {
            const productId = action.payload;
            state.countTypeOfProducts--;
            let x = state.basket.findIndex(item => item._id === productId);
            state.finalPrice -= (state.basket[x].price * state.basket[x].qty).toFixed();
            state.basket = state.basket.filter(item => item._id !== productId);
        },
        updateQty: (state, action) => {
            const { productId, qty } = action.payload;
            const productToUpdate = state.basket.find(item => item._id === productId);
            if (productToUpdate && action.payload.qty > 0) {
                productToUpdate.qty = qty;
                console.log(productToUpdate.qty);
                state.finalPrice = calcFinalPrice(state.basket)
            }
        },
        finalPriceFunc: (state, action) => {
            state.finalPrice = action.payload.finalPrice;
            console.log(`price------->${state.finalPrice}`);

        },

        setShowSmallBasket: (state, action) => {
            state.showSmallBasket = action.payload;

        },
        addAddress: (state, action) => {
            state.address = action.payload;
        },
        validateAddress: (state, action) => {
            state.isValideAddress = true;
        },
        emptyOrder: (state, action) => {
            state.basket = [];
            state.countTypeOfProducts = 0;
            state.finalPrice = 0;
            state.address = {};
            state.showSmallBasket = false;
            state.isValideAddress = false;
        }

    },
});




export const { addProductToBasket, removeFromBasket, updateQty
    , finalPriceFunc, setShowSmallBasket, addAddress, validateAddress,emptyOrder } = orderSlice.actions;
export default orderSlice.reducer;

