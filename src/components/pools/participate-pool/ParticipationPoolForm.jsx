import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BForm, FormLabel } from 'react-bootstrap';
import { useUserStateContext } from '../../../store/userContext';
import { FormGroup, FormSubmit } from '../../styled/Form';
import { convertUSDTtoEther } from '../../../utils/helpers';
import { useParticipateDispatchContext } from '../../../store/participateContext';

const amountSchema = Yup.object({
  amountParticipation: Yup.number()
    .required('Require')
    .min(1, `Min cost of participation ${1}`)
    .max(10000, `Max value is not more than balance ${10000}`),
});

const ParticipationPoolForm = ({ setShow, poolAddress, close }) => {
  const { address } = useUserStateContext();
  const { participate } = useParticipateDispatchContext();

  const handleSubmit = ({ amountParticipation }) => {
    setShow(false);
    participate(address, poolAddress, convertUSDTtoEther(amountParticipation));
  };
  return (
    <>
      <Formik
        initialValues={{ amountParticipation: '' }}
        validationSchema={amountSchema}
        onSubmit={(value) => {
          handleSubmit(value);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormGroup>
              <FormLabel>Enter amount</FormLabel>

              <Field
                as={BForm.Control}
                name="amountParticipation"
                type="number"
                isInvalid={
                  !!errors.amountParticipation && touched.amountParticipation
                }
                isValid={
                  !errors.amountParticipation && touched.amountParticipation
                }
              />

              <ErrorMessage
                component={BForm.Control.Feedback}
                name="amountParticipation"
                type="invalid"
              />
            </FormGroup>

            <FormSubmit>
              <Button variant="secondary" onClick={close}>
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

ParticipationPoolForm.propTypes = {
  setShow: PropTypes.func,
  close: PropTypes.func,
  poolAddress: PropTypes.string,
};

ParticipationPoolForm.defaultProps = {
  setShow: () => null,
  close: () => null,
  poolAddress: '',
};

export default ParticipationPoolForm;
