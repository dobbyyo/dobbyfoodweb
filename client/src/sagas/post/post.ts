import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  addCommentFailure,
  addCommentRequest,
  addCommentSuccess,
  addImagesFailure,
  addImagesRequest,
  addImagesSuccess,
  addPostFailure,
  addPostRequest,
  addPostSuccess,
  likePostFailure,
  likePostRequest,
  likePostSuccess,
  loadChinaPostsFailure,
  loadChinaPostsRequest,
  loadChinaPostsSuccess,
  loadEuPostsFailure,
  loadEuPostsRequest,
  loadEuPostsSuccess,
  loadJapanPostsFailure,
  loadJapanPostsRequest,
  loadJapanPostsSuccess,
  loadKoreaPostsFailure,
  loadKoreaPostsRequest,
  loadKoreaPostsSuccess,
  loadOtherUserPostsFailure,
  loadOtherUserPostsRequest,
  loadOtherUserPostsSuccess,
  loadPostFailure,
  loadPostRequest,
  loadPostsFailure,
  loadPostsRequest,
  loadPostsSuccess,
  loadPostSuccess,
  loadSavePostsFailure,
  loadSavePostsRequest,
  loadSavePostsSuccess,
  removeCommentFailure,
  removeCommentRequest,
  removeCommentSuccess,
  removePostFailure,
  removePostRequest,
  removePostSuccess,
  removeSavePostFailure,
  removeSavePostRequest,
  removeSavePostSuccess,
  savePostFailure,
  savePostRequest,
  savePostSuccess,
  unLikePostFailure,
  unLikePostRequest,
  unLikePostSuccess,
  updateCommentFailure,
  updateCommentRequest,
  updateCommentSuccess,
} from '../../reducers/post/post';
import { CommentProps, OtherPosts } from '../../reducers/post/postType';
import { addPostToMe, removePostToMe } from '../../reducers/user/user';

// ADD POST
async function addPostAPI(data: FormData) {
  const res = await axios.post('/post', data);
  return res;
}

function* addPost(action: PayloadAction<FormData>) {
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
async function RemovePostAPI(data: number) {
  const res = await axios.delete(`/post/${data}`);
  return res;
}

function* RemovePost(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse = yield call(RemovePostAPI, action.payload);
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

// LOAD POSTS
async function loadPostsAPI(lastId: number) {
  const res = await axios.get(`/posts?lastId=${lastId}`);
  return res;
}

function* loadPosts(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse = yield call(loadPostsAPI, action.payload);
    yield put(loadPostsSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadPostsFailure(err.response?.data));
  }
}

function* sagaLoadPosts() {
  yield takeLatest(loadPostsRequest.type, loadPosts);
}

// 한식 포스터
async function loadKoreaPostsAPI() {
  const res = await axios.get('/posts/korea');
  return res;
}

function* loadKoreaPosts() {
  try {
    const result: AxiosResponse = yield call(loadKoreaPostsAPI);
    yield put(loadKoreaPostsSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadKoreaPostsFailure(err.response?.data));
  }
}

function* sagaLoadKoreaPosts() {
  yield takeLatest(loadKoreaPostsRequest.type, loadKoreaPosts);
}

// 일식 포스터
async function loadJapanPostsAPI() {
  const res = await axios.get('/posts/japan');
  return res;
}

function* loadJapanPosts() {
  try {
    const result: AxiosResponse = yield call(loadJapanPostsAPI);
    yield put(loadJapanPostsSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadJapanPostsFailure(err.response?.data));
  }
}

function* sagaLoadJapanPosts() {
  yield takeLatest(loadJapanPostsRequest.type, loadJapanPosts);
}

// 중식 포스터
async function loadChinaPostsAPI() {
  const res = await axios.get('posts/china');
  return res;
}

function* loadChinaPosts() {
  try {
    const result: AxiosResponse = yield call(loadChinaPostsAPI);
    yield put(loadChinaPostsSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadChinaPostsFailure(err.response?.data));
  }
}

function* sagaLoadChinaPosts() {
  yield takeLatest(loadChinaPostsRequest.type, loadChinaPosts);
}

// 양식 포스터
async function loadEuPostsAPI() {
  const res = await axios.get('posts/eu');
  return res;
}

function* loadEuPosts() {
  try {
    const result: AxiosResponse = yield call(loadEuPostsAPI);
    yield put(loadEuPostsSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadEuPostsFailure(err.response?.data));
  }
}

function* sagaLoadEuPosts() {
  yield takeLatest(loadEuPostsRequest.type, loadEuPosts);
}

// LOAD POST
async function loadPostAPI(postId: number) {
  const res = await axios.get(`/post/${postId}`);
  return res;
}

function* loadPost(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse = yield call(loadPostAPI, action.payload);
    yield put(loadPostSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadPostFailure(err.response?.data));
  }
}

function* sagaLoadPost() {
  yield takeLatest(loadPostRequest.type, loadPost);
}

// LIKE POST
async function likePostAPI(data: number) {
  const res = await axios.patch(`/post/${data}/like`);
  return res;
}

function* likePost(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse = yield call(likePostAPI, action.payload);
    yield put(likePostSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(likePostFailure(err.response?.data));
  }
}

function* sagaLikePost() {
  yield takeLatest(likePostRequest.type, likePost);
}

// UNLIKE POST
async function unLikePostAPI(data: number) {
  const res = await axios.delete(`/post/${data}/like`);
  return res;
}

function* unLikePost(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse = yield call(unLikePostAPI, action.payload);
    yield put(unLikePostSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(unLikePostFailure(err.response?.data));
  }
}

function* sagaUnLikePost() {
  yield takeLatest(unLikePostRequest.type, unLikePost);
}

// ADD COMMENT
async function addCommentAPI(data: CommentProps) {
  console.log(data);
  const res = await axios.post(`/post/${data.postId}/comment`, data);
  return res;
}

function* addComment(action: PayloadAction<CommentProps>) {
  try {
    const result: AxiosResponse = yield call(addCommentAPI, action.payload);
    console.log(result);
    yield put(addCommentSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(addCommentFailure(err.response?.data));
  }
}

function* sagAddComment() {
  yield takeLatest(addCommentRequest.type, addComment);
}

// REMOVE COMMENT
async function removeCommentAPI(commentId: number) {
  const res = await axios.delete(`/post/comment/${commentId}`);
  return res;
}

function* removeComment(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse = yield call(removeCommentAPI, action.payload);
    yield put(removeCommentSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(removeCommentFailure(err.response?.data));
  }
}

function* sagaRemoveComment() {
  yield takeLatest(removeCommentRequest.type, removeComment);
}

// UPDATE COMMENT
async function updateCommentAPI(data: CommentProps) {
  const res = await axios.patch(`/post/comment/${data.commentId}`, data);
  return res;
}

function* updateComment(action: PayloadAction<CommentProps>) {
  try {
    const result: AxiosResponse = yield call(updateCommentAPI, action.payload);
    yield put(updateCommentSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(updateCommentFailure(err.response?.data));
  }
}

function* sagaUpdateComment() {
  yield takeLatest(updateCommentRequest.type, updateComment);
}

// SAVE POST
async function savePostAPI(postId: number) {
  const res = await axios.patch(`/post/${postId}/save`);
  return res;
}

function* savePost(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse = yield call(savePostAPI, action.payload);
    yield put(savePostSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(savePostFailure(err.response?.data));
  }
}

function* sagaSavePost() {
  yield takeLatest(savePostRequest.type, savePost);
}

// REMOVE SAVE POST
async function removeSavePostAPI(postId: number) {
  const res = await axios.delete(`/post/${postId}/save`);
  return res;
}

function* removeSavePost(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse = yield call(removeSavePostAPI, action.payload);
    yield put(removeSavePostSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(removeSavePostFailure(err.response?.data));
  }
}

function* sagaRemoveSavePost() {
  yield takeLatest(removeSavePostRequest.type, removeSavePost);
}

// LOAD OTHER USER POSTS
async function loadOtherUserPostsAPI(data: any, lastId: any) {
  console.log(data);
  const res = await axios.get(`/post/${data}/userposts?lastId=${lastId || 0}`);
  return res;
}

function* loadOtherUserPosts(action: PayloadAction<any>) {
  try {
    const result: AxiosResponse = yield call(loadOtherUserPostsAPI, action.payload, action.payload.lastId);
    yield put(loadOtherUserPostsSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadOtherUserPostsFailure(err.response?.data));
  }
}

function* sagaLoadOtherUserPosts() {
  yield takeLatest(loadOtherUserPostsRequest.type, loadOtherUserPosts);
}

// LOAD SAVE POSTS
async function loadSavePostsAPI(userId: number) {
  const res = await axios.get(`/posts/${userId}/saved`);
  return res;
}

function* loadSavePosts(action: PayloadAction<number>) {
  try {
    const result: AxiosResponse = yield call(loadSavePostsAPI, action.payload);
    yield put(loadSavePostsSuccess(result.data));
  } catch (error) {
    const err = error as AxiosError;
    console.error(err);
    yield put(loadSavePostsFailure(err.response?.data));
  }
}

function* sagaLoadSavePosts() {
  yield takeLatest(loadSavePostsRequest.type, loadSavePosts);
}

export default function* postSaga() {
  yield all([
    fork(sagaAddPost),
    fork(sagaRemovePost),
    fork(sagaAddImages),
    fork(sagaLoadPosts),
    fork(sagaLoadKoreaPosts),
    fork(sagaLoadJapanPosts),
    fork(sagaLoadChinaPosts),
    fork(sagaLoadEuPosts),
    fork(sagaLoadPost),
    fork(sagaLikePost),
    fork(sagaUnLikePost),
    fork(sagAddComment),
    fork(sagaRemoveComment),
    fork(sagaUpdateComment),
    fork(sagaSavePost),
    fork(sagaRemoveSavePost),
    fork(sagaLoadOtherUserPosts),
    fork(sagaLoadSavePosts),
  ]);
}
