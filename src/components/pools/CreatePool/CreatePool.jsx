import React from 'react';
import { BtnWhite } from '../../styled/Btns';
import Modal from '../../styled/Modal';
import { SubTitle } from '../../styled/Text';
import CreateLotteryPoolForm from '../lottery/CreateLotteryPoolForm';
import { useLotteryStateContext } from '../../../store/lotteryContext';
import CreateSavingPoolForm from '../my-pools/CreateSavingPoolForm';
import { useUserStateContext } from '../../../store/userContext';
import useModal from '../../../hooks/useModal';

const CreatePool = () => {
  const { isAdmin } = useLotteryStateContext();
  const { address } = useUserStateContext();
  const { show, handleClose, handleShow } = useModal();

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
              onCancel={handleClose}
              isAdmin={isAdmin}
              userAddress={address}
            />
          ) : (
            <CreateSavingPoolForm
              userAddress={address}
              onCancel={handleClose}
            />
          )}
        </Modal.Body>
      </Modal>

      <BtnWhite onClick={handleShow}>Create new pool</BtnWhite>
    </>
  );
};

export default CreatePool;
