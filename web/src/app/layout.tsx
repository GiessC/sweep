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
            <UserProvider>
                <body>{children}</body>
            </UserProvider>
        </html>
    );
}
