import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import { loadImageAction } from '../../../../store/reducers/images';
import ImageItem from '../ImageItem/ImageItem';
import ImageItemModal from '../ImageItemModal/ImageItemModal';
import './ImagesList.css';
import CircleLoader from '../../../../components/CircleLoader/CircleLoader';

const ImagesList = ({ images, loadingImages, loadImageAction }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadImageAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="images-list-container">
        {images.map((item) => (
          <ImageItem
            key={item.image_id}
            image={item}
            selectImage={(data) => setSelectedImage(data)}
          />
        ))}
        <ImageItemModal
          show={!!selectedImage}
          toggle={() => setSelectedImage(null)}
          image={selectedImage}
        />
      </div>
      <CircleLoader show={loadingImages} />
    </>
  );
};

export default connect(
  (state) => ({
    images: state.image.images,
    loadingImages: state.image.loading,
  }),
  (dispatch) => ({
    loadImageAction: () => loadImageAction({ dispatch }),
  }),
)(ImagesList);
