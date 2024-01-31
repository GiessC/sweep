'use client';

import { AuthContext } from '@/context/AuthContext';
import type { LoginRequest } from '@/hooks/useAuth';
import { isAWSError } from '@/utils/awsUtils';
import { removeItem, setItem } from '@/utils/localStorage';
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
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

const useAlert =
    () =>
    (..._: unknown[]) => {}; // TODO: We need some sort of alert/notification system!

const LoginForm = () => {
    const { login, setIsAuthenticated } = useContext(AuthContext);
    const router = useRouter();
    const showAlert = useAlert();
    const { formState, register, handleSubmit } = useForm<LoginRequest>();
    const { isValid, isSubmitting, isDirty, errors } = formState;

    const onCancel = () => {
        router.back();
    };

    const onSubmit = async (formData: LoginRequest) => {
        try {
            const loggedIn = await login(formData, () => router.push('/mfa')); // TODO: We will probably need to pass some state here.
            setItem('username', formData.username);
            if (loggedIn) {
                setIsAuthenticated(true);
                removeItem('username');
                router.push('/');
            }
        } catch (error: unknown) {
            if (isAWSError(error, 'UserNotFoundException')) {
                showAlert('User does not exist', 'error');
                return;
            }
            if (isAWSError(error, 'UserNotConfirmedException')) {
                setItem('username', formData.username);
                router.push('/confirm-user');
                return;
            }
        }
    };

    return (
        <Box className='h-full'>
            <form
                className='flex flex-col space-y-4 justify-center self-center'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography
                    className='mb-2'
                    variant='h3'
                >
                    Login
                </Typography>
                <FormGroup>
                    <TextField
                        {...register('username')}
                        name='username'
                        label='Username'
                        error={!!errors.username}
                        required
                    />
                    {!!errors.username && (
                        <FormHelperText error>
                            {errors.username.message}
                        </FormHelperText>
                    )}
                </FormGroup>
                <FormGroup>
                    <TextField
                        {...register('password')}
                        type='password'
                        name='password'
                        label='Password'
                        error={!!errors.password}
                        required
                    />
                    {!!errors.password && (
                        <FormHelperText error>
                            {errors.password.message}
                        </FormHelperText>
                    )}
                </FormGroup>
                <Stack
                    className='justify-between'
                    direction='row'
                    spacing={2}
                >
                    <Button
                        size='large'
                        href='/sign-up'
                    >
                        Sign up
                    </Button>
                    <Stack
                        direction='row'
                        spacing={2}
                    >
                        <Button
                            onClick={onCancel}
                            size='large'
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            className='bg-blue-500'
                            size='large'
                            disabled={isSubmitting || !isDirty || !isValid}
                        >
                            Login
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default LoginForm;
