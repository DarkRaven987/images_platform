import './Modal.css';
import ReactDOM from 'react-dom';

const Modal = ({
  className = '',
  show = false,
  toggle = () => {},
  children,
}) => {
  return ReactDOM.createPortal(
    <>
      {show && (
        <div className={`modal-wrapper ${className}`} onClick={toggle}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal-root'),
  );
};

export default Modal;
