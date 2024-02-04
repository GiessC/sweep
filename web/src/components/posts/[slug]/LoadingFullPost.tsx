import { Card, CardContent, Skeleton } from '@mui/material';

const FullPost = () => {
    return (
        <Card>
            <CardContent>
                <Skeleton
                    className='h-28'
                    variant='text'
                />
                <Skeleton
                    className='h-10'
                    variant='text'
                />
                <Skeleton
                    className='w-48 hover:underline text-gray-500'
                    variant='text'
                />
                <div className='flex space-x-2 mt-4'>
                    <Skeleton
                        className='w-40 h-12 text-black border-black hover:border-gray-500 cursor-pointer'
                        variant='rounded'
                    />
                    <Skeleton
                        className='w-40 h-12 text-black border-black hover:border-gray-500 cursor-pointer'
                        variant='rounded'
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default FullPost;
