import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BForm, FormLabel } from 'react-bootstrap';
import { useUserStateContext } from '../../../store/userContext';
import { FormGroup, FormSubmit } from '../../styled/Form';
import { convertEtherToUSDT, convertUSDTtoEther } from '../../../utils/helpers';
import { useParticipateDispatchContext } from '../../../store/participateContext';

const amountSchema = (balanceUSDT) =>
  Yup.object({
    amountParticipation: Yup.number()
      .required('Require')
      .min(1, `Min cost of participation ${1}`)
      .max(
        balanceUSDT,
        `Max value is not more than balance ${balanceUSDT} USDT`,
      ),
  });

const ParticipationPoolForm = ({ poolAddress, handleClose }) => {
  const { address, balanceUSDT } = useUserStateContext();
  const { participate } = useParticipateDispatchContext();

  const handleSubmit = ({ amountParticipation }) => {
    participate(poolAddress, address, convertUSDTtoEther(amountParticipation));
    handleClose();
  };

  return (
    <>
      <Formik
        initialValues={{ amountParticipation: '' }}
        validationSchema={amountSchema(convertEtherToUSDT(balanceUSDT))}
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
              <Button variant="secondary" onClick={handleClose}>
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
  handleClose: PropTypes.func,
  poolAddress: PropTypes.string,
};

ParticipationPoolForm.defaultProps = {
  handleClose: () => null,
  poolAddress: '',
};

export default ParticipationPoolForm;
