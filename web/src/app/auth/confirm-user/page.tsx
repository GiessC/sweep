import ConfirmUserForm from '@/components/auth/confirm-user/ConfirmUserForm';
import { Box, Card, CardContent } from '@mui/material';

const ConfirmUser = () => {
    return (
        <Box
            className='w-1/3 m-auto'
            paddingTop={10}
        >
            <Card>
                <CardContent>
                    <ConfirmUserForm />
                </CardContent>
            </Card>
        </Box>
    );
};

export default ConfirmUser;
