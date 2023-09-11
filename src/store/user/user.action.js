import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
    createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const gooleSignInStart = () =>
    createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (user) =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const emailSignUpStart = (email, password, displayName) =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, {email, password, displayName});

export const SignUpFailed = (error) =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_FAILED, error);

export const SignUpSuccess = (user, additionalDetails) =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS, user, additionalDetails);

export const signOutStart = () =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const SignOutFailed = (error) =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

export const SignOutSuccess = () =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);