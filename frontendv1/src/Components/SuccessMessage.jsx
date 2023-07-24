import React from 'react';
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';

const SuccessMessage = ({ message, onClose }) => {
  return (
    <MDBModal show={true} onHide={onClose}>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalBody>
            <p>{message}</p>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default SuccessMessage;
