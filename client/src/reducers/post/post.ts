/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './postType';

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // ADD POST
    addPostRequest: (state, _action: PayloadAction<any>) => {
      state.addPostLoading = true;
      state.addPostDone = false;
      state.addPostError = null;
    },
    addPostSuccess: (state, action: PayloadAction<any>) => {
      state.addPostLoading = false;
      state.addPostDone = true;
      state.addPostError = null;
      state.mainPosts.unshift(action.payload);
      state.imagePaths = [];
    },
    addPostFailure: (state, action: PayloadAction<string | unknown>) => {
      state.addPostLoading = false;
      state.addPostDone = false;
      state.addPostError = action.payload;
    },

    // Remove POST
    removePostRequest: (state, _action: PayloadAction<number>) => {
      state.removePostLoading = true;
      state.removePostDone = false;
      state.removePostError = null;
    },
    removePostSuccess: (state, action: PayloadAction<any>) => {
      console.log(action);
      state.removePostLoading = false;
      state.removePostDone = true;
      state.removePostError = null;
      state.mainPosts = state.mainPosts.filter((v) => v.id !== action.payload.PostId);
    },
    removePostFailure: (state, action: PayloadAction<string | unknown>) => {
      state.removePostLoading = false;
      state.removePostDone = false;
      state.removePostError = action.payload;
    },

    // POST IMAGES ADD
    addImagesRequest: (state, _action: PayloadAction<any>) => {
      state.addImagesLoading = true;
      state.addImagesDone = false;
      state.addImagesError = null;
    },
    addImagesSuccess: (state, action: PayloadAction<string[]>) => {
      state.addImagesLoading = false;
      state.addImagesDone = true;
      state.addImagesError = null;
      state.imagePaths = state.imagePaths.concat(action.payload);
    },
    addImagesFailure: (state, action: PayloadAction<string | unknown>) => {
      state.addImagesLoading = false;
      state.addImagesDone = false;
      state.addImagesError = action.payload;
    },

    // REMOVE IMAGES
    removeImages: (state, action: PayloadAction<number>) => {
      state.imagePaths = state.imagePaths.filter((v, i) => i !== action.payload);
    },
  },
});

const { reducer, actions } = postSlice;

export const {
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  removePostRequest,
  removePostSuccess,
  removePostFailure,
  addImagesRequest,
  addImagesSuccess,
  addImagesFailure,
  removeImages,
} = actions;

export default reducer;
