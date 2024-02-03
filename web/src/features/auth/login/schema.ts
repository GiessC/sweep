import { REQUIRED } from '@/errors/ErrorMessages';
import * as Yup from 'yup';

const loginSchema = Yup.object({
    username: Yup.string().nonNullable().required(REQUIRED('Username')),
    password: Yup.string().nonNullable().required(REQUIRED('Password')),
});

export default loginSchema;
