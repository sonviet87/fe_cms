import React from 'react';
import { TitleFormStyled } from './SlytedComponent/Title';


function TitleForm({ lable }) {
    return (
        <TitleFormStyled>{lable ? lable : ''}</TitleFormStyled>
    );
}

export default TitleForm;