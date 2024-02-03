'use client';

import { AuthContext } from '@/context/AuthContext';
import { TOO_MANY_REQUESTS } from '@/errors/ErrorMessages';
import signUpSchema from '@/features/auth/sign-up/schema';
import { SignUpRequest } from '@/hooks/useAuth';
import { isAWSError } from '@/utils/awsUtils';
import { USE_FORM_CONFIG } from '@/utils/forms';
import { setItem } from '@/utils/localStorage';
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
import { ObjectSchema } from 'yup';

const DEFAULT_VALUES = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
};

const useAlert = () => {
    return (message: string, type: string) => {
        console.log(message, type);
    };
};

const SignupForm = () => {
    const router = useRouter();
    const showAlert = useAlert();
    const { signUp } = useContext(AuthContext);
    const { formState, register, handleSubmit } = useForm<SignUpRequest>(
        USE_FORM_CONFIG<SignUpRequest>(
            DEFAULT_VALUES,
            signUpSchema as ObjectSchema<SignUpRequest>,
        ),
    );
    const { isDirty, isSubmitting, isValid, errors } = formState;

    const onCancel = () => {
        router.back();
    };

    const onSubmit = async (formData: SignUpRequest) => {
        try {
            const response = await signUp(formData);
            setItem('username', formData.username);
            const userConfirmed = response?.userConfirmed;
            if (userConfirmed) {
                router.push('/');
            } else {
                router.push('/auth/confirm-user');
            }
        } catch (error: unknown) {
            if (isAWSError(error, 'CodeDeliveryFailureException')) {
                showAlert((error as Error).message, 'error');
            } else if (isAWSError(error, 'InvalidParameterException')) {
                showAlert((error as Error).message, 'error');
            } else if (isAWSError(error, 'InvalidPasswordException')) {
                showAlert((error as Error).message, 'error');
            } else if (isAWSError(error, 'TooManyRequestsException')) {
                showAlert(TOO_MANY_REQUESTS(), 'error');
            } else if (isAWSError(error, 'UsernameExistsException')) {
                showAlert('Username already exists.', 'error');
            } else if (error instanceof Error) {
                console.error(error.message);
                showAlert(error.message, 'error');
            } else {
                console.error(error);
                showAlert('An unknown error occurred.', 'error');
            }
        }
    };

    return (
        <Box>
            <form
                className='flex flex-col space-y-4 justify-center self-center'
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <Typography variant='h3'>Sign up for Sweep!</Typography>
                <FormGroup>
                    <TextField
                        {...register('email')}
                        type='email'
                        name='email'
                        label='Email'
                        error={!!errors.email}
                        required
                    />
                    {!!errors.email && (
                        <FormHelperText error>
                            {errors.email.message}
                        </FormHelperText>
                    )}
                </FormGroup>
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
                <FormGroup>
                    <TextField
                        {...register('confirmPassword')}
                        type='password'
                        name='confirmPassword'
                        label='Confirm Password'
                        error={!!errors.confirmPassword}
                        required
                    />
                    {!!errors.confirmPassword && (
                        <FormHelperText error>
                            {errors.confirmPassword.message}
                        </FormHelperText>
                    )}
                </FormGroup>
                <Stack
                    className='m-auto'
                    direction='row'
                    spacing={2}
                >
                    <Button
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        className='bg-blue-500'
                        type='submit'
                        variant='contained'
                        disabled={isSubmitting || !isDirty || !isValid}
                    >
                        Sign up
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default SignupForm;
