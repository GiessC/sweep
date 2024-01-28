import { useEffect } from 'react';
import Modal from '../common/Modal/Modal';
import { useDeletePost } from '@/hooks/usePost';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

type DeletePostModalProps = {
    slug: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const DeletePostModal = ({
    slug,
    isOpen: deleteModalOpen,
    setIsOpen: setDeleteModalOpen,
}: DeletePostModalProps) => {
    const router = useRouter();
    const { mutateAsync, isPending, isSuccess } = useDeletePost();

    const deletePost = async () => {
        await mutateAsync({
            slug,
        });
    };

    useEffect(() => {
        if (!isSuccess) return;
        setDeleteModalOpen(false);
        router.push('/browse');
    }, [isSuccess, router, setDeleteModalOpen]);

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
                className='font-bold text-red-500'
            >
                delete
            </Typography>{' '}
            <Typography display='inline'>
                this post? This action cannot be undone.
            </Typography>
        </Modal>
    );
};

export default DeletePostModal;
