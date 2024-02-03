import forgotUsernameSchema from '@/features/auth/username/schema';
import { USE_FORM_CONFIG } from '@/utils/forms';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

export interface ForgotUsernameValues {
    email: string;
}

const DEFAULT_VALUES: ForgotUsernameValues = {
    email: '',
};

const ForgotUsernameForm = () => {
    const { formState, register, handleSubmit } = useForm<ForgotUsernameValues>(
        USE_FORM_CONFIG<ForgotUsernameValues>(
            DEFAULT_VALUES,
            forgotUsernameSchema,
        ),
    );
    const { errors, isDirty, isValid, isSubmitting } = formState;

    const onSubmit = () => {
        console.log('Submit');
    };

    return (
        <Box className='h-full'>
            <Typography variant='h4'>Forgot Username</Typography>
            <Typography variant='body1'>
                Please provide your email. We will send you an email with your
                username.
            </Typography>
            <form
                className='flex flex-col mt-2 space-y-4 justify-center self-center'
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
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
                        Email me
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ForgotUsernameForm;
