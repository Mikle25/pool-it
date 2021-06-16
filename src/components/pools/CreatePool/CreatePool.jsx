import React, { useState } from 'react';
import { BtnWhite } from '../../styled/Btns';
import Modal from '../../styled/Modal';
import { SubTitle } from '../../styled/Text';
import CreateLotteryPoolForm from '../lottery/CreateLotteryPoolForm';

import { useLotteryStateContext } from '../../../store/lotteryContext';
import CreateSavingPoolForm from '../my-pools/CreateSavingPoolForm';

const CreatePool = () => {
  const { isAdmin } = useLotteryStateContext();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <SubTitle>Create pool</SubTitle>
        </Modal.Header>

        <Modal.Body>
          {isAdmin ? (
            <CreateLotteryPoolForm
              setShow={setShow}
              onCancel={handleClose}
              isAdmin={isAdmin}
            />
          ) : (
            <CreateSavingPoolForm setShow={setShow} onCancel={handleClose} />
          )}
        </Modal.Body>
      </Modal>

      <BtnWhite onClick={handleShow}>Create new pool</BtnWhite>
    </>
  );
};

export default CreatePool;
