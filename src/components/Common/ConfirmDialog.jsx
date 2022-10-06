import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
} from '@mui/material';

function ConfirmDialog({ title, message, open, onClose, onConfirm }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        onClose && onClose();
    };

    const handleConfirm = () => {
        onConfirm && onConfirm();
    };

    return (
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText dangerouslySetInnerHTML={{ __html: message }} />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmDialog.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
};

export default ConfirmDialog;
