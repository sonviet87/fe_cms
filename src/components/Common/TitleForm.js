import React from 'react';
import { TitleFormStyled } from './SlytedComponent/Title';


function TitleForm({ lable, haveBorder }) {
    return (
        <TitleFormStyled haveBorder={haveBorder}>{lable ? lable : ''}</TitleFormStyled>
    );
}

export default TitleForm;