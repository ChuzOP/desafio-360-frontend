import { Typography, Paper } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export const NoData = ({ dialog = "No hay información disponible" }: { dialog?: string }) => {
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
                textAlign: 'center',
                marginX: 'auto'
            }}
        >
            <SentimentDissatisfiedIcon
                sx={{ fontSize: 50, color: 'text.secondary', mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary">
                {dialog}
            </Typography>
        </Paper>
    );
};
