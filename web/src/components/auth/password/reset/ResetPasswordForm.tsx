import { AuthContext } from '@/context/AuthContext';
import resetPasswordSchema from '@/features/auth/password/reset/schema';
import { USE_FORM_CONFIG } from '@/utils/forms';
import { removeItem } from '@/utils/localStorage';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';

export interface ResetPasswordValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const DEFAULT_VALUES: ResetPasswordValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
};

const useAlert = () => {
    // TODO: this should be a real hook for displaying alert messages
    return (message: string, type: string) => console.log(message, type);
};

const ResetPasswordForm = () => {
    const router = useRouter();
    const showAlert = useAlert();
    const { resetPassword } = useContext(AuthContext);
    const { formState, register, handleSubmit } = useForm<ResetPasswordValues>(
        USE_FORM_CONFIG(
            DEFAULT_VALUES,
            resetPasswordSchema as ObjectSchema<ResetPasswordValues>,
        ),
    );
    const { errors, isDirty, isValid, isSubmitting } = formState;

    const onSubmit = async (formData: ResetPasswordValues) => {
        try {
            await resetPassword(formData.currentPassword, formData.newPassword);
            showAlert('Password changed successfully.', 'success');
            router.back();
        } catch (error: unknown) {
            // TODO: Error handling
            removeItem('username');
            console.error(error);
        }
    };

    const onCancel = () => {
        router.back();
    };

    return (
        <Box className='h-full'>
            <Typography variant='h4'>Reset Password</Typography>
            <form
                className='flex flex-col mt-2 space-y-4 justify-center self-center'
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <FormGroup>
                    <TextField
                        {...register('currentPassword')}
                        name='currentPassword'
                        label='Current Password'
                        type='password'
                        error={!!errors.currentPassword}
                        required
                    />
                    {errors.currentPassword && (
                        <FormHelperText error>
                            {errors.currentPassword.message}
                        </FormHelperText>
                    )}
                </FormGroup>
                <FormGroup>
                    <TextField
                        {...register('newPassword')}
                        name='newPassword'
                        label='New Password'
                        type='password'
                        error={!!errors.newPassword}
                        required
                    />
                    {errors.newPassword && (
                        <FormHelperText error>
                            {errors.newPassword.message}
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
                        Reset Password
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ResetPasswordForm;
