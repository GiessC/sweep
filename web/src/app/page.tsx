import HomePage from '@/pages/HomePage';

export const metadata = {
    title: 'sweep',
    description: 'We do social media',
};

const Home = () => {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <HomePage />
        </main>
    );
};

export default Home;
