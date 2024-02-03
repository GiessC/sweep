import { AuthContext } from '@/context/AuthContext';
import forgotPasswordSchema from '@/features/auth/password/forgot/schema';
import { USE_FORM_CONFIG } from '@/utils/forms';
import { removeItem, setItem } from '@/utils/localStorage';
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

export interface ForgotPasswordValues {
    email: string;
    username: string;
}

const DEFAULT_VALUES: ForgotPasswordValues = {
    email: '',
    username: '',
};

const ForgotPasswordForm = () => {
    const router = useRouter();
    const { forgotPassword } = useContext(AuthContext);
    const { formState, register, handleSubmit } = useForm<ForgotPasswordValues>(
        USE_FORM_CONFIG(DEFAULT_VALUES, forgotPasswordSchema),
    );
    const { errors, isDirty, isValid, isSubmitting } = formState;

    const onSubmit = async (formData: ForgotPasswordValues) => {
        try {
            setItem('username', formData.username);
            await forgotPassword(
                formData.username,
                formData.email,
                redirectToForgotPasswordCode,
            );
        } catch (error: unknown) {
            // TODO: Error handling
            removeItem('username');
            console.error(error);
        }
    };

    const redirectToForgotPasswordCode = () => {
        router.push('/auth/password/forgot/code');
    };

    const onCancel = () => {
        router.back();
    };

    return (
        <Box className='h-full'>
            <Typography variant='h4'>Forgot Password</Typography>
            <Typography variant='body1'>
                Please provide your email and username. We will send you an
                email with a code to reset your password.
            </Typography>
            <form
                className='flex flex-col mt-2 space-y-4 justify-center self-center'
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <FormGroup>
                    <TextField
                        {...register('username')}
                        name='username'
                        label='Username'
                        error={!!errors.username}
                        required
                    />
                    {errors.username && (
                        <FormHelperText error>
                            {errors.username.message}
                        </FormHelperText>
                    )}
                </FormGroup>
                <FormGroup>
                    <TextField
                        {...register('email')}
                        name='email'
                        label='Email'
                        type='email'
                        error={!!errors.email}
                        required
                    />
                    {errors.email && (
                        <FormHelperText error>
                            {errors.email.message}
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

export default ForgotPasswordForm;