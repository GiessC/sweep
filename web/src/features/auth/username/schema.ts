import { INVALID_EMAIL, REQUIRED } from '@/errors/ErrorMessages';
import * as Yup from 'yup';

const forgotUsernameSchema = Yup.object({
    email: Yup.string().required(REQUIRED('Email')).email(INVALID_EMAIL()),
});

export default forgotUsernameSchema;
