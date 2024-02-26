import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';

function ChanceAddEditPage(props) {
    const initialValue = {}
    const validationRules = {}
    const schema = yup.object().shape(validationRules );

    const methods = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {

    }
    return (
        <WrapperPage>
            <FormProvider {...methods}>
            </FormProvider>
        </WrapperPage>
    );
}

export default ChanceAddEditPage;