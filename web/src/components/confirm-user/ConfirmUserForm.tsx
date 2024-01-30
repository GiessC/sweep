'use client';

import { AuthContext } from '@/context/AuthContext';
import { ConfirmUserRequest } from '@/hooks/useAuth';
import { getItem } from '@/utils/localStorage';
import {
    Box,
    Button,
    FormGroup,
    FormHelperText,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ConfirmUserForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const { confirmUser } = useContext(AuthContext);
    const { formState, register, handleSubmit } = useForm<ConfirmUserRequest>();
    const { isValid, isSubmitting, isDirty, errors } = formState;

    useEffect(() => {
        setUsername(getItem('username') ?? '');
    }, []);

    if (!username) {
        return <>We forgot your username... awkward.</>;
    }

    const onSubmit = async (request: ConfirmUserRequest) => {
        try {
            await confirmUser(request);
            router.push('/login');
            return;
        } catch (error: unknown) {
            console.error(error);
            // TODO: Display error message to user
        }
    };

    const onCancel = () => {
        router.back();
    };

    return (
        <Box className='flex flex-col'>
            <form
                onSubmit={handleSubmit((data) =>
                    onSubmit({ ...data, username }),
                )}
                noValidate
            >
                <Typography variant='h3'>Confirm Email</Typography>
                <Typography variant='body1'>
                    We&apos;ve sent an email with a verification code. Please
                    enter it here.
                </Typography>
                <FormGroup className='mt-4'>
                    <TextField
                        {...register('code')}
                        name='code'
                        label='Code'
                        error={!!errors.code}
                        required
                        fullWidth
                    />
                    {!!errors.code && (
                        <FormHelperText error>
                            {errors.code.message}
                        </FormHelperText>
                    )}
                </FormGroup>
                <Stack
                    className='pt-2 justify-center'
                    direction='row'
                    spacing={2}
                >
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button
                        className='bg-blue-500'
                        type='submit'
                        variant='contained'
                    >
                        Confirm
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ConfirmUserForm;
