import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userOut } from './userSlice';
import { useNavigate } from 'react-router-dom';
import { getAllOrdersOfUser } from '../order/orderApi';
import { useEffect } from 'react';

const Profile = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let user = useSelector(state => state.user.currentUser);

    useEffect(() => {
        getAllOrdersOfUser()
            .then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err.response)
            })
    }, [])

    return (<div>
        <h1>שלום {user.userName}</h1>
        <h3>הזמנות שביצעתי בעבר:</h3>
        

    </div>

    );
}

export default Profile;