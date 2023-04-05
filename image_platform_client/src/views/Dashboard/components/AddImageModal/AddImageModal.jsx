import Modal from '../../../../components/Modal/Modal';
import './AddImageModal.css';

const AddImageModal = ({ show, toggle }) => {
  return (
    <Modal show={show} toggle={toggle}>
      Add image goes here
    </Modal>
  );
};

export default AddImageModal;
