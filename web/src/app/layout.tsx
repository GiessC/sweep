import './globals.css';
import Navbar from '@/components/Navbar';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
    title: 'sweep',
    description: 'We do social media',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className='w-screen h-screen'>
                <div className='flex flex-col'>
                    <Navbar />
                    {children}
                </div>
            </body>
        </html>
    );
}
