import { FormHelperText, Collapse } from '@mui/material';

interface Props {
    message: string;
    error: boolean;
}

export const HelperError = ({ error, message }: Props) => {
    return (
        <Collapse in={error} timeout="auto" unmountOnExit>
            <FormHelperText sx={{ color: 'error.main', fontWeight: 500 }}>
                {message}
            </FormHelperText>
        </Collapse>
    );
};
