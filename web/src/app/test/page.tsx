'use client';

import { useEffect } from 'react';

const Page = () => {
    useEffect(() => {
        const test = async () => {
            const response = await fetch('http://localhost:5000/post', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'Hello World',
                    content: 'This is my first post!',
                    authorId: 1,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
        };

        test();
    }, []);

    return <div>Fuck</div>;
};

export default Page;
