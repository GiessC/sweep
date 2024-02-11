'use client';

import Post from '@/models/posts/Post';
import AuthService from '@/services/authentication/AuthService';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { BsTrash as DeleteIcon, BsPencil as EditIcon } from 'react-icons/bs';
import DeletePostModal from '../DeletePostModal';
import LoadingFullPost from './LoadingFullPost';
import { AuthContext } from '@/context/AuthContext';

export interface FullPostProps {
    post?: Post | null;
    isLoading?: boolean;
}

const FullPost = ({ post, isLoading = false }: FullPostProps) => {
    const router = useRouter();
    const { user } = useContext(AuthContext);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    const goToEdit = () => {
        if (!post) {
            // TODO: Show error message
            return;
        }
        router.push(`/posts/${post.slug}/edit`);
    };

    const getUserId = useCallback(async () => {
        const idToken = user?.token;
        const decodedPayload = idToken?.decodePayload();
        setUserId(decodedPayload?.sub);
    }, [user]);

    useEffect(() => {
        getUserId();
    }, [getUserId]);

    if (!isLoading && !post) {
        router.push('/404');
        return;
    }

    if (isLoading) {
        return <LoadingFullPost />;
    }

    return (
        <>
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
                    {userId === post?.authorId && (
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
            {post && (
                <DeletePostModal
                    slug={post.slug}
                    isOpen={deleteOpen}
                    setIsOpen={setDeleteOpen}
                />
            )}
        </>
    );
};

export default FullPost;
