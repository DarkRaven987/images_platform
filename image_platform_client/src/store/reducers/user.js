import { createSlice } from '@reduxjs/toolkit';
import { agent } from '../../utils/agent';
import { API_SIGN_IN_URL, API_SIGN_UP_URL } from '../../utils/agentConsts';

const initialState = null;

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserData(state, action) {
      return (state = action.payload);
    },
    clearUserData(state, action) {
      return (state = action.payload);
    },
  },
});

export const { saveUserData, clearUserData } = actions;

export const signInAction = async ({ dispatch, username, password }) => {
  if (!username || !password) return false;

  try {
    const userData = await agent.post(API_SIGN_IN_URL, { username, password });
    const { user, accessToken, refreshToken } = userData?.data;

    if (!user?.PK) return false;

    dispatch(saveUserData(user));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', `Bearer ${accessToken}`);
    localStorage.setItem('refreshToken', `Bearer ${refreshToken}`);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const signUpAction = async ({ username, password }) => {
  if (!username || !password) return false;

  try {
    await agent.post(API_SIGN_UP_URL, { username, password });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const signOutAction = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.replace(`${window.location.origin}/login`);
};

export default reducer;
