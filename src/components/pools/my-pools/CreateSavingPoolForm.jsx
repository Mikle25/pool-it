import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form as BForm } from 'react-bootstrap';
import { FormSubmit, FormGroup } from '../../styled/Form';
import { usePoolsDispatchContext } from '../../../store/poolsContext';

const CreateSavingPoolForm = ({ onCancel, setShow }) => {
  const { createNewSavingPool } = usePoolsDispatchContext();
  const handleSubmit = () => {
    createNewSavingPool();
  };

  return (
    <BForm
      onSubmit={(e) => {
        e.preventDefault();
        setShow(false);
        handleSubmit();
      }}
    >
      <FormGroup>
        <BForm.Label>Confirm the creation of the pool</BForm.Label>
      </FormGroup>

      <FormSubmit>
        <Button variant="secondary" onClick={onCancel}>
          Close
        </Button>
        <Button type="submit">Confirm</Button>
      </FormSubmit>
    </BForm>
  );
};

CreateSavingPoolForm.propTypes = {
  onCancel: PropTypes.func,
  setShow: PropTypes.func.isRequired,
};

CreateSavingPoolForm.defaultProps = {
  onCancel: () => null,
};

export default CreateSavingPoolForm;
