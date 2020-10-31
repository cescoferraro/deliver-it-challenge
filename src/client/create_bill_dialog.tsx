import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import TF from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Field, Form, Formik } from "formik";
import { BillInput } from "../typings/LoginType";
import DateFnsUtils from "@date-io/date-fns";
import { Button, InputAdornment, LinearProgress } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { TextField } from "formik-material-ui";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  input: BillInput;
}

type Output<T> = Partial<Record<keyof T, string>>;

const useStyles = makeStyles({
  root: {
    padding: "30px",
  },
});

export const CreateBillDialog = (props: Props): React.ReactElement => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        classes={{ paper: classes.root }}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <Formik<BillInput>
          initialValues={props.input}
          validate={(values) => {
            console.log(values);
            const errors: Output<BillInput> = {};
            if (values.name === "") errors.name = "required";
            if (values.value === null) errors.value = "required";
            if (values.due_date === null) errors.due_date = "required";
            if (values.payment_date === null) errors.payment_date = "required";
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const r = await fetch(
              process.env.NODE_ENV === "production"
                ? "https://deliver-api.cescoferraro.xyz/api/bills"
                : "http://localhost:4000/api/bills",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  // ...values,
                  name: "vale",
                  value: 3234,
                  due_date: "2020-12-12",
                  payment_date: "2020-12-12",
                }),
              }
            );
            console.log(r);
            setSubmitting(false);
            if (r.ok) {
              props.onClose();
              props.refetch();
            }
          }}
        >
          {({
            isValid,
            errors,
            setFieldValue,
            values,
            submitForm,
            isSubmitting,
          }) => (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <Field
                component={TextField}
                name="name"
                type="text"
                label="Name"
              />
              <br />
              <BRLInput
                value={values.value}
                error={errors.value}
                onChange={(n) => setFieldValue("value", n)}
                label={"Valor"}
              />
              <br />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Data de Pagamento"
                value={values.payment_date}
                helperText={errors.payment_date}
                error={Boolean(errors.payment_date)}
                onChange={(date) => setFieldValue("payment_date", date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <br />
              <KeyboardDatePicker
                error={Boolean(errors.due_date)}
                helperText={errors.due_date}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Data de Vencimento"
                value={values.due_date}
                onChange={(date) => setFieldValue("due_date", date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <br />
              <br />
              {isSubmitting && <LinearProgress />}
              <br />
              <Button
                disabled={!isValid || isSubmitting}
                variant="contained"
                color="primary"
                onClick={submitForm}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export const BRLInput = (props: {
  error?: string;
  label: string;
  value?: number;
  onChange: (number) => void;
}): React.ReactElement => {
  const [state, setState] = React.useState({
    value: (props.value || "").toString().replace(".", ","),
  });
  const { onChange, label } = props;
  return (
    <NumberFormat
      decimalScale={2}
      placeholder={label}
      thousandSeparator="."
      decimalSeparator=","
      customInput={TF}
      label={label}
      error={Boolean(props.error)}
      fullWidth={true}
      InputProps={{
        startAdornment: <InputAdornment position="start"> R$ </InputAdornment>,
      }}
      helperText={props.error}
      value={state.value}
      onValueChange={(vals) => {
        console.log(vals);
        setState({ value: vals.formattedValue });
        onChange(vals.floatValue);
      }}
    />
  );
};
