import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./ContactForm.module.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addContact } from "../../redux/operations";

const ContactForm = () => {
  const initialValues = {
    username: "",
    tel: "",
  };
  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    const newContact = {
      id: nanoid(),
      name: values.username,
      number: values.tel,
    };
    dispatch(addContact(newContact))
    options.resetForm();
  };

  const orderSchema = Yup.object().shape({
    username: Yup.string().min(3, "Too Short!").max(50).required("Required"),
    tel: Yup.string().min(3, "Too Short!").max(50).required("Required"),
  });

  return (
    <div className={s.wrapper}>
      <Formik
        validationSchema={orderSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <Form className={s.form}>
          <label className={s.formLabel}>
            <span>Name</span>
            <Field className={s.formInput} type="text" name="username" />
            <ErrorMessage
              name="username"
              component="span"
              className={s.error}
            />
          </label>
          <label className={s.formLabel}>
            <span>Number</span>
            <Field className={s.formInput} type="text" name="tel" />
            <ErrorMessage name="tel" component="span" className={s.error} />
          </label>
          <button className={s.addButton} type="submit">
            Add Contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
