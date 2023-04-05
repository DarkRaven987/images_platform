/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import Modal from '../../../../components/Modal/Modal';
import './AddImageModal.css';
import Button from '../../../../components/Button/Button';

const AddImageModal = ({ show, toggle }) => {
  const [image, setImage] = useState(null);
  console.log('image', image);

  const fileTypes = ['JPG', 'JPEG', 'PNG', 'SVG'];

  const handleLoadFile = (file) => {
    const fileData = URL.createObjectURL(file);
    setImage(fileData);
  };

  return (
    <Modal show={show} toggle={toggle}>
      <div className="modal-content-container">
        <FileUploader
          handleChange={handleLoadFile}
          name="file"
          types={fileTypes}
        />
        {!!image && <img alt="preview image" src={image} />}
      </div>
      <div className="modal-content-actions">
        <Button className="green-button">Save</Button>
        <Button className="red-button" onClick={toggle}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default AddImageModal;
