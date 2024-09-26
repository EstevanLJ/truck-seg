import React from "react";
import {
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LOCALE } from "../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function HorizontalLinearStepper({getSteps, getStepContent}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const handleNext = () => {
        if (steps[activeStep].handleNext) {
            steps[activeStep].handleNext();
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map(({label}, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button
                            onClick={handleReset}
                            className={classes.button}
                        >
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <div className="flex justify-between mt-5">
                            <Button
                                disabled={activeStep === 0}
                                variant="contained"
                                color={'primary'}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                {LOCALE.back}
                            </Button>

                            <Button
                                variant="contained"
                                color={activeStep === steps.length - 1 ? 'secondary' : 'primary'}
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1
                                    ? LOCALE.save
                                    : LOCALE.next}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
