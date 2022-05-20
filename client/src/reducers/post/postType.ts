export interface PostState {
  mainPosts: any[];
  savedPosts: any[];
  categoryPosts: any[];
  imagePaths: string[];
  singlePost: any;

  morePosts: boolean;

  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: string | null | unknown;

  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: string | null | unknown;

  addImagesLoading: boolean;
  addImagesDone: boolean;
  addImagesError: string | null | unknown;

  removeImagesLoading: boolean;
  removeImagesDone: boolean;
  removeImagesError: string | null | unknown;
}

export const initialState: PostState = {
  mainPosts: [],
  savedPosts: [],
  categoryPosts: [],

  imagePaths: [],
  singlePost: null,

  morePosts: true,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addImagesLoading: false,
  addImagesDone: false,
  addImagesError: null,

  removeImagesLoading: false,
  removeImagesDone: false,
  removeImagesError: null,
};
