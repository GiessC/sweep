'use client';

import ResetPasswordForm from '@/components/auth/password/reset/ResetPasswordForm';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ForgotPassword = () => {
    return (
        <Box paddingTop={10}>
            <Card className='w-1/3 m-auto'>
                <CardContent>
                    <ResetPasswordForm />
                </CardContent>
            </Card>
        </Box>
    );
};

export default ForgotPassword;
