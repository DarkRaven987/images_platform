import { useCallback, useState } from 'react';

import Button from '../../../../components/Button/Button';
import './AddImage.css';
import AddImageModal from '../AddImageModal/AddImageModal';

const AddImage = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal((val) => !val);
  }, []);

  return (
    <div className="add-image-btn-container">
      <Button onClick={toggleModal}>Add new image</Button>
      <AddImageModal toggle={toggleModal} show={showModal} />
    </div>
  );
};

export default AddImage;
