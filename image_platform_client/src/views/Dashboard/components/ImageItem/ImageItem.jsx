import ImageDisplayer from '../../../../components/ImageDisplayer/ImageDisplayer';
import './ImageItem.css';

const ImageItem = ({ image, selectImage }) => (
  <div
    className="image-item-container shadow-on-hover diagonal-shadow"
    onClick={() => selectImage(image)}
  >
    <ImageDisplayer src={image.image_100} />
  </div>
);

export default ImageItem;
