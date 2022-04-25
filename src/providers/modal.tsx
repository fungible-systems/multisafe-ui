import React from 'react';
import Dialog from '@mui/material/Dialog';
import {TransitionProps} from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

import useModal from '../hooks/use-modal';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalProvider: React.FC = ({children}) => {
    const [modal,] = useModal();
    return <>
        {children}
        {modal && (
            <Dialog
                open={true}
                TransitionComponent={Transition}
                fullWidth
                disableEscapeKeyDown={false}
            >
                {modal}
            </Dialog>
        )}
    </>;
}

export default ModalProvider;