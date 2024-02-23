'use client';

import CreatePostForm from '@/components/posts/CreatePostForm';
import { useAlert } from '@/hooks/useAlert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

const HomePage = () => {
    const { addAlert } = useAlert();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const createPost = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Stack
                spacing={2}
                direction='row'
            >
                <Button
                    onClick={() => addAlert('Test success', 'success')}
                    className='bg-green-500 hover:bg-green-600 text-white'
                    variant='contained'
                >
                    Success
                </Button>
                <Button
                    onClick={() => addAlert('Test info', 'info')}
                    className='bg-blue-500 hover:bg-blue-600 text-white'
                    variant='contained'
                >
                    Info
                </Button>
                <Button
                    onClick={() => addAlert('Test warning', 'warning')}
                    className='bg-yellow-500 hover:bg-yellow-600 text-white'
                    variant='contained'
                >
                    Warning
                </Button>
                <Button
                    onClick={() => addAlert('Test error', 'error')}
                    className='bg-red-500 hover:bg-red-600 text-white'
                    variant='contained'
                >
                    Error
                </Button>
            </Stack>
            <Button onClick={createPost}>Create new post</Button>
            <CreatePostForm
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onCreate={createPost}
            />
        </>
    );
};

export default HomePage;
