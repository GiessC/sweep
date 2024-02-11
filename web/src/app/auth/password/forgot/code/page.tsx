'use client';

import ForgotPasswordCodeForm from '@/components/auth/password/forgot/code/ForgotPasswordCodeForm';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ForgotPasswordCode = () => {
    return (
        <Box paddingTop={10}>
            <Card className='w-1/3 m-auto'>
                <CardContent>
                    <ForgotPasswordCodeForm />
                </CardContent>
            </Card>
        </Box>
    );
};

export default ForgotPasswordCode;
