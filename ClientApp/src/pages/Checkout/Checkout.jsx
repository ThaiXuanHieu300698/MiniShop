import React, { useState } from "react";
import { Layout } from "../../components/shared/Layout";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import { Box } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import * as Yup from "yup";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Contact information", "Payment", "Done"];
}

function getStepContent(stepIndex) {
  const user = cookies.get("user");
  switch (stepIndex) {
    case 0:
      return <StepOne user={user}/>;
    case 1:
      return <StepTwo />;
    case 2:
      return <StepThree />;
    default:
      return "Unknown stepIndex";
  }
}

const Checkout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Layout title="Checkout" description="Checkout">
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div className="text-center text-success">Success</div>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div>{getStepContent(activeStep)}</div>
              <div className="mt-3">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

export const StepOne = (props) => {
  const {user} = props;
  const initialValues = {
    fullName: user.user.firstName + " " + user.user.lastName,
    address: "",
    phoneNumber: user.user.phoneNumber,
    email: user.user.email,
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setSubmitting(false);
          console.log("Done");
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Box margin={1}>
            <Field
              component={TextField}
              label="Fullname"
              name="fullName"
              variant="outlined"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              label="Address"
              name="address"
              variant="outlined"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
              variant="outlined"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              label="Phone Number"
              name="phoneNumber"
              variant="outlined"
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export const StepTwo = () => {
  const [value, setValue] = useState("COD");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Choose payment methods</FormLabel>
      <RadioGroup
        aria-label="Payment methods"
        name="paymentMethods"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="COD" control={<Radio />} label="COD" />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};

export const StepThree = () => {
  return <p className="text-success">Done</p>;
};
