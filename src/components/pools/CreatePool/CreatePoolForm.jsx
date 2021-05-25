import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Button, Form as BForm } from 'react-bootstrap';
import * as Yup from 'yup';
import moment from 'moment';
import { FormSubmit, FormGroup } from '../../styled/Form';

const dateShame = () =>
  Yup.object({
    startDate: Yup.string()
      .required('Require')
      .test(
        '',
        'The start date cannot be less than the current one',
        (value) => {
          const today = moment(new Date()).format();
          return value >= today;
        },
      ),

    participationEndDate: Yup.string()
      .required('Require')
      .test({
        name: 'startDate',
        exclusive: false,
        params: {},
        message: 'End date cannot be less than start date',
        test(value) {
          return value > this.parent.startDate;
        },
      }),

    endDate: Yup.string()
      .required('Require')
      .test({
        name: 'participationEndDate',
        exclusive: false,
        params: {},
        message: 'The draw date cannot be less than the end date',
        test(value) {
          return value > this.parent.participationEndDate;
        },
      }),

    participationAmount: Yup.number()
      .required('Require')
      .min(1, `Min cost of participation ${1}`)
      .max(10000, `Max value is not more than balance ${10000}`),
  });

const CreatePoolForm = ({ onSubmit, onCancel, isAdmin }) => {
  return (
    <>
      <Formik
        initialValues={{
          startDate: '',
          participationEndDate: '',
          endDate: '',
          participationAmount: '',
          isLottery: isAdmin,
        }}
        validationSchema={dateShame}
        onSubmit={(value) => {
          onSubmit(value);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormGroup>
              <BForm.Label>Start date</BForm.Label>

              <Field
                as={BForm.Control}
                name="startDate"
                type="datetime-local"
                isInvalid={!!errors.startDate && touched.startDate}
                isValid={!errors.startDate && touched.startDate}
              />

              <ErrorMessage
                component={BForm.Control.Feedback}
                name="startDate"
                type="invalid"
              />
            </FormGroup>

            <FormGroup>
              <BForm.Label>Participation end date</BForm.Label>

              <Field
                as={BForm.Control}
                name="participationEndDate"
                type="datetime-local"
                isInvalid={
                  !!errors.participationEndDate && touched.participationEndDate
                }
                isValid={
                  !errors.participationEndDate && touched.participationEndDate
                }
              />

              <ErrorMessage
                component={BForm.Control.Feedback}
                name="participationEndDate"
                type="invalid"
              />
            </FormGroup>

            <FormGroup>
              <BForm.Label>Date choose winner</BForm.Label>

              <Field
                as={BForm.Control}
                name="endDate"
                type="datetime-local"
                isInvalid={!!errors.endDate && touched.endDate}
                isValid={!errors.endDate && touched.endDate}
              />

              <ErrorMessage
                component={BForm.Control.Feedback}
                name="endDate"
                type="invalid"
              />
            </FormGroup>

            <FormGroup>
              <BForm.Label>Cost of participation</BForm.Label>

              <Field
                as={BForm.Control}
                name="participationAmount"
                type="number"
                isInvalid={!!errors.poolCost && touched.poolCost}
                isValid={!errors.poolCost && touched.poolCost}
              />

              <ErrorMessage
                component={BForm.Control.Feedback}
                name="participationAmount"
                type="invalid"
              />
            </FormGroup>

            {isAdmin && (
              <FormGroup>
                <BForm.Label>Is Lottery</BForm.Label>
              </FormGroup>
            )}

            <FormSubmit>
              <Button variant="danger" onClick={onCancel}>
                Close
              </Button>
              <Button type="submit">Confirm</Button>
            </FormSubmit>
          </Form>
        )}
      </Formik>
    </>
  );
};

CreatePoolForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};

CreatePoolForm.defaultProps = {
  isAdmin: false,
};

export default CreatePoolForm;
