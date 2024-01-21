'use client';

import CreatePostModal from '@/components/posts/CreatePostModal';
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
            <CreatePostModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                onCreate={createPost}
            />
        </>
    );
};

export default HomePage;
