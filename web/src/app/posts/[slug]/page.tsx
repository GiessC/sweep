'use client';

import { useGetPost } from '@/hooks/usePost';
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';
import Post from '@/models/posts/Post';
import GetPostRequest from '@/models/posts/requests/GetPostRequest';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BsPencil as EditIcon, BsTrash as DeleteIcon } from 'react-icons/bs';
import { useState } from 'react';
import DeletePostModal from '@/components/posts/DeletePostModal';

interface FullPostProps {
    params: GetPostRequest;
}

// TODO: This will be implemented with auth + JWT
const useUser = () => {
    return {
        id: 'GetThisFromJWTToken',
    };
};

const FullPost = ({ params }: FullPostProps) => {
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const user = useUser();
    const router = useRouter();
    const { slug } = params;
    const { data, isLoading } = useGetPost({
        slug,
    });

    const post: Post | undefined | null = data?.item;
    if (!isLoading && !post) {
        router.push('/404');
        return;
    }

    const goToEdit = () => {
        router.push(`/posts/${slug}/edit`);
    };

    return (
        <Box marginTop={10}>
            <Card>
                <CardContent>
                    <Typography variant='h4'>{post?.title}</Typography>
                    <Typography variant='body1'>{post?.content}</Typography>
                    <Link
                        className='hover:underline text-gray-500'
                        href={`/profile/${post?.authorId}`}
                    >
                        by {post?.author}
                    </Link>
                    {user.id === post?.authorId && (
                        <Stack
                            className='max-w-48'
                            spacing={1}
                            direction='row'
                        >
                            <Button
                                className='text-black border-black hover:border-gray-500'
                                variant='outlined'
                                onClick={goToEdit}
                            >
                                <EditIcon className='mr-2' />
                                Edit
                            </Button>
                            <Button
                                className='text-black border-black hover:border-gray-500'
                                variant='outlined'
                                onClick={() => setDeleteOpen(true)}
                            >
                                <DeleteIcon className='mr-2' />
                                Delete
                            </Button>
                        </Stack>
                    )}
                </CardContent>
            </Card>
            <DeletePostModal
                slug={slug}
                isOpen={deleteOpen}
                setIsOpen={setDeleteOpen}
            />
        </Box>
    );
};

export default FullPost;
