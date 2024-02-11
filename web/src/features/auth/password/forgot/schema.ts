import { INVALID_EMAIL, REQUIRED } from '@/errors/ErrorMessages';
import * as Yup from 'yup';

const forgotPasswordSchema = Yup.object({
    email: Yup.string().required(REQUIRED('Email')).email(INVALID_EMAIL()),
    username: Yup.string().required(REQUIRED('Username')),
});

export default forgotPasswordSchema;
