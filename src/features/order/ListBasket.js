//הסל קניות יציג את מערך המוצרים שקיים בסל המוצרים
//מתבסס one product in basket

import { useDispatch, useSelector } from "react-redux";
import ItemBasket from "./ItemBasket";
import './orderCss/listBasket.css';
import { finalPriceFunc } from './orderSlice';
import { useEffect } from "react";

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import { calcFinalPrice } from '../../app/functions'

/////


const ListBasket = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let arrBasket = useSelector(state => state.order.basket);
    let finalPrice = useSelector(state => state.order.finalPrice);
    useEffect(() => { }, [arrBasket])

    // const calculateTotalPrice = () => {
    //     let finalPrice = calcFinalPrice(arrBasket).toFixed(2);
    //     // for (let i = 0; i < arrBasket.length; i++) {
    //     //     finalPrice += arrBasket[i].price * arrBasket[i].qty;
    //     // }
    //     dispatch(finalPriceFunc(finalPrice));
    //     return finalPrice;
    // }
    const backToAllProducts = () => {
        navigate('/');
    }

    // console.log(typeof { finalPrice }) // Check the type of finalPrice

    return (
        <div className=" list-container">

            <h2>🛒סל הקניות שלי </h2>

            {arrBasket.map(item => <li className="listBasketStyle" key={item._id}><ItemBasket itemBasket={item} /></li>)}
            {arrBasket.length === 0 && <h4 className='h3Style'>🛒 עגלת קניות</h4>
                && <p>סל הקניות שלך ריק</p>}


            {arrBasket.length > 0
                && <div className="totalPriceStyle">
                    <h4>סה"כ מוצרים:{arrBasket.length} <br />
                        סה"כ לתשלום: {(+finalPrice).toFixed(2)} ₪ </h4>
                    {/* <h3>סה"כ לתשלום:{finalPrice} ₪</h3> */}
                </div>}

            {/* <Button variant="outlined" onClick={()=>navigate( '/compleateOrder')}>לסיום הזמנה</Button> */}


        </div>

    );
}

export default ListBasket;