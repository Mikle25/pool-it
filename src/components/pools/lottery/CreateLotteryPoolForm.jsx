import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Button, Form as BForm } from 'react-bootstrap';
import * as Yup from 'yup';
import moment from 'moment';
import styled from 'styled-components';
import { FormSubmit, FormGroup } from '../../styled/Form';
import {
  convertEtherToUSDT,
  convertTimeMSecToSec,
  convertUSDTtoEther,
} from '../../../utils/helpers';
import { useLotteryDispatchContext } from '../../../store/lotteryContext';
import DatePicker from '../../CustomDatePicker';
import { useUserStateContext } from '../../../store/userContext';

const ErrorMsg = styled.div`
  margin-top: 5px;
  color: red;
  font-size: 12px;
`;

const dateShame = (balanceUSDT) =>
  Yup.object({
    participationEndDate: Yup.date().test({
      name: 'startDate',
      exclusive: false,
      params: {},
      message: 'End date cannot be less than start date',
      test(value) {
        const startDate = moment(this.parent.startDate).valueOf();
        const endDate = moment(value).valueOf();

        return (
          moment(startDate).isSameOrBefore(moment(endDate)) &&
          !moment(startDate).isSame(moment(endDate))
        );
      },
    }),

    endDate: Yup.date().test({
      name: 'participationEndDate',
      exclusive: false,
      params: {},
      message: 'The draw date cannot be less than the end date',
      test(value) {
        const participationEndDate = moment(
          this.parent.participationEndDate,
        ).valueOf();
        const endDate = moment(value).valueOf();

        return moment(participationEndDate).isSameOrBefore(moment(endDate));
      },
    }),

    participationAmount: Yup.number()
      .required('Require')
      .min(1, `Min cost of participation ${1}`)
      .max(balanceUSDT, `Max value is not more than balance ${balanceUSDT}`),
  });

const CreateLotteryPoolForm = ({ onCancel, isAdmin, userAddress }) => {
  const { createNewPool } = useLotteryDispatchContext();
  const { balanceUSDT } = useUserStateContext();

  const handleSubmit = ({
    startDate,
    participationEndDate,
    endDate,
    participationAmount,
    isLottery,
  }) => {
    createNewPool(
      convertTimeMSecToSec(startDate),
      convertTimeMSecToSec(participationEndDate),
      convertTimeMSecToSec(endDate),
      convertUSDTtoEther(participationAmount),
      isLottery,
      userAddress,
    );
    onCancel();
  };

  return (
    <>
      <Formik
        initialValues={{
          startDate: moment().startOf().toDate(),
          participationEndDate: moment().startOf().toDate(),
          endDate: moment().startOf().toDate(),
          participationAmount: '',
          isLottery: isAdmin,
        }}
        validationSchema={dateShame(convertEtherToUSDT(balanceUSDT))}
        onSubmit={(value) => {
          handleSubmit(value);
        }}
      >
        {({
          isSubmitting,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
        }) => (
          <Form>
            <FormGroup>
              <BForm.Label>Start date</BForm.Label>

              <DatePicker disabled />
            </FormGroup>

            <FormGroup>
              <BForm.Label>End date</BForm.Label>

              <DatePicker
                onChange={(value) => {
                  setFieldValue('participationEndDate', value);
                  setFieldTouched('participationEndDate', true);
                }}
              />

              <ErrorMessage name="participationEndDate" component={ErrorMsg} />
            </FormGroup>

            <FormGroup>
              <BForm.Label>Date choose winner</BForm.Label>

              <DatePicker
                onChange={(value) => {
                  setFieldValue('endDate', value);
                  setFieldTouched('endDate', true);
                }}
              />

              <ErrorMessage name="endDate" component={ErrorMsg} />
            </FormGroup>

            <FormGroup>
              <BForm.Label>Min. participation in lottery</BForm.Label>

              <Field
                as={BForm.Control}
                name="participationAmount"
                type="number"
                isInvalid={!!errors.poolCost && touched.poolCost}
                isValid={!errors.poolCost && touched.poolCost}
              />

              <ErrorMessage component={ErrorMsg} name="participationAmount" />
            </FormGroup>

            {isAdmin && (
              <FormGroup>
                <BForm.Label>Is Lottery</BForm.Label>
              </FormGroup>
            )}

            <FormSubmit>
              <Button variant="secondary" onClick={onCancel}>
                Close
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                Confirm
              </Button>
            </FormSubmit>
          </Form>
        )}
      </Formik>
    </>
  );
};

CreateLotteryPoolForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  userAddress: PropTypes.string.isRequired,
};

CreateLotteryPoolForm.defaultProps = {
  isAdmin: false,
};

export default CreateLotteryPoolForm;
