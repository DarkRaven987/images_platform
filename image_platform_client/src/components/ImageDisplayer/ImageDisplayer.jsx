import './ImageDisplayer.css';

const ImageDisplayer = ({ src = null }) => (
  <div className="image-displayer-background">
    <div
      className="image-displayer"
      style={{
        backgroundImage: `url(${src})`,
      }}
    >
      <img src={src} alt="#" />
    </div>
  </div>
);

export default ImageDisplayer;
