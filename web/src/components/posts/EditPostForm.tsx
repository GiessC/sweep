import APIResponse, { APIError } from '@/api/APIResponse';
import editPostSchema from '@/features/posts/edit/schema';
import Post from '@/models/posts/Post';
import EditPostRequest from '@/models/posts/requests/EditPostRequest';
import { USE_FORM_CONFIG } from '@/utils/forms';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface EditPostFormProps {
    post: Post | undefined | null;
    mutateAsync: UseMutateAsyncFunction<
        APIResponse<Post | null>,
        Error,
        EditPostRequest,
        unknown
    >;
}

const EditPostForm = ({ post, mutateAsync }: EditPostFormProps) => {
    const defaultValues = {
        slug: post?.slug,
        title: post?.title,
        content: post?.content,
    };

    const router = useRouter();
    const { formState, handleSubmit, register, setError } =
        useForm<EditPostRequest>(
            USE_FORM_CONFIG<EditPostRequest>(defaultValues, editPostSchema),
        );
    const { isSubmitting, errors, isDirty, isValid } = formState;

    const onCancel = () => {
        router.back();
    };

    const editPost = async (formData: EditPostRequest) => {
        const { message, errors, item } = await mutateAsync(formData);
        if (!!item && (!errors || errors.length === 0)) {
            router.push(`/posts/${item.slug}`);
            return;
        }
        errors?.forEach((error: APIError) => {
            setError(
                error.fields.length > 0
                    ? (error.fields[0] as keyof EditPostRequest)
                    : 'root.generic',
                {
                    message: error.msg,
                    type: error.type,
                },
            );
        });
        setError('root.generic', {
            message,
        });
    };

    return (
        <form
            className='flex flex-col gap-4'
            onSubmit={handleSubmit(editPost)}
        >
            <Typography variant='h5'>Edit Post</Typography>
            {errors.root?.generic.message && (
                <Alert color='error'>{errors.root.generic.message}</Alert>
            )}
            <TextField
                {...register('title')}
                name='title'
                label='Title'
                error={!!errors.title}
                required
                fullWidth
            />
            {errors?.title && (
                <FormHelperText error>{errors.title.message}</FormHelperText>
            )}
            <TextField
                {...register('content')}
                name='content'
                label='Content'
                error={!!errors.content}
                minRows={10}
                multiline
                required
                fullWidth
            />
            {errors?.content && (
                <FormHelperText error>{errors.content.message}</FormHelperText>
            )}
            <Stack
                className='justify-end'
                direction='row'
                spacing={1}
            >
                <Button
                    variant='text'
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    className='bg-blue-500'
                    type='submit'
                    variant='contained'
                    disabled={isSubmitting || !isValid || !isDirty}
                >
                    Confirm Changes
                </Button>
            </Stack>
        </form>
    );
};

export default EditPostForm;
