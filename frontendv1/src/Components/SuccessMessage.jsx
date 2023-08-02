  import React, { useState } from 'react';
  import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';

  const SuccessMessage = ({ title, message, onClose }) => {
    const [showModal, setShowModal] = useState(true);

    const handleCloseModal = () => {
      setShowModal(false);
      onClose();
    };

    return (
      <MDBModal show={showModal} onHide={handleCloseModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalBody>
              <h5>{title}</h5>
              <p>{message}</p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={handleCloseModal}>
                Aceptar
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  };

  export default SuccessMessage;
