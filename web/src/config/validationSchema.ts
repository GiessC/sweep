import {
    INVALID_EMAIL,
    MAX_LENGTH,
    MIN_LENGTH,
    REQUIRED,
} from '@/errors/ErrorMessages';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

//#region Constants
// Posts
// TODO: Extract these to config json files
export const MIN_TITLE_LENGTH = 1;
export const MAX_TITLE_LENGTH = 40;
export const MIN_CONTENT_LENGTH = 1;
export const MAX_CONTENT_LENGTH = 300;

// Auth
export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 25;
export const MIN_PASSWORD_LENGTH = 8;
export const MIN_PASSWORD_LOWERCASE = 1;
export const MIN_PASSWORD_UPPERCASE = 1;
export const MIN_PASSWORD_NUMBER = 1;
export const MIN_PASSWORD_SYMBOL = 1;
//#endregion

//#region Schema
// Posts
export const createPostReqSchema = Yup.object({
    title: Yup.string()
        .nonNullable()
        .required(REQUIRED('Title'))
        .min(MIN_TITLE_LENGTH, MIN_LENGTH('Title', MIN_TITLE_LENGTH))
        .max(MAX_TITLE_LENGTH, MAX_LENGTH('Title', MAX_TITLE_LENGTH)),
    content: Yup.string()
        .nonNullable()
        .required(REQUIRED('Content'))
        .min(MIN_CONTENT_LENGTH, MIN_LENGTH('Content', MIN_CONTENT_LENGTH))
        .max(MAX_CONTENT_LENGTH, MAX_LENGTH('Content', MAX_CONTENT_LENGTH)),
});
export const editPostReqSchema = Yup.object({
    slug: Yup.string().nonNullable().required(REQUIRED('Slug')),
    title: Yup.string()
        .nonNullable()
        .required(REQUIRED('Title'))
        .min(MIN_TITLE_LENGTH, MIN_LENGTH('Title', MIN_TITLE_LENGTH))
        .max(MAX_TITLE_LENGTH, MAX_LENGTH('Title', MAX_TITLE_LENGTH)),
    content: Yup.string()
        .nonNullable()
        .required(REQUIRED('Content'))
        .min(MIN_CONTENT_LENGTH, MIN_LENGTH('Content', MIN_CONTENT_LENGTH))
        .max(MAX_CONTENT_LENGTH, MAX_LENGTH('Content', MAX_CONTENT_LENGTH)),
});

// Auth
export const signupReqSchema = Yup.object({
    email: Yup.string().required(REQUIRED('Email')).email(INVALID_EMAIL()),
    username: Yup.string()
        .required(REQUIRED('Username'))
        .min(MIN_USERNAME_LENGTH, MIN_LENGTH('Username', MIN_USERNAME_LENGTH))
        .max(MAX_USERNAME_LENGTH, MAX_LENGTH('Username', MAX_USERNAME_LENGTH)),
    password: Yup.string()
        .nonNullable()
        .required(REQUIRED('Password'))
        .min(MIN_PASSWORD_LENGTH, MIN_LENGTH('Password', MIN_PASSWORD_LENGTH))
        .minLowercase(
            MIN_PASSWORD_LOWERCASE,
            `Password must contain at least ${MIN_PASSWORD_LOWERCASE} lowercase character(s).`,
        )
        .minUppercase(
            MIN_PASSWORD_UPPERCASE,
            `Password must contain at least ${MIN_PASSWORD_UPPERCASE} uppercase character(s).`,
        )
        .minNumbers(
            MIN_PASSWORD_NUMBER,
            `Password must contain at least ${MIN_PASSWORD_NUMBER} number(s).`,
        )
        .minSymbols(
            MIN_PASSWORD_SYMBOL,
            `Password must contain at least ${MIN_PASSWORD_SYMBOL} symbol(s).`,
        ),
    confirmPassword: Yup.string()
        .nonNullable()
        .when('password', (password, field) =>
            password
                ? field
                      .required(REQUIRED('Confirm password'))
                      .oneOf([Yup.ref('password')], 'Passwords must match.')
                : field,
        ),
});
// #endregion
