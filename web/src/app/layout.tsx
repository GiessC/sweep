import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
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
