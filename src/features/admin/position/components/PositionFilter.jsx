import React from 'react';
import {Box} from "@mui/system";
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function PositionFilter({handleClickOpen,handleClickClose}) {
    const handleOpen = () => {
        handleClickOpen()
    };

    const handleClose = () => {
        handleClickClose();
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            <Button
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            > Thêm </Button>
        </Box>
    );
}

export default PositionFilter;