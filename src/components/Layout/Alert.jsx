import { useContext } from 'react';

import AlertContext from '../../context/alert/AlertContext';

const Alert = () => {
  const { alert } = useContext(AlertContext);

  if (alert.type === 'error') {
    return (
      <div className="toast toast-top toast-end top-24 z-50">
        <div className="alert alert-error shadow-lg">{alert.message}</div>
      </div>
    );
  }
};

export default Alert;
