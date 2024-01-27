import { useEffect } from 'react';
import Modal from '../common/Modal/Modal';
import { useDeletePost } from '@/hooks/usePost';
import Typography from '@mui/material/Typography';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import APIResponse from '@/api/APIResponse';
import type IPost from '@/models/posts/Post';

type DeletePostModalProps = {
    postId: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    refetch: (
        options?: RefetchOptions | undefined,
    ) => Promise<QueryObserverResult<APIResponse<IPost>, Error>>;
};

const DeletePostModal = ({
    postId,
    isOpen: deleteModalOpen,
    setIsOpen: setDeleteModalOpen,
    refetch,
}: DeletePostModalProps) => {
    const { mutateAsync, isPending, isError, data, error, isSuccess } =
        useDeletePost();

    const deletePost = async () => {
        await mutateAsync({
            id: postId,
        });
    };

    useEffect(() => {
        if (!isSuccess) return;
        refetch();
        setDeleteModalOpen(false);
    }, [isSuccess]);

    return (
        <Modal
            title='Delete post?'
            isOpen={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
            confirmButtonText='Delete'
            styles={{
                confirmButton:
                    'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
                cancelButton:
                    'bg-gray-300 text-black hover:bg-gray-400 disabled:bg-gray-100',
            }}
            onConfirm={deletePost}
            cancelDisabled={isPending}
            confirmDisabled={isPending}
        >
            <Typography display='inline'>Are you sure you want to </Typography>
            <Typography
                display='inline'
                className='font-bold text-red'
            >
                delete
            </Typography>{' '}
            <Typography display='inline'>this post?</Typography>
        </Modal>
    );
};

export default DeletePostModal;
