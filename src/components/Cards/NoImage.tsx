import { Image } from '@mui/icons-material';
import { Typography, Paper } from '@mui/material';

export const NoImage = ({
    dialog = 'Image'
}: {
    dialog?: string;
}) => {
    return (
        <Paper
            elevation={2}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                minHeight: 200,
                minWidth: 200,
                textAlign: 'center',
                marginX: 'auto'
            }}
        >
            <Image sx={{ fontSize: 50, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
                {dialog}
            </Typography>
        </Paper>
    );
};
