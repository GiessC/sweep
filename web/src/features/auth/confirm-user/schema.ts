import { EXACT_LENGTH, REQUIRED } from '@/errors/ErrorMessages';
import * as Yup from 'yup';

const confirmUserSchema = Yup.object({
    code: Yup.number()
        .required(REQUIRED('Code'))
        .min(6, EXACT_LENGTH('Code', 6))
        .max(6, EXACT_LENGTH('Code', 6)),
    username: Yup.string().required(REQUIRED('Username')),
});

export default confirmUserSchema;
