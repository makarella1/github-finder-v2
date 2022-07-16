import { useReducer, createContext } from 'react';

import alertReducer from './alertReducer';

const initialState = null;

const AlertContext = createContext(initialState);

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (message, type) => {
    dispatch({ type: 'SET_ALERT', payload: { type, message } });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_ALERT' });
    }, 3000);
  };

  const context = {
    alert: state,
    setAlert,
  };

  return (
    <AlertContext.Provider value={context}>{children}</AlertContext.Provider>
  );
};

export default AlertContext;
