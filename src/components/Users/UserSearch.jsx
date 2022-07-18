import { useState, useContext } from 'react';

import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

import { searchUsers } from '../../context/github/githubActions';

const UserSearch = () => {
  const [text, setText] = useState('');

  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const changeHandler = (event) => setText(event.target.value);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (text.trim() === '') {
      setAlert("You can't search for nobody...", 'error');
    } else {
      dispatch({ type: 'SET_LOADING' });

      const users = await searchUsers(text);
      dispatch({ type: 'GET_USERS', payload: users });
    }
  };

  const clearHandler = () => {
    dispatch({ type: 'CLEAR_USERS' });
  };

  return (
    <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
      <div>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <div className="input-group">
              <input
                className="input input-bordered w-full input-lg"
                type="text"
                placeholder="Search!"
                onChange={changeHandler}
                value={text}
              />
              <button className="btn btn-lg btn-accent" type="submit">
                GO!
              </button>
            </div>
          </div>
        </form>
      </div>
      {users?.length > 0 && (
        <div>
          <button
            className="btn btn-outline btn-info btn-lg w-full md:btn-wide"
            onClick={clearHandler}
          >
            CLEAR
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
