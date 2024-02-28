import React from 'react';
import {LoadingOverlay} from "../../../../components/Common/LoadingOverlay";
import {Button} from "@mui/material";

function ChanceSteps({ status, onChangeStatus }) {
    const [loading, setLoading] = React.useState(false);
    const handleChangeStatus = async (value) => {


    }
    return (
        <>
        {loading ? <LoadingOverlay /> : ''}
            <Button
                color="primary"
                variant="contained"
                sx={{ mb: 2, mr: 1 }}
                size="small"
                onClick={() => handleChangeStatus(1)}
            >
                Cà phê & ăn Trưa
            </Button>
        </>
    );
}

export default ChanceSteps;