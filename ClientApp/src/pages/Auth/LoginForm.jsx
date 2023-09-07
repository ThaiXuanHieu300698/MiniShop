import React from "react";
import { useLocation, useHistory } from "react-router";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
} from "@material-ui/core";
import { TextField, Switch } from "formik-material-ui";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth-slice";
import { Layout } from "../../components/shared/Layout";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  console.log(from);
  const initialValues = { email: "", password: "", rememberMe: false };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password should be of minimum 8 characters length"),
  });
  return (
    <Layout title="Login" description="Login">
      <div className="d-flex align-items-center justify-content-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              setSubmitting(false);
              await dispatch(login(values));
              console.log("chạy sau slice");
              history.replace(from);
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
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
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                />
              </Box>
              <Box margin={1}>
                <FormControlLabel
                  control={
                    <Field
                      component={Switch}
                      type="checkbox"
                      name="rememberMe"
                    />
                  }
                  label="Remember Me"
                />
              </Box>
              <Box margin={1}>{isSubmitting && <CircularProgress />}</Box>
              <Box margin={1}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Login
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default LoginForm;
