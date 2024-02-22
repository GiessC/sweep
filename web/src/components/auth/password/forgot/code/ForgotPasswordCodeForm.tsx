'use client';

import CodeInput from '@/components/auth/code-input/CodeInput';
import { AuthContext } from '@/context/AuthContext';
import {
    CODE_MISMATCH,
    EXPIRED_CODE,
    NOT_CONFIRMED,
    TOO_MANY_REQUESTS,
} from '@/errors/ErrorMessages';
import NoUsernameStoredError from '@/errors/authentication/NoUsernameStoredError';
import forgotPasswordCodeSchema from '@/features/auth/password/forgot/code/schema';
import { isAWSError } from '@/utils/awsUtils';
import { USE_FORM_CONFIG } from '@/utils/forms';
import { getItem } from '@/utils/localStorage';
import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';

export interface ForgotPasswordCodeValues {
    code?: number;
    password: string;
    confirmPassword: string;
}

const DEFAULT_VALUES: ForgotPasswordCodeValues = {
    code: undefined,
    password: '',
    confirmPassword: '',
};

const useAlert = () => {
    // TODO: this should be a real hook for displaying alert messages
    return (message: string, type: string) => console.log(message, type);
};

const ForgotPasswordCodeForm = () => {
    const router = useRouter();
    const showAlert = useAlert();
    const { confirmPassword } = useContext(AuthContext);
    const { formState, control, register, setValue, handleSubmit } =
        useForm<ForgotPasswordCodeValues>(
            USE_FORM_CONFIG<ForgotPasswordCodeValues>(
                DEFAULT_VALUES,
                forgotPasswordCodeSchema as ObjectSchema<ForgotPasswordCodeValues>,
            ),
        );
    const { errors, isDirty, isValid, isSubmitting } = formState;

    const onSubmit = async (formData: ForgotPasswordCodeValues) => {
        try {
            const username = getItem('username');
            if (!username) {
                throw new NoUsernameStoredError(
                    'No username stored. Please try again.',
                );
            }
            await confirmPassword(
                username,
                `${formData.code}`,
                formData.password,
            );
            showAlert('Password changed successfully.', 'success');
            router.push('/auth/login');
        } catch (error: unknown) {
            console.error(error);
            if (isAWSError(error, 'CodeMismatchException')) {
                showAlert(CODE_MISMATCH(), 'error');
            } else if (isAWSError(error, 'ExpiredCodeException')) {
                showAlert(EXPIRED_CODE(), 'error');
            } else if (isAWSError(error, 'InvalidParameterException')) {
                showAlert((error as Error).message, 'error');
            } else if (isAWSError(error, 'InvalidPasswordException')) {
                showAlert('Invalid password.', 'error');
            } else if (isAWSError(error, 'NotAuthorizedException')) {
                showAlert(
                    'You are not authorized to perform this action.',
                    'error',
                );
            } else if (isAWSError(error, 'TooManyFailedAttemptsException')) {
                showAlert('Too many failed attempts.', 'error');
            } else if (isAWSError(error, 'TooManyRequestsException')) {
                showAlert(TOO_MANY_REQUESTS(), 'error');
            } else if (isAWSError(error, 'UserNotConfirmedException')) {
                showAlert(NOT_CONFIRMED(), 'error');
            } else if (isAWSError(error, 'UserNotFoundException')) {
                showAlert('User not found.', 'error');
                router.push('/auth/login');
            } else if (error instanceof Error) {
                showAlert(error.message, 'error');
            }
        }
    };

    const onCancel = () => {
        router.back();
    };

    return (
        <Box className='h-full'>
            <Typography variant='h4'>Forgot Password</Typography>
            <Typography variant='body1'>
                We&apos;ve sent you an email with a code. Please enter it here
                and provide your new password.
            </Typography>
            <form
                className='flex flex-col mt-2 space-y-4 justify-center self-center'
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <FormGroup>
                    <Controller
                        name='code'
                        control={control}
                        defaultValue={DEFAULT_VALUES.code}
                        render={() => (
                            <CodeInput
                                setValue={(value: number) => {
                                    setValue('code', value);
                                }}
                                error={!!errors.code}
                                required
                            />
                        )}
                    />
                    {errors.code && (
                        <FormHelperText error>
                            {errors.code.message}
                        </FormHelperText>
                    )}
                </FormGroup>
                <FormGroup>
                    <TextField
                        {...register('password')}
                        name='password'
                        label='Password'
                        type='password'
                        error={!!errors.password}
                        required
                    />
                    {errors.password && (
                        <FormHelperText error>
                            {errors.password.message}
                        </FormHelperText>
                    )}
                </FormGroup>
                <FormGroup>
                    <TextField
                        {...register('confirmPassword')}
                        name='confirmPassword'
                        label='Confirm Password'
                        type='password'
                        error={!!errors.confirmPassword}
                        required
                    />
                    {errors.confirmPassword && (
                        <FormHelperText error>
                            {errors.confirmPassword.message}
                        </FormHelperText>
                    )}
                </FormGroup>
                <Stack
                    spacing={2}
                    direction='row'
                    alignSelf='end'
                >
                    <Button
                        size='large'
                        variant='text'
                        disabled={isSubmitting}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        className='bg-blue-500'
                        size='large'
                        type='submit'
                        variant='contained'
                        disabled={!isDirty || !isValid || isSubmitting}
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ForgotPasswordCodeForm;
