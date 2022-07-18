import { createContext, useState, useCallback, useReducer } from 'react';

import githubReducer from './githubReducer';

const initialState = {
  users: [],
  user: {},
  repos: [],
  isLoading: false,
  dispatch: (action) => {},
};

const GithubContext = createContext(initialState);

export const GithubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const context = {
    ...state,
    dispatch,
  };

  return (
    <GithubContext.Provider value={context}>{children}</GithubContext.Provider>
  );
};

export default GithubContext;
