'use client';

import CreatePostForm from '@/components/posts/CreatePostForm';
import Button from '@mui/material/Button';
import { useState } from 'react';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const createPost = () => {
        setIsModalOpen(true);
    };

    return (
        <>
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
