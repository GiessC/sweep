import LoginForm from '@/components/auth/login/LoginForm';
import { Box, Card, CardContent } from '@mui/material';

const Login = () => {
    return (
        <Box paddingTop={10}>
            <Card className='w-1/3 m-auto'>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
