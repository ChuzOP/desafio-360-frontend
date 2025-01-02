import React from 'react';
import {
    Card,
    CardContent,
    Skeleton,
    Box,
    Grid2 as Grid
} from '@mui/material';

export const SkeletonCard: React.FC = () => {
    return (
        <Box sx={{ p: 4, flexGrow: 1 }}>
            <Grid container spacing={10}>
                {Array.from(new Array(3)).map((_, index) => (
                    <Grid
                        key={index}
                        size={{
                            md: 12,
                            lg: 6,
                            xl: 4
                        }}
                    >
                        <Card
                            sx={{
                                width: 370,
                                height: 370,
                                maxWidth: 370,
                                maxHeight: 370,
                                margin: 'auto',
                                borderRadius: 2,
                                position: 'relative'
                            }}
                        >
                            <Skeleton variant="rectangular" height="70%" />
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: 1
                                }}
                            >
                                <Skeleton variant="text" width="80%" />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Skeleton variant="text" width="30%" />
                                    <Skeleton
                                        variant="rectangular"
                                        width="100px"
                                        height="36px"
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
