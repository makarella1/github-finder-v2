import { BallTriangle } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <BallTriangle
        height="100"
        width="100"
        color="white"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default Spinner;
