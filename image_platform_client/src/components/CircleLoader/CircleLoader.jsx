import './CircleLoader.css';

const CircleLoader = ({ show, className = '' }) => {
  return (
    <>
      {show ? (
        <div className={`loader-container ${className}`}>
          <div className="sbl-circ"></div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CircleLoader;
