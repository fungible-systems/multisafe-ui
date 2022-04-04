import React from 'react';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import useAppTheme from '../../hooks/useAppTheme';

const AppContent = (props: { children: React.ReactNode }) => {
    const [theme] = useAppTheme();

    const boxStyles = {
        bgcolor: theme === 'light' ? grey[50] : grey[900],
        color: theme === 'light' ? grey[900] : grey[300],
        height: 'calc(100% - 40px)',
        flexGrow: 1,
        padding: '20px',
        overflow: 'auto'
    }

    return <Box sx={boxStyles}>{props.children}</Box>
}

export default AppContent;