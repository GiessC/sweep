import { FormGroup, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

interface ConfirmUserRequest {
    letter1: string;
    letter2: string;
    letter3: string;
    letter4: string;
    letter5: string;
    letter6: string;
}

const ConfirmUserForm = () => {
    const { formState, register, handleSubmit } = useForm<ConfirmUserRequest>();

    const onSubmit = () => {};

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <FormGroup>
                <TextField
                    {...register('letter1')}
                    label=''
                />
                <TextField
                    {...register('letter2')}
                    label=''
                />
                <TextField
                    {...register('letter3')}
                    label=''
                />
                <TextField
                    {...register('letter4')}
                    label=''
                />
                <TextField
                    {...register('letter5')}
                    label=''
                />
                <TextField
                    {...register('letter6')}
                    label=''
                />
            </FormGroup>
        </form>
    );
};

export default ConfirmUserForm;
