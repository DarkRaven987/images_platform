import { createSlice } from '@reduxjs/toolkit';
import { agent } from '../../utils/agent';
import { API_GET_IMAGES_URL } from '../../utils/agentConsts';

const initialState = [];

const { actions, reducer } = createSlice({
  name: 'images',
  initialState,
  reducers: {
    saveImagesData(state, action) {
      return (state = action.payload);
    },
  },
});

export const { saveUserData, clearUserData } = actions;

export const loadImageAction = async ({ dispatch }) => {
  try {
    const loadedImages = await agent.get(API_GET_IMAGES_URL);
    const { images } = loadedImages?.data;

    if (!images) return false;

    dispatch(saveUserData(images));

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default reducer;
