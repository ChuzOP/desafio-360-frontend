import React from 'react';
import { Box, Skeleton } from '@mui/material';

export const SkeletonGrid = () => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1,
            }}
        >
            {[...Array(6)].map((_, index) => (
                <Skeleton
                    key={`grid-item-${index}`}
                    animation="wave"
                    height={40}
                />
            ))}
        </Box>
    );
};
