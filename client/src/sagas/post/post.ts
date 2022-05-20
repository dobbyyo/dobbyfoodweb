import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  addImagesFailure,
  addImagesRequest,
  addImagesSuccess,
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  removePostFailure,
  removePostRequest,
  removePostSuccess,
} from '../../reducers/post/post';
import { addPostToMe, removePostToMe } from '../../reducers/user/user';

// ADD POST
async function addPostAPI(data: any) {
  const res = await axios.post('/post', data);
  return res;
}

function* addPost(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(addPostAPI, action.payload);
    yield put(addPostSuccess(result.data));
    yield put(addPostToMe(result.data.id));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(addPostFailure(err.response?.data));
  }
}

function* sagaAddPost() {
  yield takeLatest(addPostRequest.type, addPost);
}

// REMOVE POST
async function RemovePostAPI(data: any) {
  const res = await axios.delete(`/post/${data}`);
  return res;
}

function* RemovePost(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(RemovePostAPI, action.payload);
    console.log(result);
    yield put(removePostSuccess(result.data));
    yield put(removePostToMe(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(removePostFailure(err.response?.data));
  }
}

function* sagaRemovePost() {
  yield takeLatest(removePostRequest.type, RemovePost);
}

// ADD POST IMAGES
async function addImagesAPI(data: FormData) {
  const res = await axios.post('/post/images', data);
  return res;
}

function* addImages(action: PayloadAction<FormData>) {
  try {
    const result: AxiosResponse = yield call(addImagesAPI, action.payload);
    yield put(addImagesSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(addImagesFailure(err.response?.data));
  }
}

function* sagaAddImages() {
  yield takeLatest(addImagesRequest.type, addImages);
}

export default function* postSaga() {
  yield all([fork(sagaAddPost), fork(sagaRemovePost), fork(sagaAddImages)]);
}
