/* eslint-disable jsx-a11y/img-redundant-alt */
import { useCallback, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

import Modal from '../../../../components/Modal/Modal';
import './AddImageModal.css';
import Button from '../../../../components/Button/Button';
import { connect } from 'react-redux';
import { loadImageAction } from '../../../../store/reducers/images';
import { agent } from '../../../../utils/agent';
import { API_UPLOAD_IMAGES_URL } from '../../../../utils/agentConsts';
import CircleLoader from '../../../../components/CircleLoader/CircleLoader';

const AddImageModal = ({ show, toggle, loadImageAction }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const fileTypes = ['JPG', 'JPEG', 'PNG'];

  const handleLoadFile = useCallback((file) => {
    const fileData = URL.createObjectURL(file);
    setFile(file);
    setImage(fileData);
  }, []);

  const handleSaveFile = useCallback(async () => {
    if (file) {
      setUploadingFile(true);
      let formData = new FormData();

      formData.append('file', file);
      const uploadRes = await agent
        .post(API_UPLOAD_IMAGES_URL, formData)
        .finally(() => setUploadingFile(false));
      const { message } = uploadRes?.data;
      if (!message) return false;

      loadImageAction(); //NOTE: uncomment it when the images loading and displaying flow will be ready
      toggle();
      setFile(null);
      setImage(null);
    }
  }, [file, toggle, loadImageAction]);

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
      {!!image && (
        <div className="modal-content-actions">
          <Button className="green-button" onClick={handleSaveFile}>
            Save
          </Button>
          <Button className="red-button" onClick={toggle}>
            Cancel
          </Button>
        </div>
      )}
      <CircleLoader show={uploadingFile} />
    </Modal>
  );
};

export default connect(
  (state) => ({
    images: state.image,
  }),
  (dispatch) => ({
    loadImageAction: () => loadImageAction({ dispatch }),
  }),
)(AddImageModal);
