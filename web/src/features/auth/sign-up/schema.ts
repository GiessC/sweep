import Validation from '@/config/validation.json';
import {
    INVALID_EMAIL,
    MAX_LENGTH,
    MIN_LENGTH,
    REQUIRED,
} from '@/errors/ErrorMessages';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const MIN_USERNAME_LENGTH = Validation.Auth.MIN_USERNAME_LENGTH;
export const MAX_USERNAME_LENGTH = Validation.Auth.MAX_USERNAME_LENGTH;
export const MIN_PASSWORD_LENGTH = Validation.Auth.MIN_PASSWORD_LENGTH;
export const MIN_PASSWORD_LOWERCASE = Validation.Auth.MIN_PASSWORD_LOWERCASE;
export const MIN_PASSWORD_UPPERCASE = Validation.Auth.MIN_PASSWORD_UPPERCASE;
export const MIN_PASSWORD_NUMBER = Validation.Auth.MIN_PASSWORD_NUMBER;
export const MIN_PASSWORD_SYMBOL = Validation.Auth.MIN_PASSWORD_SYMBOL;

const signUpSchema = Yup.object({
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

export default signUpSchema;
