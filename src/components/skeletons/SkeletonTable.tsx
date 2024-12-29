import { Box, Skeleton } from '@mui/material';

export const SkeletonTable = () => {
    return (
        <Box
            sx={{
                width: '100%',
                padding: '20px 30px',
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 2,
                    marginBottom: '16px',
                }}
            >
                {[...Array(5)].map((_, index) => (
                    <Skeleton
                        key={`header-${index}`}
                        animation="wave"
                        height={35}
                    />
                ))}
            </Box>
            
            {[...Array(6)].map((_, rowIndex) => (
                <Box
                    key={`row-${rowIndex}`}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: 2,
                        marginBottom: '8px',
                    }}
                >
                    {[...Array(5)].map((_, colIndex) => (
                        <Skeleton
                            key={`cell-${rowIndex}-${colIndex}`}
                            animation="wave"
                            height={25}
                        />
                    ))}
                </Box>
            ))}
        </Box>
    );
};
