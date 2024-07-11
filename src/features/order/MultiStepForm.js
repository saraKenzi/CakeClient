import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListBasket from './ListBasket';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import AddressStep from './AddressStep';
import './orderCss/multiStepForm.css';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import OrderCompleate from './OrderCompleate';
import { emptyOrder } from './orderSlice';


const steps = [
    { label: 'סל הקניות שלי', component: <ListBasket /> },
    { label: 'כתובת למשלוח', component: <AddressStep /> },
    { label: 'ההזמנה בדרך', component: <OrderCompleate /> }
];

const MultiStepForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    let basket = useSelector(state => state.order.basket)


    const handleStep = (step) => () => {
        setActiveStep(step);
    };
    ////
    let isValideAddress = useSelector(state => state.order.isValideAddress);
    let dispatch = useDispatch()
    const handleNext = () => {
        let user = localStorage.getItem("currentUser");
        if (activeStep === 0) {
            if (!user) {
                handleClick(SlideTransition, 'לא ניתן לבצע קניה ללא הרשמה/התחברות')();
                setTimeout(() => {
                    navigate('/login');
                }, 2000);

            } else
                if (basket.length === 0) {
                    handleClick(SlideTransition, "אופס! סל הקניות שלך עדיין ריק")();
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);

                }
                else {

                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
        }
        else if (activeStep === 1) {
            if (isValideAddress) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                dispatch(emptyOrder());
            }
        }

    };

    const handleBack = () => {
        if (!isValideAddress)
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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

    return (
        <Box sx={{ width: '90%', mt: 4, ml: "auto", mr: "auto" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepButton color="inherit" completed={activeStep > index}>
                            {step.label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {steps[activeStep].component}
            </Box>
            <Box
                sx={{
                    position: "sticky",
                    bottom: 0,
                    right: 0,
                    left: 0,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem",
                    backgroundColor: "#fff", // Adjust background color if needed
                    boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)", // Add shadow for better visibility
                    zIndex: 999
                }} >
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    לשלב הקודם
                </Button>
                {activeStep !== steps.length - 1 &&
                    <Button sx={{ ml: 4 }}
                        onClick={handleNext}
                    >
                        להמשך הזמנה
                    </Button>
                }

            </Box>
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
        </Box>
    );
};

export default MultiStepForm;
