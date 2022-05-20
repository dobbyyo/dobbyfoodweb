export interface JoinProps {
  email: string;
  password: string;
  name: string;
  nickname: string;
}
export interface loginProps {
  email: string;
  password: string;
}
export interface MyInfo {
  id: number;
  name: string;
  nickname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  Posts: any[];
  Followings: any[];
  Followers: any[];
  Image: null;
}

export interface UserChangeProps {
  data: FormData;
  UserId: number;
}
export interface UserChangeSuccessProps {
  email: string;
  nickname: string;
  image?: string;
  Image: any;
  me: any;
}
export interface EditPasswordProps {
  currentPassword: string;
  changePassword: string;
  newPasswordOk: string;
}
export interface UserState {
  me?: MyInfo | null;
  userInfo?: any;
  imagePaths: string[];
  Followings: any[];
  Followers: any[];

  logInLoading: boolean;
  logInDone: boolean;
  loginError: string | null | unknown;
  joinLoading: boolean;
  joinDone: boolean;
  joinError: string | null | unknown;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: string | null | unknown;

  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: string | null | unknown;

  userChangeLoading: boolean;
  userChangeDone: boolean;
  userChangeError: string | null | unknown;

  passwordChangeLoading: boolean;
  passwordChangeDone: boolean;
  passwordChangeError: string | null | unknown;

  deleteUserLoading: boolean;
  deleteUserDone: boolean;
  deleteUserError: string | null | unknown;

  userImageLoading: boolean;
  userImageDone: boolean;
  userImageError: string | null | unknown;
}
export const initialState: UserState = {
  me: null,
  userInfo: null,
  Followings: [],
  Followers: [],
  imagePaths: [],

  logInLoading: false,
  logInDone: false,
  loginError: null,

  joinLoading: false,
  joinDone: false,
  joinError: null,

  logoutLoading: false,
  logoutDone: false,
  logoutError: null,

  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  userChangeLoading: false,
  userChangeDone: false,
  userChangeError: null,

  passwordChangeLoading: false,
  passwordChangeDone: false,
  passwordChangeError: null,

  deleteUserLoading: false,
  deleteUserDone: false,
  deleteUserError: null,

  userImageLoading: false,
  userImageDone: false,
  userImageError: null,
};
