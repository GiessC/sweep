'use client';

import { FormHelperText, Stack, TextField } from '@mui/material';
import Modal from '../common/Modal/Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import CreatePostRequest from '@/models/posts/requests/CreatePostRequest';
import { useCreatePost } from '@/hooks/usePost';
import Post from '@/models/posts/Post';
import { APIError } from '@/api/APIResponse';

export interface CreatePostModalProps {
    isOpen: boolean;
    setIsOpen(isOpen: boolean): void;
    onCreate?(post: Post): void;
}

const DEFAULT_VALUES: CreatePostRequest = {
    title: '',
    content: '',
};

const FORM_ID = 'create-post-form';

const CreatePostForm = ({
    isOpen,
    setIsOpen,
    onCreate = () => {},
}: CreatePostModalProps) => {
    const { formState, reset, handleSubmit, register, setError } =
        useForm<CreatePostRequest>({ defaultValues: DEFAULT_VALUES });
    const { isSubmitting, isSubmitSuccessful, errors, isDirty, isValid } =
        formState;
    const createPostMutation = useCreatePost();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            setIsOpen(false);
        }
    }, [isSubmitSuccessful, reset, setIsOpen]);

    const updateErrors = (errors: APIError[]) => {
        for (const error of errors) {
            setError(
                (error.fields[0] ?? 'root.generic') as
                    | keyof CreatePostRequest
                    | 'root.generic',
                {
                    message: error.msg,
                    type: 'onBlur',
                },
            );
        }
    };

    const createPost: SubmitHandler<CreatePostRequest> = async (
        request: CreatePostRequest,
    ) => {
        const response = await createPostMutation.mutateAsync(request);
        if (response.errors) updateErrors(response.errors);
        if (!response.errors && !!response.item) onCreate(response.item);
    };

    return (
        <Modal
            title='Create new post'
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            formId={FORM_ID}
            confirmButtonText='Create'
            styles={{
                confirmButton:
                    'bg-blue-400 text-white hover:bg-blue-500 disabled:bg-blue-200 disabled:text-slate-200',
            }}
            cancelDisabled={isSubmitting}
            confirmDisabled={!isDirty || isSubmitting || !isValid}
            maxWidth='md'
            fullWidth
        >
            <form
                id={FORM_ID}
                onSubmit={handleSubmit(createPost)}
                noValidate
            >
                <Stack
                    marginTop={1}
                    direction='column'
                    spacing={1}
                >
                    <TextField
                        {...register('title')}
                        name='title'
                        label='Title'
                        error={!!errors.title}
                        required
                        fullWidth
                    />
                    <FormHelperText error={!!errors.title}>
                        {errors.title?.message}
                    </FormHelperText>
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
                    <FormHelperText error={!!errors.content}>
                        {errors.content?.message}
                    </FormHelperText>
                </Stack>
            </form>
        </Modal>
    );
};

export default CreatePostForm;
