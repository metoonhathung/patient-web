import React from "react";
import { Modal, Button } from "react-bootstrap";
import PatientService from "../services/PatientService";

export default function DeleteModal({ show, setShow, deleteId, setDeleted }) {
  let confirm = () => {
    setShow(false);
    PatientService.delete(deleteId)
      .then((res) => setDeleted(deleteId))
      .catch((err) => alert(err));
  };
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to delete patient with ID {deleteId}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={confirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
