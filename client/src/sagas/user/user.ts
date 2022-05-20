import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  joinFailure,
  joinRequest,
  joinSuccess,
  loadMyInfoFailure,
  loadMyInfoRequest,
  loadMyInfoSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  passwordChangeFailure,
  passwordChangeRequest,
  passwordChangeSuccess,
  userChangeFailure,
  userChangeRequest,
  userChangeSuccess,
  userImageFailure,
  userImageRequest,
  userImageSuccess,
} from '../../reducers/user/user';
import { EditPasswordProps, JoinProps, loginProps, UserChangeProps } from '../../reducers/user/userTypes';

// LOG IN
async function loginAPI(data: loginProps) {
  const res = await axios.post('/user/login', data);
  return res;
}

function* login(action: PayloadAction<loginProps>) {
  try {
    const result: AxiosResponse = yield call(loginAPI, action.payload);
    yield put(loginSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loginFailure(err.response?.data));
  }
}

function* sagaLogin() {
  yield takeLatest(loginRequest.type, login);
}

// SIGN UP
async function joinAPI(data: JoinProps) {
  const res = await axios.post('/user/join', data);
  return res;
}

function* join(action: PayloadAction<JoinProps>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: AxiosResponse = yield call(joinAPI, action.payload);
    yield put(joinSuccess());
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(joinFailure(err.response?.data));
  }
}

function* sagaJoin() {
  yield takeLatest(joinRequest.type, join);
}

// LOG OUT
async function logoutAPI() {
  const res = await axios.get('/user/logout');
  return res;
}

function* logout() {
  try {
    const result: AxiosResponse = yield call(logoutAPI);
    yield put(logoutSuccess());
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(logoutFailure(err.response?.data));
  }
}

function* sagaLogout() {
  yield takeLatest(logoutRequest.type, logout);
}

// LOAD MY INFO
async function loadMyInfoAPI() {
  const res = await axios.get('/user');
  return res;
}

function* loadMyInfo() {
  try {
    const result: AxiosResponse = yield call(loadMyInfoAPI);
    yield put(loadMyInfoSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadMyInfoFailure(err.response?.data));
  }
}

function* sagaLoadMyInfo() {
  yield takeLatest(loadMyInfoRequest.type, loadMyInfo);
}

// USER CHANGE
async function userChangeAPI(data: UserChangeProps) {
  const res = await axios.patch(`/user/${data.UserId}`, data.data);
  return res;
}

function* userChange(action: PayloadAction<UserChangeProps>) {
  try {
    const result: AxiosResponse = yield call(userChangeAPI, action.payload);
    yield put(userChangeSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(userChangeFailure(err.response?.data));
  }
}

function* sagaUserChange() {
  yield takeLatest(userChangeRequest.type, userChange);
}

// PASSWORD CHANGE
async function passwordChangeAPI(data: EditPasswordProps) {
  const res = await axios.patch('/user/password', data);
  return res;
}

function* passwordChange(action: PayloadAction<EditPasswordProps>) {
  try {
    const result: AxiosResponse = yield call(passwordChangeAPI, action.payload);
    yield put(passwordChangeSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(passwordChangeFailure(err.response?.data));
  }
}

function* sagaPasswordChange() {
  yield takeLatest(passwordChangeRequest.type, passwordChange);
}

// USER DELETE
async function deleteUserAPI(userId: string | number) {
  const res = await axios.delete(`/user/${userId}`);
  return res;
}

function* deleteUser(action: PayloadAction<string | number>) {
  try {
    const result: AxiosResponse = yield call(deleteUserAPI, action.payload);
    yield put(deleteUserSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(deleteUserFailure(err.response?.data));
  }
}

function* sagaDeleteUser() {
  yield takeLatest(deleteUserRequest.type, deleteUser);
}

// USER IMG UPLOAD
async function userImageAPI(data: FormData) {
  const res = await axios.post('/user/image', data);
  return res;
}

function* userImage(action: PayloadAction<FormData>) {
  try {
    const result: AxiosResponse = yield call(userImageAPI, action.payload);
    yield put(userImageSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(userImageFailure(err.response?.data));
  }
}

function* sagaUserImage() {
  yield takeLatest(userImageRequest.type, userImage);
}

export default function* userSaga() {
  yield all([
    fork(sagaJoin),
    fork(sagaLogin),
    fork(sagaLogout),
    fork(sagaLoadMyInfo),
    fork(sagaUserChange),
    fork(sagaPasswordChange),
    fork(sagaDeleteUser),
    fork(sagaUserImage),
  ]);
}
