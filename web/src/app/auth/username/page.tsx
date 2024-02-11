'use client';

import ForgotUsernameForm from '@/components/auth/username/ForgotUsernameForm';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ForgotUsername = () => {
    return (
        <Box paddingTop={10}>
            <Card className='w-1/3 m-auto'>
                <CardContent>
                    <ForgotUsernameForm />
                </CardContent>
            </Card>
        </Box>
    );
};

export default ForgotUsername;
