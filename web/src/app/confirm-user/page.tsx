import ConfirmUserForm from '@/components/confirm-user/ConfirmUserForm';
import { Box, Card, CardContent } from '@mui/material';

const ConfirmUser = () => {
    return (
        <Box paddingTop={10}>
            <Card>
                <CardContent>
                    <ConfirmUserForm />
                </CardContent>
            </Card>
        </Box>
    );
};

export default ConfirmUser;
