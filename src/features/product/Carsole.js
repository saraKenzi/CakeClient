import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './productCss/carsole.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



const Carsole = ({one}) => {
    const images = [
        {
            // label: 'San Francisco – Oakland Bay Bridge, United States',
            imgPath:one.imgUrl[0]
        },
        {
            // label: 'Bird',
            imgPath:one.imgUrl[1]
        },
        {
            // label: 'Bali, Indonesia',
            imgPath:one.imgUrl[2]
        },
        // {
        //     // label: 'Goč, Serbia',
        //     imgPath:
        //         'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
        // },
    ];
    
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    return (
        <Box sx={{  flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 0,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x':'x-reverse'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: 'auto',
                                    display: 'block',
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}

                nextButton={
                    <Button
                        size="large"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        sx={{display:"flex",bottom:150,color:"black",background:"rgba(242, 214, 234, 0.237)",borderRadius:"10%"}}
                        >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="large" onClick={handleBack}
                     disabled={activeStep === 0}
                     sx={{display:"flex",bottom:150,color:"black",background:"rgba(242, 214, 234, 0.237)",borderRadius:"10%"}}
                     >
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
            />
        </Box>
    );
}

export default Carsole;