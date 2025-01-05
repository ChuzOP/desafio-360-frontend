import { LoadingButton } from '@mui/lab';
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleConfirm: () => void;
    title: string;
    description: string;
    loading: boolean;
}

export const ConfirmModal = ({
    open,
    setOpen,
    handleConfirm,
    title,
    description,
    loading
}: Props) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500
                }
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        textAlign="center"
                        color="text.primary"
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                    >
                        {description}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 3
                        }}
                    >
                        <Button
                            onClick={() => setOpen(false)}
                            variant="outlined"
                            color="inherit"
                        >
                            Cancelar
                        </Button>
                        <LoadingButton
                            loading={loading}
                            onClick={handleConfirm}
                            variant="contained"
                            color="primary"
                        >
                            Confirmar
                        </LoadingButton>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};
