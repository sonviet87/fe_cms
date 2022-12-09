import React, { useEffect, useState } from 'react';
import { ChipStyled } from '../SlytedComponent/Chip';

function ChipStatus({ label, status }) {
    const [color, setColor] = useState('#e5e4e4');

    useEffect(() => {
        switch (parseInt(status)) {
            case 0:
                setColor('#1976d2')
                break;
            case 1:
                setColor('#08970d')
                break;
            case 2:
                setColor('#eb170d')
                break;
            case 3:
                setColor('#81eb0d')
                break;
            case 4:
                setColor('#0cd7cd')
                break;
            case 5:
                setColor('#d70c8f')
                break;
            case 6:
                setColor('#510cd7')
                break;
            case 7:
                setColor('#d7be0c')
                break;
            default:
                setColor('#e5e4e4')
        }

    }, [])
    return <ChipStyled label={label} bgcolor={color} color="primary" />;
}

export default ChipStatus;