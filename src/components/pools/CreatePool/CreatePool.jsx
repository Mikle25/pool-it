import React, { useState } from 'react';
import { BtnWhite } from '../../styled/Btn';
import Modal from '../../styled/Modal';
import { SubTitle } from '../../styled/Text';
import CreatePoolForm from './CreatePoolForm';
import {
  convertTimeMSecToSec,
  convertUSDTtoEther,
} from '../../../utils/helpers';
import {
  useLotteryDispatchContext,
  useLotteryStateContext,
} from '../../../store/lotteryContext';
import { useUserStateContext } from '../../../store/userContext';

const CreatePool = () => {
  const { createNewPool } = useLotteryDispatchContext();
  const { isAdmin } = useLotteryStateContext();
  const { address } = useUserStateContext();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = ({
    startDate,
    participationEndDate,
    endDate,
    participationAmount,
    isLottery,
  }) => {
    setShow(false);
    console.log(
      convertTimeMSecToSec(startDate),
      convertTimeMSecToSec(participationEndDate),
      convertTimeMSecToSec(endDate),
      convertUSDTtoEther(participationAmount),
      isLottery,
    );
    createNewPool(
      convertTimeMSecToSec(startDate),
      convertTimeMSecToSec(participationEndDate),
      convertTimeMSecToSec(endDate),
      convertUSDTtoEther(participationAmount),
      isLottery,
      address,
    );
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
          <CreatePoolForm
            onSubmit={handleSubmit}
            onCancel={handleClose}
            isAdmin={isAdmin}
          />
        </Modal.Body>
      </Modal>

      <BtnWhite onClick={handleShow}>Create new pool</BtnWhite>
    </>
  );
};

export default CreatePool;
