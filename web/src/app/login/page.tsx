import LoginForm from '@/components/login/LoginForm';
import { Box, Card, CardContent } from '@mui/material';
import Link from 'next/link';

const Login = () => {
    return (
        <Box paddingTop={10}>
            <Card className='w-1/3 m-auto'>
                <CardContent>
                    <LoginForm />
                    <Link href='/sign-up'>Sign up</Link>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
