import React from 'react';
import { TitleFormStyled } from './SlytedComponent/Title';


function TitleForm({ lable, isborder }) {
    return (
        <TitleFormStyled isborder={isborder}>{lable ? lable : ''}</TitleFormStyled>
    );
}

export default TitleForm;