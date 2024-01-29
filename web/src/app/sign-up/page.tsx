import SignupForm from '@/components/sign-up/SignupForm';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Signup = () => {
    return (
        <Box paddingTop={10}>
            <Card className='w-1/3 m-auto'>
                <CardContent>
                    <SignupForm />
                </CardContent>
            </Card>
        </Box>
    );
};

export default Signup;
