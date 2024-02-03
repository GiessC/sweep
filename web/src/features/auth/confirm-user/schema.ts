import * as Yup from 'yup';

const confirmUserSchema = Yup.object({
    code: Yup.string().required('Code is required'),
    username: Yup.string().required('Username is required'),
});

export default confirmUserSchema;
