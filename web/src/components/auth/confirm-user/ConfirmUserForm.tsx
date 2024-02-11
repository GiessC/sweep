'use client';

import { AuthContext } from '@/context/AuthContext';
import { TOO_MANY_REQUESTS, UNKNOWN } from '@/errors/ErrorMessages';
import confirmUserSchema from '@/features/auth/confirm-user/schema';
import { isAWSError } from '@/utils/awsUtils';
import { USE_FORM_CONFIG } from '@/utils/forms';
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
import { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CodeInput from '../code-input/CodeInput';

export interface ConfirmUserRequest {
    username: string;
    code: string;
}

const DEFAULT_VALUES: ConfirmUserRequest = {
    code: '',
    username: '',
};

const useAlert = () => {
    return (message: string, type: string) => {
        console.log(message, type);
    };
};

const ConfirmUserForm = () => {
    const router = useRouter();
    const showAlert = useAlert();
    const { confirmUser } = useContext(AuthContext);
    const { formState, watch, register, handleSubmit, setValue, control } =
        useForm<ConfirmUserRequest>(
            USE_FORM_CONFIG<ConfirmUserRequest>(
                DEFAULT_VALUES,
                confirmUserSchema,
            ),
        );
    const { isValid, isSubmitting, isDirty, errors } = formState;
    const username = watch('username');

    useEffect(() => {
        setValue('username', getItem('username') ?? '');
    }, [setValue]);

    if (!username) {
        return <>We forgot your username... awkward.</>;
    }

    const onSubmit = async (request: ConfirmUserRequest) => {
        try {
            await confirmUser(request);
            router.push('/auth/login');
            return;
        } catch (error: unknown) {
            if (isAWSError(error, 'CodeMismatchException')) {
                showAlert('Incorrect code.', 'error');
            } else if (isAWSError(error, 'ExpiredCodeException')) {
                showAlert('The code you entered has expired.', 'error');
            } else if (
                isAWSError(error, 'InvalidLambdaResponseException') ||
                isAWSError(error, 'UnexpectedLambdaException') ||
                isAWSError(error, 'UserLambdaValidationException')
            ) {
                showAlert(
                    'An error occurred while adding user to database. Please contact support.',
                    'error',
                );
            } else if (isAWSError(error, 'InvalidParameterException')) {
                showAlert((error as Error).message, 'error');
            } else if (isAWSError(error, 'TooManyFailedAttemptsException')) {
                showAlert((error as Error).message, 'error');
            } else if (isAWSError(error, 'TooManyRequests')) {
                showAlert(TOO_MANY_REQUESTS(), 'error');
            } else if (error instanceof Error) {
                showAlert(error.message, 'error');
            } else {
                showAlert(UNKNOWN(), 'error');
            }
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
                    <Controller
                        name='code'
                        control={control}
                        defaultValue={DEFAULT_VALUES.code}
                        render={({ field }) => (
                            <CodeInput
                                value={field.value}
                                setValue={(value: string) => {
                                    console.log(value);
                                    setValue('code', value);
                                }}
                            />
                        )}
                    />
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
                        disabled={!isValid || !isDirty || isSubmitting}
                    >
                        Confirm
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ConfirmUserForm;
