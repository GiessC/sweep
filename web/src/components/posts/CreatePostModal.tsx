'use client';

import { FormHelperText, TextField } from '@mui/material';
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

const FORM_ID = 'create-post-form';

const CreatePostModal = ({
    isOpen,
    setIsOpen,
    onCreate = () => {},
}: CreatePostModalProps) => {
    const { formState, reset, handleSubmit, setError } =
        useForm<CreatePostRequest>();
    const { isSubmitting, isSubmitSuccessful, errors, isDirty } = formState;
    const createPostMutation = useCreatePost();

    useEffect(() => {
        if (isSubmitSuccessful) reset();
        setIsOpen(false);
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
                confirmButton: 'bg-blue-300',
            }}
            maxWidth='lg'
            cancelDisabled={isSubmitting}
            confirmDisabled={!isDirty || isSubmitting}
        >
            <form
                id={FORM_ID}
                onSubmit={handleSubmit(createPost)}
            >
                <TextField
                    name='title'
                    label='Title'
                    error={!!errors.title}
                    required
                />
                <FormHelperText error={!!errors.title}>
                    {errors.title?.message}
                </FormHelperText>
                <TextField
                    name='content'
                    label='Content'
                    error={!!errors.content}
                    required
                />
                <FormHelperText error={!!errors.content}>
                    {errors.content?.message}
                </FormHelperText>
            </form>
        </Modal>
    );
};

export default CreatePostModal;
