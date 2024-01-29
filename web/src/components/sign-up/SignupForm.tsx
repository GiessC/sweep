'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    FormGroup,
    FormHelperText,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { SignUpRequest } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { signupReqSchema } from '@/config/validationSchema';
import { ObjectSchema } from 'yup';
import { isAWSError } from '@/utils/awsUtils';
import { setItem } from '@/utils/localStorage';

const SignupForm = () => {
    const router = useRouter();
    const { signUp } = useContext(AuthContext);
    const { formState, register, handleSubmit } = useForm<SignUpRequest>({
        resolver: yupResolver<SignUpRequest>(
            signupReqSchema as ObjectSchema<SignUpRequest>,
        ),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
    });
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
                router.push('/confirm-user');
            }
        } catch (error: unknown) {
            console.error(error);
            if (isAWSError(error, 'UserExists')) {
                // Display the error
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
