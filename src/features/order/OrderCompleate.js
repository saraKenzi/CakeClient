import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const OrderCompleate = () => {
    let navigate = useNavigate();
    let basket=

    setTimeout(() => {

        navigate('/');
    }, 4000)

    return (<div style={{ textAlign: "center", width: "100%" }}>
        <h2>תודה על קניית המוצרים באתר שלנו!</h2>
        <h2>אנו מקווים שתהנה מהמוצרים ושתחזור לבקר אותנו שוב בקרוב </h2>

    </div>);
}

export default OrderCompleate;