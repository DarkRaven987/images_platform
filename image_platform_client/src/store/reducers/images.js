import { createSlice } from '@reduxjs/toolkit';
import { agent } from '../../utils/agent';
import { API_IMAGES_URL } from '../../utils/agentConsts';

const initialState = {
  images: [],
  loading: false,
};

const { actions, reducer } = createSlice({
  name: 'images',
  initialState,
  reducers: {
    saveImagesData(state, action) {
      state.images = action.payload;
      return state;
    },
    saveImagesLoading(state, action) {
      state.loading = action.payload;
      return state;
    },
  },
});

export const { saveImagesData, saveImagesLoading } = actions;

export const loadImageAction = async ({ dispatch }) => {
  try {
    dispatch(saveImagesLoading(true));
    const loadedImages = await agent
      .get(API_IMAGES_URL)
      .finally(() => dispatch(saveImagesLoading(false)));

    if (!loadedImages?.data) return false;

    dispatch(saveImagesData(loadedImages?.data));

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default reducer;
