import { REQUIRED } from '@/errors/ErrorMessages';
import * as Yup from 'yup';

const confirmUserSchema = Yup.object({
    code: Yup.string().required(REQUIRED('Code')),
    username: Yup.string().required(REQUIRED('Username')),
});

export default confirmUserSchema;
