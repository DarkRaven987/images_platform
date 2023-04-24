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
import { sendFilesToS3 } from './utils';

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

      const [originalImage, resized50Image, resized25Image] =
        await sendFilesToS3(file, image);

      const uploadRes = await agent
        .post(API_UPLOAD_IMAGES_URL, {
          original_url: originalImage.location,
          original_key: originalImage.key,
          resized_50_url: resized50Image.location,
          resized_50_key: resized50Image.key,
          resized_25_url: resized25Image.location,
          resized_25_key: resized25Image.key,
        })
        .finally(() => setUploadingFile(false));
      const { message } = uploadRes?.data;
      if (!message) return false;

      loadImageAction();
      toggle();
      setFile(null);
      setImage(null);
    }
  }, [file, image, toggle, loadImageAction]);

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
