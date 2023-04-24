import { CloseIcon, DeleteIcon, DownloadIcon } from '../../../../assets/icons';
import ImageDisplayer from '../../../../components/ImageDisplayer/ImageDisplayer';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import './ImageItemModal.css';
import { useCallback, useState } from 'react';
import { agent } from '../../../../utils/agent';
import { API_IMAGES_URL } from '../../../../utils/agentConsts';
import { connect } from 'react-redux';
import CircleLoader from '../../../../components/CircleLoader/CircleLoader';
import { loadImageAction } from '../../../../store/reducers/images';

const ImageItemModal = ({ show, toggle, image = {}, loadImageAction }) => {
  const [deletingFile, setDeletingFile] = useState(false);

  const handleImageDownload = useCallback(
    async (image_size) => {
      if (image && image[image_size]) {
        fetch(image[image_size])
          .then((resp) => resp.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${image_size}.${image[image_size]
              .split('.')
              .splice(-1, 1)}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
          });
      }
    },
    [image],
  );

  const handleImageDelete = useCallback(() => {
    if (image) {
      setDeletingFile(true);
      agent
        .delete(`${API_IMAGES_URL}/${encodeURIComponent(image?.image_id)}`)
        .then(() => {
          loadImageAction();
          toggle();
        })
        .finally(() => setDeletingFile(false));
    }
  }, [image, loadImageAction, toggle]);

  return (
    <Modal show={show} toggle={toggle}>
      <div
        className="image-item-modal-close-btn shadow-on-hover"
        onClick={toggle}
      >
        <CloseIcon />
      </div>

      <div className="image-item-modal-content">
        <div className="image">
          <ImageDisplayer src={image?.image_100} />
        </div>

        <div className="image-menu">
          <div className="image-menu-item-row">
            <div className="image-menu-item-label">Original size</div>
            <Button onClick={() => handleImageDownload('image_100')}>
              <DownloadIcon />
              Download
            </Button>
          </div>

          <div className="image-menu-item-row">
            <div className="image-menu-item-label">50% size</div>
            <Button onClick={() => handleImageDownload('image_50')}>
              <DownloadIcon />
              Download
            </Button>
          </div>

          <div className="image-menu-item-row">
            <div className="image-menu-item-label">25% size</div>
            <Button onClick={() => handleImageDownload('image_25')}>
              <DownloadIcon />
              Download
            </Button>
          </div>

          <div className="image-menu-item-row">
            <Button className="red-button" onClick={handleImageDelete}>
              <DeleteIcon />
              Delete this image
            </Button>
          </div>
        </div>
      </div>
      <CircleLoader show={deletingFile} />
    </Modal>
  );
};

export default connect(
  () => ({}),
  (dispatch) => ({
    loadImageAction: () => loadImageAction({ dispatch }),
  }),
)(ImageItemModal);
